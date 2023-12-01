import { ref } from 'vue';

// import { getMimeType, convertURLToFile } from './utils';
import { geolocation } from './services/geolocation';
import { share } from './services/share';
import { vibrate } from './services/vibrate';
import { sendNotification } from './services/notification';
import { connectBluetooth } from './services/bluetooth';

import { useNetwork, useBattery, useOnline, usePageVisibility } from './variables';

export default {
    networkStatus: ref(null),
    batteryStatus: ref(null),
    onlineStatus: ref(null),
    pageVisibility: ref(null),

    async onLoad(settings) {
        console.log('Plugin loaded 🔥', this);

        this.networkStatus = useNetwork(this.id);
        this.batteryStatus = useBattery(this.id);
        this.onlineStatus = useOnline(this.id);
        this.pageVisibility = usePageVisibility(this.id);
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
