// import { getMimeType, convertURLToFile } from './utils';
import { geolocation } from './services/geolocation';
import { share } from './services/share';
import { vibrate } from './services/vibrate';
import { showNotification } from './services/notification';
import { connectBluetooth } from './services/bluetooth';

import {
    listenNetwork,
    listenBattery,
    listenPageVisibility,
    listenScreen,
    listenAmbientLight,
    listenDeviceMotion,
    getDeviceInfo,
    listenPwa,
} from './variables';

export default {
    networkState: null,
    batteryState: null,
    pageVisibilityState: null,
    screenOrientationState: null,
    ambientLightState: null,
    deviceMotionState: null,
    deviceInfoState: null,
    pwaState: null,

    async onLoad(settings) {
        this.networkState = listenNetwork(this.id);
        this.batteryState = listenBattery(this.id);
        this.pageVisibilityState = listenPageVisibility(this.id);
        this.screenOrientationState = listenScreen(this.id);
        this.ambientLightState = listenAmbientLight(this.id);
        this.deviceMotionState = listenDeviceMotion(this.id);
        this.deviceInfoState = getDeviceInfo(this.id);
        this.pwaState = listenPwa(this.id);
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
    async showNotification(notificationOptions) {
        return showNotification(notificationOptions);
    },
    async connectBluetooth(bluetoothOptions) {
        return connectBluetooth(bluetoothOptions);
    },
    async requestDeviceMotionPermission() {
        try {
            if (typeof DeviceMotionEvent.requestPermission === 'function') {
                await DeviceMotionEvent.requestPermission();
            }
        } catch (error) {
            throw new Error('Device motion permission request failed', error);
        }
    },
    async requestAmbientLightPermission() {
        try {
            if (typeof AmbientLightSensor.requestPermission === 'function') {
                await AmbientLightSensor.requestPermission();
            }
        } catch (error) {
            throw new Error('Ambient light permission request failed', error);
        }
    },
    async installPwa() {
        if (wwLib.installPwaPrompt) {
            try {
                await wwLib.installPwaPrompt.prompt();
            } catch (error) {
                throw new Error('PWA installation failed');
            }
        } else {
            throw new Error('Install prompt not available');
        }
    },
};
