import { reactive } from 'vue';

// import { getMimeType, convertURLToFile } from './utils';
import { geolocation } from './services/geolocation';
import { share } from './services/share';
import { vibrate } from './services/vibrate';
import { sendNotification } from './services/notification';
import { connectBluetooth } from './services/bluetooth';

import { useNetwork, useBattery, useOnline, usePageVisibility } from './variables';

export const VARIABLES = reactive({
    networkStatus: null,
    batteryStatus: null,
    onlineStatus: null,
    pageVisibility: null,
});

export default {
    async onLoad(settings) {
        console.log('Plugin loaded 🔥', this);

        VARIABLES.networkStatus = useNetwork(this.id);
        VARIABLES.batteryStatus = useBattery(this.id);
        VARIABLES.onlineStatus = useOnline(this.id);
        VARIABLES.pageVisibility = usePageVisibility(this.id);
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
