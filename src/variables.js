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
        orientation: (getWindow().screen.orientation && getWindow().screen.orientation.type) || 'unknown',
        width: getWindow().innerWidth,
        height: getWindow().innerHeight,
    });

    const handleResize = () => {
        screenState.width = getWindow().innerWidth;
        screenState.height = getWindow().innerHeight;
        wwLib.wwVariable.updateValue(`${pluginId}-screenOrientation`, toRaw(screenState));
    };

    const handleOrientationChange = () => {
        screenState.orientation = getWindow().screen.orientation.type;
        wwLib.wwVariable.updateValue(`${pluginId}-screenOrientation`, toRaw(screenState));
    };

    getWindow().addEventListener('resize', handleResize);
    getWindow().addEventListener('orientationchange', handleOrientationChange);

    return screenState;
};

export const listenAmbientLight = pluginId => {
    const lightState = reactive({
        illuminance: null,
        supported: true,
    });

    if ('AmbientLightSensor' in getWindow()) {
        const sensor = new AmbientLightSensor();

        sensor.onreading = () => {
            lightState.illuminance = sensor.illuminance;
            wwLib.wwVariable.updateValue(`${pluginId}-ambientLight`, toRaw(lightState));
        };

        sensor.onerror = event => {
            lightState.supported = false;
            wwLib.wwVariable.updateValue(`${pluginId}-ambientLight`, toRaw(lightState));
        };

        sensor.start();
    } else {
        lightState.supported = false;
        wwLib.wwVariable.updateValue(`${pluginId}-ambientLight`, toRaw(lightState));
    }

    return lightState;
};

export const listenDeviceMotion = pluginId => {
    const motionState = reactive({
        acceleration: null,
        accelerationIncludingGravity: null,
        rotationRate: null,
        interval: null,
        supported: 'DeviceMotionEvent' in getWindow(),
    });

    const handleDeviceMotion = event => {
        motionState.acceleration = event.acceleration;
        motionState.accelerationIncludingGravity = event.accelerationIncludingGravity;
        motionState.rotationRate = event.rotationRate;
        motionState.interval = event.interval;
        wwLib.wwVariable.updateValue(`${pluginId}-deviceMotion`, toRaw(motionState));
    };

    if (motionState.supported) {
        getWindow().addEventListener('devicemotion', handleDeviceMotion);
    } else {
        wwLib.wwVariable.updateValue(`${pluginId}-deviceMotion`, toRaw(motionState));
    }

    return motionState;
};
