export const requestDeviceMotionPermission = async () => {
    try {
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            return await DeviceMotionEvent.requestPermission();
        }
    } catch (error) {
        throw new Error('Device motion permission request failed', error);
    }
};

export const requestAmbientLightPermission = async () => {
    try {
        if (typeof AmbientLightSensor.requestPermission === 'function') {
            return await AmbientLightSensor.requestPermission();
        }
    } catch (error) {
        throw new Error('Ambient light permission request failed', error);
    }
};
