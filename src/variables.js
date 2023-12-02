import { reactive, ref, toRaw } from 'vue';

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
        connection: navigator.connection || null,
    });

    const handleNetworkChange = () => {
        networkState.isOnline = navigator.onLine;
        networkState.connection = navigator.connection || null;
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
        level: null,
        charging: false,
        chargingTime: 0,
        dischargingTime: 0,
    });

    const handleBatteryChange = battery => {
        batteryStatus.level = battery.level;
        batteryStatus.charging = battery.charging;
        batteryStatus.chargingTime = battery.chargingTime;
        batteryStatus.dischargingTime = battery.dischargingTime;
        wwLib.wwVariable.updateValue(`${pluginId}-battery`, toRaw(batteryStatus));
    };

    navigator.getBattery().then(battery => {
        handleBatteryChange(battery);
        battery.addEventListener('chargingchange', () => handleBatteryChange(battery));
        battery.addEventListener('levelchange', () => handleBatteryChange(battery));
        battery.addEventListener('chargingtimechange', () => handleBatteryChange(battery));
        battery.addEventListener('dischargingtimechange', () => handleBatteryChange(battery));
    });

    return batteryStatus;
};

export const listenPageVisibility = pluginId => {
    const isVisible = ref(!getDocument().hidden);

    const handleVisibilityChange = () => {
        isVisible.value = !getDocument().hidden;
        wwLib.wwVariable.updateValue(`${pluginId}-pageVisibility`, isVisible.value);
    };

    const doc = getDocument();
    doc.addEventListener('visibilitychange', handleVisibilityChange);

    handleVisibilityChange();

    return isVisible;
};

export const listenScreen = pluginId => {
    const screenState = reactive({
        orientation: window.screen.orientation.type,
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const handleResize = () => {
        screenState.width = window.innerWidth;
        screenState.height = window.innerHeight;
        wwLib.wwVariable.updateValue(`${pluginId}-screenSize`, toRaw(screenState));
    };

    const handleOrientationChange = () => {
        screenState.orientation = window.screen.orientation.type;
        wwLib.wwVariable.updateValue(`${pluginId}-screenOrientation`, toRaw(screenState));
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return screenState;
};

export const listenAmbientLight = pluginId => {
    const lightState = reactive({
        illuminance: null,
    });

    if ('AmbientLightSensor' in window) {
        const sensor = new AmbientLightSensor();

        sensor.onreading = () => {
            lightState.illuminance = sensor.illuminance;
            wwLib.wwVariable.updateValue(`${pluginId}-ambientLight`, toRaw(lightState));
        };

        sensor.onerror = event => {
            throw new Error(`Ambient Light Sensor error: ${event.error.name}`);
        };

        sensor.start();
    } else {
        throw new Error('Ambient Light Sensor is not supported by your device.');
    }

    return lightState;
};

export const listenDeviceMotion = pluginId => {
    const motionState = reactive({
        acceleration: null,
        accelerationIncludingGravity: null,
        rotationRate: null,
        interval: null,
    });

    if ('DeviceMotionEvent' in window) {
        const sensor = new DeviceMotionEvent();

        sensor.onreading = () => {
            motionState.acceleration = sensor.acceleration;
            motionState.accelerationIncludingGravity = sensor.accelerationIncludingGravity;
            motionState.rotationRate = sensor.rotationRate;
            motionState.interval = sensor.interval;
            wwLib.wwVariable.updateValue(`${pluginId}-deviceMotion`, toRaw(motionState));
        };

        sensor.onerror = event => {
            throw new Error(`Device Motion Sensor error: ${event.error.name}`);
        };

        sensor.start();
    } else {
        throw new Error('Device Motion Sensor is not supported by your device.');
    }

    return motionState;
};
