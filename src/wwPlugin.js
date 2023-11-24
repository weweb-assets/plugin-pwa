import { getMimeType, convertURLToFile } from './utils';
import { geolocation } from './services/geolocation';
import { share } from './services/share';

export default {
    publicInstance: null,
    async onLoad(settings) {
        console.log('PLUGIN ONLOAD 🔥', this);
    },
    geolocation: await geolocation(),
    share: await share({ share_title, share_text, share_url, share_files }),
    async vibrate({ vibrate_pattern }) {
        console.log('VIBRATE', vibrate_pattern);

        if (!('vibrate' in navigator)) {
            throw new Error('Vibration is not available.');
        }

        try {
            navigator.vibrate(vibrate_pattern);
        } catch (error) {
            throw new Error(error, 'Error while triggering vibration.');
        }
    },
    async sendNotification({
        notif_title,
        notif_body,
        notif_icon,
        notif_image,
        notif_tag,
        notif_data,
        notif_vibrate,
        notif_actions,
    }) {
        if (!('Notification' in window)) {
            throw new Error('Notifications are not available.');
        }

        try {
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                throw new Error('Notification permission denied.');
            }

            const registration = await navigator.serviceWorker.getRegistration();
            if (registration) {
                const options = {
                    body: notif_body,
                    icon: notif_icon,
                    image: notif_image,
                    tag: notif_tag,
                    data: notif_data,
                    vibrate: notif_vibrate,
                    actions: notif_actions,
                };

                registration.showNotification(notif_title, options);
            } else {
                throw new Error('Service Worker registration not found.');
            }
        } catch (error) {
            throw new Error(error, 'Error while sending notification.');
        }
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
