// import { getMimeType, convertURLToFile } from './utils';
import { geolocation } from './services/geolocation';
import { share } from './services/share';
import { vibrate } from './services/vibrate';
import { sendNotification } from './services/notification';
import { connectBluetooth } from './services/bluetooth';

import {
    listenNetwork,
    listenBattery,
    listenPageVisibility,
    listenScreen,
    listenAmbientLight,
    listenDeviceMotion,
    getDeviceInfo,
} from './variables';

export default {
    networkState: null,
    batteryState: null,
    pageVisibilityState: null,
    screenOrientationState: null,
    ambientLightState: null,
    deviceMotionState: null,

    async onLoad(settings) {
        this.networkState = listenNetwork(this.id);
        this.batteryState = listenBattery(this.id);
        this.pageVisibilityState = listenPageVisibility(this.id);
        this.screenOrientationState = listenScreen(this.id);
        this.ambientLightState = listenAmbientLight(this.id);
        this.deviceMotionState = listenDeviceMotion(this.id);
        this.deviceInfo = getDeviceInfo(this.id);
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
