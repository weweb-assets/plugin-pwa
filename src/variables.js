import { ref, onMounted, onUnmounted } from 'vue';

export const useNetwork = () => {
    const isOnline = ref(navigator.onLine);
    const connectionType = ref(navigator.connection ? navigator.connection.effectiveType : 'unknown');

    const handleNetworkChange = () => {
        isOnline.value = navigator.onLine;
        if (navigator.connection) {
            connectionType.value = navigator.connection.effectiveType;
        }
    };

    onMounted(() => {
        window.addEventListener('online', handleNetworkChange);
        window.addEventListener('offline', handleNetworkChange);
        if (navigator.connection) {
            navigator.connection.addEventListener('change', handleNetworkChange);
        }
    });

    onUnmounted(() => {
        window.removeEventListener('online', handleNetworkChange);
        window.removeEventListener('offline', handleNetworkChange);
        if (navigator.connection) {
            navigator.connection.removeEventListener('change', handleNetworkChange);
        }
    });

    return { isOnline, connectionType };
};

export const useBattery = () => {
    const batteryStatus = ref(null);

    const handleBatteryChange = () => {
        const battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery;
        batteryStatus.value = {
            level: battery.level,
            charging: battery.charging,
            chargingTime: battery.chargingTime,
            dischargingTime: battery.dischargingTime,
        };
    };

    onMounted(() => {
        handleBatteryChange();
        navigator.getBattery().then(battery => {
            battery.addEventListener('chargingchange', handleBatteryChange);
            battery.addEventListener('levelchange', handleBatteryChange);
            battery.addEventListener('chargingtimechange', handleBatteryChange);
            battery.addEventListener('dischargingtimechange', handleBatteryChange);
        });
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

export const useOnline = () => {
    const isOnline = ref(navigator.onLine);

    const handleOnlineStatus = () => {
        isOnline.value = navigator.onLine;
    };

    onMounted(() => {
        window.addEventListener('online', handleOnlineStatus);
        window.addEventListener('offline', handleOnlineStatus);
    });

    onUnmounted(() => {
        window.removeEventListener('online', handleOnlineStatus);
        window.removeEventListener('offline', handleOnlineStatus);
    });

    return isOnline;
};

export const usePageVisibility = () => {
    const isVisible = ref(!document.hidden);

    const handleVisibilityChange = () => {
        isVisible.value = !document.hidden;
    };

    onMounted(() => {
        document.addEventListener('visibilitychange', handleVisibilityChange);
    });

    onUnmounted(() => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
    });

    return isVisible;
};
