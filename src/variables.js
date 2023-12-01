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

const updateValue = (key, value) => {
    // Perform the variable update using the provided key and value
    console.log(`Updating ${key} with value:`, value);
    // For example: wwLib.wwVariable.updateValue(key, value);
};

export const useNetwork = pluginId => {
    let isOnline = navigator.onLine;
    let connectionType = navigator.connection ? navigator.connection.effectiveType : 'unknown';

    console.log(`${pluginId}-network`, { isOnline, connectionType });

    const handleNetworkChange = () => {
        isOnline = navigator.onLine;
        if (navigator.connection) {
            connectionType = navigator.connection.effectiveType;
        }

        updateValue(`${pluginId}-network`, {
            isOnline,
            connectionType,
        });

        console.log(`${pluginId}-network`, { isOnline, connectionType });
    };

    const wndw = getWindow();
    wndw.addEventListener('online', handleNetworkChange);
    wndw.addEventListener('offline', handleNetworkChange);
    if (navigator.connection) {
        navigator.connection.addEventListener('change', handleNetworkChange);
    }

    handleNetworkChange();

    return { isOnline, connectionType };
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

        updateValue(`${pluginId}-battery`, batteryStatus);

        console.log(`${pluginId}-battery`, batteryStatus);
    };

    handleBatteryChange();
    navigator.getBattery().then(battery => {
        battery.addEventListener('chargingchange', handleBatteryChange);
        battery.addEventListener('levelchange', handleBatteryChange);
        battery.addEventListener('chargingtimechange', handleBatteryChange);
        battery.addEventListener('dischargingtimechange', handleBatteryChange);
    });

    return batteryStatus;
};

export const useOnline = pluginId => {
    let isOnline = navigator.onLine;

    const handleOnlineStatus = () => {
        isOnline = navigator.onLine;
        updateValue(`${pluginId}-online`, isOnline);

        console.log(`${pluginId}-online`, isOnline);
    };

    const wndw = getWindow();
    wndw.addEventListener('online', handleOnlineStatus);
    wndw.addEventListener('offline', handleOnlineStatus);

    handleOnlineStatus();

    return isOnline;
};

export const usePageVisibility = pluginId => {
    let isVisible;
    const doc = getDocument();

    isVisible = !doc.hidden;

    const handleVisibilityChange = () => {
        isVisible = !doc.hidden;
        updateValue(`${pluginId}-pageVisibility`, isVisible);

        console.log(`${pluginId}-pageVisibility`, isVisible);
    };

    doc.addEventListener('visibilitychange', handleVisibilityChange);

    handleVisibilityChange();

    return isVisible;
};
