import { watch } from 'vue';

import { getMimeType, convertURLToFile } from './utils';
import { geolocation } from './services/geolocation';
import { share } from './services/share';
import { vibrate } from './services/vibrate';
import { sendNotification } from './services/notification';
import { connectBluetooth } from './services/bluetooth';

import { useNetwork, useBattery, useOnline, usePageVisibility } from './variables';

export default {
    publicInstance: null,
    networkStatus: null,
    batteryStatus: null,
    onlineStatus: null,
    pageVisibility: null,

    async onLoad(settings) {
        console.log('PLUGIN ONLOAD 🔥', this);

        this.networkStatus = useNetwork();
        this.batteryStatus = useBattery();
        this.onlineStatus = useOnline();
        this.pageVisibility = usePageVisibility();

        console.log('networkStatus', this.networkStatus);
        console.log('batteryStatus', this.batteryStatus);
        console.log('onlineStatus', this.onlineStatus);
        console.log('pageVisibility', this.pageVisibility);

        watch(this.networkStatus, value => {
            console.log('networkStatus', value);
        });

        watch(this.batteryStatus, value => {
            console.log('batteryStatus', value);
        });

        watch(this.onlineStatus, value => {
            console.log('onlineStatus', value);
        });

        watch(this.pageVisibility, value => {
            console.log('pageVisibility', value);
        });
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
