import { reactive, ref, toRaw } from 'vue';
import DeviceDetector from 'device-detector-js';

const deviceDetector = new DeviceDetector();

const getDocument = () => {
    let doc;

    /* wwFront:start */
    doc = wwLib.getFrontDocument();
    /* wwFront:end */

    /* wwEditor:start */
    doc = wwLib.getEditorDocument();
    /* wwEditor:end */

    return doc;
};

const getWindow = () => {
    let wndw;

    /* wwFront:start */
    wndw = wwLib.getFrontWindow();
    /* wwFront:end */

    /* wwEditor:start */
    wndw = wwLib.getEditorWindow();
    /* wwEditor:end */

    return wndw;
};

export const listenNetwork = pluginId => {
    const networkState = reactive({
        isOnline: navigator.onLine,
        connection: navigator.connection || {
            downlink: -1,
            effectiveType: 'unknown',
            rtt: -1,
            saveData: false,
            type: 'unknown',
        },
        supported: 'connection' in navigator,
    });

    const handleNetworkChange = () => {
        networkState.isOnline = navigator.onLine;
        networkState.connection = navigator.connection || networkState.connection;
        wwLib.wwVariable.updateValue(`${pluginId}-network`, toRaw(networkState));
    };

    const wndw = getWindow();
    wndw.addEventListener('online', handleNetworkChange);
    wndw.addEventListener('offline', handleNetworkChange);
    if (navigator.connection) {
        navigator.connection.addEventListener('change', handleNetworkChange);
    }

    handleNetworkChange();
    return networkState;
};

export const listenBattery = pluginId => {
    const batteryStatus = reactive({
        level: -1,
        charging: false,
        chargingTime: -1,
        dischargingTime: -1,
        supported: 'getBattery' in navigator,
    });

    const handleBatteryChange = battery => {
        batteryStatus.level = battery.level ?? batteryStatus.level;
        batteryStatus.charging = battery.charging ?? batteryStatus.charging;
        batteryStatus.chargingTime = battery.chargingTime ?? batteryStatus.chargingTime;
        batteryStatus.dischargingTime = battery.dischargingTime ?? batteryStatus.dischargingTime;
        wwLib.wwVariable.updateValue(`${pluginId}-battery`, toRaw(batteryStatus));
    };

    if (batteryStatus.supported) {
        navigator.getBattery().then(battery => {
            handleBatteryChange(battery);
            battery.addEventListener('chargingchange', () => handleBatteryChange(battery));
            battery.addEventListener('levelchange', () => handleBatteryChange(battery));
            battery.addEventListener('chargingtimechange', () => handleBatteryChange(battery));
            battery.addEventListener('dischargingtimechange', () => handleBatteryChange(battery));
        });
    }

    return batteryStatus;
};

export const listenPageVisibility = pluginId => {
    const isVisible = ref(!getDocument().hidden);
    const supported = 'visibilityState' in getDocument();

    const handleVisibilityChange = () => {
        isVisible.value = !getDocument().hidden;
        wwLib.wwVariable.updateValue(`${pluginId}-pageVisibility`, isVisible.value);
    };

    const doc = getDocument();
    doc.addEventListener('visibilitychange', handleVisibilityChange);

    handleVisibilityChange();

    return { isVisible, supported };
};

export const listenScreen = pluginId => {
    const screenState = reactive({
        orientation: getWindow().screen.orientation.type || 'unknown',
        width: getWindow().innerWidth,
        height: getWindow().innerHeight,
    });

    const handleResize = () => {
        screenState.width = getWindow().innerWidth;
        screenState.height = getWindow().innerHeight;
        wwLib.wwVariable.updateValue(`${pluginId}-screenOrientation`, toRaw(screenState));
    };

    const handleOrientationChange = event => {
        console.log(`${event.alpha} : ${event.beta} : ${event.gamma}`);
        screenState.orientation = {
            alpha: event.alpha,
            beta: event.beta,
            gamma: event.gamma,
        };
        wwLib.wwVariable.updateValue(`${pluginId}-screenOrientation`, toRaw(screenState));
    };

    getWindow().addEventListener('resize', handleResize);
    getWindow().addEventListener('deviceorientation', handleOrientationChange);

    handleResize();
    handleOrientationChange();

    return screenState;
};

export const listenAmbientLight = async pluginId => {
    const sensor = ref(null);

    const lightState = reactive({
        illuminance: -1,
        supported: 'AmbientLightSensor' in getWindow(),
    });

    const stopAmbientLightListener = () => {
        if (sensor.value) {
            sensor.value.removeEventListener('reading', () => handleAmbientLight(sensor.value));
            sensor.value.stop();
        }
    };

    if (lightState.supported) {
        stopAmbientLightListener();
        sensor.value = new AmbientLightSensor();

        sensor.value.addEventListener('reading', event => {
            lightState.illuminance = sensor.value.illuminance;
            wwLib.wwVariable.updateValue(`${pluginId}-ambientLight`, toRaw(lightState));
        });

        sensor.value.start();
    } else {
        wwLib.wwVariable.updateValue(`${pluginId}-ambientLight`, toRaw(lightState));
    }

    return lightState;
};

export const listenDeviceMotion = async pluginId => {
    const motionState = reactive({
        acceleration: { x: -1, y: -1, z: -1 },
        accelerationIncludingGravity: { x: -1, y: -1, z: -1 },
        rotationRate: { alpha: -1, beta: -1, gamma: -1 },
        interval: -1,
        supported: 'DeviceMotionEvent' in getWindow(),
    });

    const handleDeviceMotion = event => {
        motionState.acceleration = event.acceleration || motionState.acceleration;
        motionState.accelerationIncludingGravity =
            event.accelerationIncludingGravity || motionState.accelerationIncludingGravity;
        motionState.rotationRate = event.rotationRate || motionState.rotationRate;
        motionState.interval = event.interval || motionState.interval;
        wwLib.wwVariable.updateValue(`${pluginId}-deviceMotion`, toRaw(motionState));
    };

    if (motionState.supported) {
        getWindow().removeEventListener('devicemotion', handleDeviceMotion);
        getWindow().addEventListener('devicemotion', handleDeviceMotion);
    }

    wwLib.wwVariable.updateValue(`${pluginId}-deviceMotion`, toRaw(motionState));
    return motionState;
};

export const getDeviceInfo = pluginId => {
    let deviceInfo = deviceDetector.parse(navigator.userAgent);
    wwLib.wwVariable.updateValue(`${pluginId}-deviceInfo`, deviceInfo);
    return deviceInfo;
};

export const listenPwa = pluginId => {
    let isInstalled = false;
    const info =
        'iOS may not reliably report the installed state of this PWA. Please be aware of potential limitations in tracking its installation status on iOS devices.';

    const checkPwaInstallation = () => {
        return new Promise(resolve => {
            if (!getWindow().matchMedia('(display-mode: standalone)').matches) {
                // Not in standalone mode (PWA is not installed)
                resolve(false);
            } else {
                // Already in standalone mode (PWA is installed)
                resolve(true);
            }
        });
    };

    checkPwaInstallation().then(installed => {
        isInstalled = installed;
        wwLib.wwVariable.updateValue(`${pluginId}-isPwaInstalled`, {
            isInstalled,
            info,
        });
    });

    // if (wwLib.installPwaPrompt) {

    // }

    return isInstalled;
};
