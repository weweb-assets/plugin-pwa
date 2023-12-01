import { ref, onMounted, onUnmounted } from 'vue';

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
    const isOnline = ref(navigator.onLine);
    const connectionType = ref(navigator.connection ? navigator.connection.effectiveType : 'unknown');

    const handleNetworkChange = () => {
        isOnline.value = navigator.onLine;
        if (navigator.connection) {
            connectionType.value = navigator.connection.effectiveType;
        }

        wwLib.wwVariable.updateValue(`${pluginId}-network`, {
            isOnline: isOnline.value,
            connectionType: connectionType.value,
        });

        console.log(`${pluginId}-network`, { isOnline, connectionType });
    };

    onMounted(() => {
        const wndw = getWindow();
        wndw.addEventListener('online', handleNetworkChange);
        wndw.addEventListener('offline', handleNetworkChange);
        if (navigator.connection) {
            navigator.connection.addEventListener('change', handleNetworkChange);
        }

        handleNetworkChange();
    });

    onUnmounted(() => {
        const wndw = getWindow();
        wndw.removeEventListener('online', handleNetworkChange);
        wndw.removeEventListener('offline', handleNetworkChange);
        if (navigator.connection) {
            navigator.connection.removeEventListener('change', handleNetworkChange);
        }
    });

    return { isOnline, connectionType };
};

export const useBattery = pluginId => {
    const batteryStatus = ref(null);

    const handleBatteryChange = () => {
        const battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery;
        batteryStatus.value = {
            level: battery.level,
            charging: battery.charging,
            chargingTime: battery.chargingTime,
            dischargingTime: battery.dischargingTime,
        };

        wwLib.wwVariable.updateValue(`${pluginId}-battery`, batteryStatus.value);

        console.log(`${pluginId}-battery`, batteryStatus.value);
    };

    onMounted(() => {
        handleBatteryChange();
        navigator.getBattery().then(battery => {
            battery.addEventListener('chargingchange', handleBatteryChange);
            battery.addEventListener('levelchange', handleBatteryChange);
            battery.addEventListener('chargingtimechange', handleBatteryChange);
            battery.addEventListener('dischargingtimechange', handleBatteryChange);
        });

        handleBatteryChange();
    });

    onUnmounted(() => {
        navigator.getBattery().then(battery => {
            battery.removeEventListener('chargingchange', handleBatteryChange);
            battery.removeEventListener('levelchange', handleBatteryChange);
            battery.removeEventListener('chargingtimechange', handleBatteryChange);
            battery.removeEventListener('dischargingtimechange', handleBatteryChange);
        });
    });

    return batteryStatus;
};

export const useOnline = pluginId => {
    const isOnline = ref(navigator.onLine);
    const wndw = getWindow();

    const handleOnlineStatus = () => {
        isOnline.value = navigator.onLine;
        wwLib.wwVariable.updateValue(`${pluginId}-online`, isOnline.value);

        console.log(`${pluginId}-online`, isOnline.value);
    };

    onMounted(() => {
        wndw.addEventListener('online', handleOnlineStatus);
        wndw.addEventListener('offline', handleOnlineStatus);

        handleOnlineStatus();
    });

    onUnmounted(() => {
        wndw.removeEventListener('online', handleOnlineStatus);
        wndw.removeEventListener('offline', handleOnlineStatus);
    });

    return isOnline;
};

export const usePageVisibility = pluginId => {
    let isVisible;
    const doc = getDocument();

    isVisible = ref(!doc.hidden);

    const handleVisibilityChange = () => {
        isVisible.value = !doc.hidden;
        wwLib.wwVariable.updateValue(`${pluginId}-pageVisibility`, isVisible.value);

        console.log(`${pluginId}-pageVisibility`, isVisible.value);
    };

    onMounted(() => {
        doc.addEventListener('visibilitychange', handleVisibilityChange);

        handleVisibilityChange();
    });

    onUnmounted(() => {
        doc.removeEventListener('visibilitychange', handleVisibilityChange);
    });

    return isVisible;
};
