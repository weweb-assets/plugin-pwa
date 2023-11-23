import { getMimeType, convertURLToFile } from './utils';

export default {
    publicInstance: null,
    deferredInstallPrompt: null,
    /*=============================================m_ÔÔ_m=============================================\
        Plugin API
    \================================================================================================*/
    async onLoad(settings) {
        console.log('PLUGIN ONLOAD 🔥', this);

        window.addEventListener('beforeinstallprompt', e => {
            // Assuming 'myPlugin' is an instance of your plugin
            this.saveBeforeInstallPromptEvent(e);
        });
    },
    saveBeforeInstallPromptEvent(event) {
        event.preventDefault(); // Prevent the mini-infobar from appearing on mobile
        this.deferredInstallPrompt = event;
    },
    async promptAddToHomeScreen() {
        if (!this.deferredInstallPrompt) {
            throw new Error('No install prompt available.');
        }

        this.deferredInstallPrompt.prompt();
        const choiceResult = await this.deferredInstallPrompt.userChoice;

        if (choiceResult.outcome !== 'accepted') {
            throw new Error('User dismissed the install prompt.');
        }

        this.deferredInstallPrompt = null;
    },
    async promptInstall() {
        this.plugin.promptAddToHomeScreen().catch(error => {
            console.error('Installation failed:', error);
        });
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
            const files = await Promise.all(
                share_files.map(async file => {
                    console.log(file);
                    const mimeType = getMimeType(file.ext);
                    return convertURLToFile(file.url, file.name, mimeType);
                })
            );

            const shareData = {
                title: share_title,
                text: share_text,
                url: share_url,
                files,
            };

            if (navigator.canShare && navigator.canShare(shareData)) {
                await navigator.share(shareData);
            } else {
                throw new Error('Data cannot be shared.');
            }
        } catch (error) {
            throw new Error(error, 'Error while sharing.');
        }
    },
    async vibrate({ vibrate_pattern }) {
        console.log('VIBRATE', vibrate_pattern);

        if (!('vibrate' in navigator)) {
            throw new Error('Vibration is not available.');
        }

        try {
            navigator.vibrate(vibrate_pattern);
        } catch (error) {
            throw new Error(error, 'Error while triggering vibration.');
        }
    },
    async sendNotification({
        notif_title,
        notif_body,
        notif_icon,
        notif_image,
        notif_tag,
        notif_data,
        notif_vibrate,
        notif_actions,
    }) {
        if (!('Notification' in window)) {
            throw new Error('Notifications are not available.');
        }

        try {
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                throw new Error('Notification permission denied.');
            }

            const registration = await navigator.serviceWorker.getRegistration();
            if (registration) {
                const options = {
                    body: notif_body,
                    icon: notif_icon,
                    image: notif_image,
                    tag: notif_tag,
                    data: notif_data,
                    vibrate: notif_vibrate,
                    actions: notif_actions,
                };

                registration.showNotification(notif_title, options);
            } else {
                throw new Error('Service Worker registration not found.');
            }
        } catch (error) {
            throw new Error(error, 'Error while sending notification.');
        }
    },
};
