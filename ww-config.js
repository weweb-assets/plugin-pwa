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
    variables: [
        { name: 'network', value: 'network', type: 'object', defaultValue: null },
        { name: 'battery', value: 'battery', type: 'object', defaultValue: null },
        { name: 'pageVisibility', value: 'pageVisibility', type: 'boolean', defaultValue: false },
        { name: 'screenOrientation', value: 'screenOrientation', type: 'object', defaultValue: null },
        { name: 'ambientLight', value: 'ambientLight', type: 'object', defaultValue: null },
        { name: 'deviceMotion', value: 'deviceMotion', type: 'object', defaultValue: null },
        { name: 'deviceInfo', value: 'deviceInfo', type: 'object', defaultValue: null },
        { name: 'isPwaInstalled', value: 'isPwaInstalled', type: 'boolean', defaultValue: false },
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
        // Waiting for more use cases / qualifications
        // {
        //     name: 'Connect Bluetooth',
        //     code: 'connectBluetooth',
        //     isAsync: true,
        //     /* wwEditor:start */
        //     edit: () => import('./src/components/Functions/Bluetooth.vue'),
        //     getIsValid({ bluetoothServices }) {
        //         return bluetoothServices && bluetoothServices.length > 0;
        //     },
        //     /* wwEditor:end */
        // },
    ],
};
