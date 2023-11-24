export async function connectBluetooth({ bluetoothServices }) {
    if (!navigator.bluetooth) {
        throw new Error('Bluetooth is not available.');
    }

    try {
        const device = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: bluetoothServices.map(service => service.key),
        });

        const server = await device.gatt.connect();
        const services = await server.getPrimaryServices();

        let characteristicsMap = {};
        for (const service of services) {
            const characteristics = await service.getCharacteristics();
            characteristicsMap[service.uuid] = [];

            for (const characteristic of characteristics) {
                let charDetails = { uuid: characteristic.uuid, properties: characteristic.properties, value: null };

                if (characteristic.properties.read) {
                    charDetails.value = await characteristic.readValue();
                    // Convert the value to a proper format if necessary
                }

                characteristicsMap[service.uuid].push(charDetails);
            }
        }

        return { device, services: characteristicsMap };
    } catch (error) {
        throw new Error(error, 'Error while connecting to Bluetooth device.');
    }
}
