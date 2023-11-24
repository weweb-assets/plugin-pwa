export async function connectBluetooth({ bluetoothServices }) {
    if (!navigator.bluetooth) {
        throw new Error('Bluetooth is not available.');
    }

    if (!Array.isArray(bluetoothServices)) {
        throw new Error('Invalid input: bluetoothServices must be an array');
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
            characteristicsMap[service.uuid] = characteristics;
        }

        return { device, services: characteristicsMap };
    } catch (error) {
        throw new Error(error, 'Error while connecting to Bluetooth device.');
    }
}
