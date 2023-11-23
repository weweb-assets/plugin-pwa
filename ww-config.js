export default {
    editor: {
        settings: [
            {
                label: 'Configuration',
                icon: 'advanced',
                edit: () => import('./src/components/Configuration/SettingsEdit.vue'),
                summary: () => import('./src/components/Configuration/SettingsSummary.vue'),
            },
        ],
        designSystemId: 'TO BE DEFINED',
        // QR Code
        // Media Capute
    },
    variables: [],
    actions: [
        {
            name: 'Add To Home Screen',
            code: 'promptInstall',
            isAsync: true,
        },
        {
            name: 'Geolocation',
            code: 'geolocation',
            isAsync: true,
        },
        {
            name: 'Share',
            code: 'share',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/Share.vue'),
            getIsValid({ share_title, share_url }) {
                return !!share_title && !!share_url;
            },
            /* wwEditor:end */
        },
        {
            name: 'Vibrate',
            code: 'vibrate',
            isAsync: false,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/Vibrate.vue'),
            getIsValid({ vibrate_pattern }) {
                return vibrate_pattern && Array.isArray(vibrate_pattern) && vibrate_pattern.length > 0;
            },
            /* wwEditor:end */
        },
        {
            name: 'Send Notification',
            code: 'sendNotification',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/SendNotification.vue'),
            getIsValid({ notif_title, notif_body }) {
                return !!notif_title && !!notif_body;
            },
            /* wwEditor:end */
        },
    ],
};
