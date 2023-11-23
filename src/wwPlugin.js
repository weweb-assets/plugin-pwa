export default {
    publicInstance: null,
    /*=============================================m_ÔÔ_m=============================================\
        Plugin API
    \================================================================================================*/
    async onLoad(settings) {
        console.log('PLUGIN ONLOAD 🔥', this);
    },
    async geolocation() {
        if (!('geolocation' in navigator)) {
            throw new Error('Geolocation is not available.');
        }

        try {
            const response = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            result = {
                coords: {
                    accuracy: response.coords.accuracy,
                    altitude: response.coords.altitude,
                    altitudeAccurary: response.coords.altitudeAccurary,
                    heading: response.coords.heading,
                    latitude: response.coords.latitude,
                    longitude: response.coords.longitude,
                    speed: response.coords.speed,
                },
                timestamp: response.timestamp,
            };
        } catch (error) {
            throw new Error(error, 'Error while geolocation.');
        }
    },
    async share() {
        if (!('share' in navigator)) {
            throw new Error('Share is not available.');
        }

        try {
            const response = await navigator.share({
                title: 'Web WorldWind',
                text: 'Web WorldWind is a free, open-source virtual globe for web pages.',
                url: 'https://worldwind.arc.nasa.gov/web/',
            });
        } catch (error) {
            throw new Error(error, 'Error while sharing.');
        }
    },
};
