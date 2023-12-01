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

export const useNetwork = pluginId => {
    let isOnline = navigator.onLine;
    let connectionType = navigator.connection ? navigator.connection.effectiveType : 'unknown';

    const handleNetworkChange = () => {
        isOnline = navigator.onLine;
        if (navigator.connection) {
            connectionType = navigator.connection.effectiveType;
        }

        wwLib.wwVariable.updateValue(`${pluginId}-network`, { isOnline, connectionType });
    };

    const wndw = getWindow();
    wndw.addEventListener('online', handleNetworkChange);
    wndw.addEventListener('offline', handleNetworkChange);
    if (navigator.connection) {
        navigator.connection.addEventListener('change', handleNetworkChange);
    }

    handleNetworkChange();
};

export const useBattery = pluginId => {
    let batteryStatus = null;

    const handleBatteryChange = () => {
        const battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery;
        batteryStatus = {
            level: battery.level,
            charging: battery.charging,
            chargingTime: battery.chargingTime,
            dischargingTime: battery.dischargingTime,
        };

        wwLib.wwVariable.updateValue(`${pluginId}-battery`, batteryStatus);
    };

    handleBatteryChange();
    navigator.getBattery().then(battery => {
        battery.addEventListener('chargingchange', handleBatteryChange);
        battery.addEventListener('levelchange', handleBatteryChange);
        battery.addEventListener('chargingtimechange', handleBatteryChange);
        battery.addEventListener('dischargingtimechange', handleBatteryChange);
    });

    handleBatteryChange();
};

export const useOnline = pluginId => {
    let isOnline = navigator.onLine;

    const handleOnlineStatus = () => {
        isOnline = navigator.onLine;
        wwLib.wwVariable.updateValue(`${pluginId}-online`, isOnline);
    };

    const wndw = getWindow();
    wndw.addEventListener('online', handleOnlineStatus);
    wndw.addEventListener('offline', handleOnlineStatus);

    handleOnlineStatus();
};

export const usePageVisibility = pluginId => {
    let isVisible;
    const doc = getDocument();

    isVisible = !doc.hidden;

    const handleVisibilityChange = () => {
        isVisible = !doc.hidden;
        wwLib.wwVariable.updateValue(`${pluginId}-pageVisibility`, isVisible);
    };

    doc.addEventListener('visibilitychange', handleVisibilityChange);

    handleVisibilityChange();
};
