import { reactive } from 'vue';

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
    const state = reactive({
        isOnline: navigator.onLine,
        connection: navigator.connection || null,
    });

    const handleNetworkChange = () => {
        state.isOnline = navigator.onLine;
        state.connection = navigator.connection || null;
        wwLib.wwVariable.updateValue(`${pluginId}-network`, state);
    };

    const wndw = getWindow();
    wndw.addEventListener('online', handleNetworkChange);
    wndw.addEventListener('offline', handleNetworkChange);
    if (navigator.connection) {
        navigator.connection.addEventListener('change', handleNetworkChange);
    }

    handleNetworkChange();

    return state;
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
        wwLib.wwVariable.updateValue(`${pluginId}-battery`, batteryStatus);
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
    const isVisible = reactive({ value: !getDocument().hidden });

    const handleVisibilityChange = () => {
        isVisible.value = !getDocument().hidden;
        wwLib.wwVariable.updateValue(`${pluginId}-pageVisibility`, isVisible.value);
    };

    const doc = getDocument();
    doc.addEventListener('visibilitychange', handleVisibilityChange);

    handleVisibilityChange();

    return isVisible;
};
