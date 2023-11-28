function convertCharacteristicProperties(properties) {
    let readableProperties = [];
    for (const key in properties) {
        if (properties[key] === true) {
            readableProperties.push(key);
        }
    }
    return readableProperties.join(', ');
}

function convertCharacteristicValue(dataView) {
    let valueHex = '';
    for (let i = 0; i < dataView.byteLength; i++) {
        valueHex += dataView.getUint8(i).toString(16).padStart(2, '0');
    }
    return valueHex;
}

export async function connectBluetooth({ bluetoothServices }) {
    if (!navigator.bluetooth) {
        throw new Error('Bluetooth is not available.');
    }

    const serviceLabels = bluetoothServices.reduce((map, service) => {
        map[service.key] = service.label;
        return map;
    }, {});

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
            const serviceName = serviceLabels[service.uuid] || `Unknown Service (${service.uuid})`;

            characteristicsMap[serviceName] = [];

            for (const characteristic of characteristics) {
                let charDetails = {
                    uuid: characteristic.uuid,
                    properties: convertCharacteristicProperties(characteristic.properties),
                    value: null,
                    humanReadableValue: null,
                };

                if (characteristic.properties.read) {
                    const rawValue = await characteristic.readValue();
                    charDetails.value = convertCharacteristicValue(rawValue);
                    // Here we can add specific conversions for known characteristic types if necessary
                }

                characteristicsMap[serviceName].push(charDetails);
            }
        }

        return { deviceName: device.name, services: characteristicsMap };
    } catch (error) {
        throw new Error(error, 'Error while connecting to Bluetooth device.');
    }
}
