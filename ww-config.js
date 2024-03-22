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
        designSystemId: '"2158285b-a489-44b6-be61-5cab2bec46fb"',
    },
    variables: [
        { name: 'network', value: 'network', type: 'object', defaultValue: null },
        { name: 'battery', value: 'battery', type: 'object', defaultValue: null },
        { name: 'pageVisibility', value: 'pageVisibility', type: 'boolean', defaultValue: false },
        {
            name: 'deviceMotion',
            value: 'deviceMotion',
            type: 'object',
            defaultValue: {
                acceleration: { x: -1, y: -1, z: -1 },
                accelerationIncludingGravity: { x: -1, y: -1, z: -1 },
                rotationRate: { alpha: -1, beta: -1, gamma: -1 },
                interval: -1,
                supported: false,
            },
        },
        { name: 'deviceInfo', value: 'deviceInfo', type: 'object', defaultValue: null },
        // { name: 'isPwaInstalled', value: 'isPwaInstalled', type: 'object', defaultValue: null },
    ],
    actions: [
        {
            name: 'Add To Home Screen',
            code: 'installPwa',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/AddToHomeScreen.vue'),
            keywords: ['Android'],
            /* wwEditor:end */
        },
        {
            name: 'Geolocate',
            code: 'geolocation',
            isAsync: true,
            keywords: ['Android', 'iOS'],
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
            keywords: ['Android', 'iOS'],
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
            keywords: ['Android'],
            /* wwEditor:end */
        },
        {
            name: 'Show Notification',
            code: 'showNotification',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/ShowNotification.vue'),
            getIsValid({ notif_title }) {
                return !!notif_title;
            },
            keywords: ['Android', 'iOS'],
            /* wwEditor:end */
        },
        {
            name: 'Request Motion Permission',
            code: 'requestDeviceMotionPermission',
            isAsync: true,
            /* wwEditor:start */
            keywords: ['Android', 'iOS'],
            /* wwEditor:end */
        },
        {
            name: 'Listen Device Motion',
            code: 'listenDeviceMotion',
            isAsync: true,
            /* wwEditor:start */
            keywords: ['Android', 'iOS'],
            /* wwEditor:end */
        },
    ],
};
