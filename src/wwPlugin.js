import { getMimeType, convertURLToFile } from './utils';
import { geolocation } from './services/geolocation';
import { share } from './services/share';
import { vibrate } from './services/vibrate';
import { sendNotification } from './services/notification';

export default {
    publicInstance: null,
    async onLoad(settings) {
        console.log('PLUGIN ONLOAD 🔥', this);
    },
    async geolocation() {
        return geolocation();
    },
    async share({ share_title, share_text, share_url, share_files }) {
        return share(share_title, share_text, share_url, share_files);
    },
    async vibrate({ vibrate_pattern }) {
        return vibrate(vibrate_pattern);
    },
    async sendNotification(notificationOptions) {
        return sendNotification(notificationOptions);
    },
    async connectBluetooth({ bluetoothServices }) {
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
};
