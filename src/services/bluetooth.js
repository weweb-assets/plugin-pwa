export async function connectBluetooth(bluetoothServices) {
    if (!navigator.bluetooth) {
        throw new Error('Bluetooth is not available.');
    }

    try {
        const device = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true, // Modify as needed
            optionalServices: bluetoothServices.map(service => service.key),
        });

        const server = await device.gatt.connect();

        // Discover services
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
},