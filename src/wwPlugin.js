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

            return {
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
    async share({ share_title, share_text, share_url, share_files }) {
        console.log('SHARE', share_title, share_text, share_url, share_files);

        if (!('share' in navigator)) {
            throw new Error('Share is not available.');
        }

        try {
            const response = await navigator.share({
                title: share_title,
                text: share_text,
                url: share_url,
                files: share_files,
            });
        } catch (error) {
            throw new Error(error, 'Error while sharing.');
        }
    },
};
