import { ref } from 'vue';

// import { getMimeType, convertURLToFile } from './utils';
import { geolocation } from './services/geolocation';
import { share } from './services/share';
import { vibrate } from './services/vibrate';
import { sendNotification } from './services/notification';
import { connectBluetooth } from './services/bluetooth';

import { useNetwork, useBattery, useOnline, usePageVisibility } from './variables';

export default {
    networkStatus: useNetwork(this.id),
    batteryStatus: useBattery(this.id),
    onlineStatus: useOnline(this.id),
    pageVisibility: usePageVisibility(this.id),

    async onLoad(settings) {
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
