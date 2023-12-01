// import { getMimeType, convertURLToFile } from './utils';
import { geolocation } from './services/geolocation';
import { share } from './services/share';
import { vibrate } from './services/vibrate';
import { sendNotification } from './services/notification';
import { connectBluetooth } from './services/bluetooth';

import { listenNetwork, listenBattery, listenOnline, listenPageVisibility } from './variables';

export default {
    async onLoad(settings) {
        listenNetwork(this.id);
        listenBattery(this.id);
        listenOnline(this.id);
        listenPageVisibility(this.id);

        console.log('Plugin loaded 🔥', this);
    },
    async geolocation() {
        return geolocation();
    },
    async share(shareOptions) {
        return share(shareOptions);
    },
    async vibrate(vibrateOptions) {
        return vibrate(vibrateOptions);
    },
    async sendNotification(notificationOptions) {
        return sendNotification(notificationOptions);
    },
    async connectBluetooth(bluetoothOptions) {
        return connectBluetooth(bluetoothOptions);
    },
};
