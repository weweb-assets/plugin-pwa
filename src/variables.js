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
        connection: navigator.connection || {
            downlink: -1,
            effectiveType: 'unknown',
            rtt: -1,
            saveData: false,
            type: 'unknown',
        },
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
    });

    const handleBatteryChange = battery => {
        batteryStatus.level = battery.level ?? batteryStatus.level;
        batteryStatus.charging = battery.charging ?? batteryStatus.charging;
        batteryStatus.chargingTime = battery.chargingTime ?? batteryStatus.chargingTime;
        batteryStatus.dischargingTime = battery.dischargingTime ?? batteryStatus.dischargingTime;
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
        orientation: getWindow().screen.orientation.type || 'unknown',
        width: getWindow().innerWidth,
        height: getWindow().innerHeight,
    });

    const handleResize = () => {
        screenState.width = getWindow().innerWidth;
        screenState.height = getWindow().innerHeight;
        wwLib.wwVariable.updateValue(`${pluginId}-screenOrientation`, toRaw(screenState));
    };

    const handleOrientationChange = () => {
        screenState.orientation = getWindow().screen.orientation.type || screenState.orientation;
        wwLib.wwVariable.updateValue(`${pluginId}-screenOrientation`, toRaw(screenState));
    };

    getWindow().addEventListener('resize', handleResize);
    getWindow().addEventListener('orientationchange', handleOrientationChange);

    handleResize();
    handleOrientationChange();

    return screenState;
};

export const listenAmbientLight = pluginId => {
    const lightState = reactive({
        illuminance: -1,
        supported: 'AmbientLightSensor' in getWindow(),
    });

    if (lightState.supported) {
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
        wwLib.wwVariable.updateValue(`${pluginId}-ambientLight`, toRaw(lightState));
    }

    return lightState;
};

export const listenDeviceMotion = pluginId => {
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
        getWindow().addEventListener('devicemotion', handleDeviceMotion);
        wwLib.wwVariable.updateValue(`${pluginId}-deviceMotion`, toRaw(motionState));
    } else {
        wwLib.wwVariable.updateValue(`${pluginId}-deviceMotion`, toRaw(motionState));
    }

    return motionState;
};
