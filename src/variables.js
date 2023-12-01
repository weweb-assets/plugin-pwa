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
    let isOnline = navigator.onLine;

    const handleNetworkChange = () => {
        isOnline = navigator.onLine;
        if (navigator.connection) {
            connection = navigator.connection;
        }

        wwLib.wwVariable.updateValue(`${pluginId}-network`, { isOnline, connection });
    };

    const wndw = getWindow();
    wndw.addEventListener('online', handleNetworkChange);
    wndw.addEventListener('offline', handleNetworkChange);
    if (navigator.connection) {
        navigator.connection.addEventListener('change', handleNetworkChange);
    }

    handleNetworkChange();
};

export const listenBattery = pluginId => {
    let batteryStatus = null;

    const handleBatteryChange = () => {
        const battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery;

        if (battery) {
            batteryStatus = {
                level: battery.level || null,
                charging: battery.charging || false,
                chargingTime: battery.chargingTime || 0,
                dischargingTime: battery.dischargingTime || 0,
            };

            wwLib.wwVariable.updateValue(`${pluginId}-battery`, batteryStatus);
            console.log('battery', batteryStatus);
        }
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

export const listenPageVisibility = pluginId => {
    let isVisible;
    const doc = getDocument();

    isVisible = !doc.hidden;

    const handleVisibilityChange = () => {
        isVisible = !doc.hidden;
        wwLib.wwVariable.updateValue(`${pluginId}-pageVisibility`, isVisible);
        console.log('pageVisibility', isVisible);
    };

    doc.addEventListener('visibilitychange', handleVisibilityChange);

    handleVisibilityChange();
};
