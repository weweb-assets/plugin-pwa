export default {
    editor: {
        designSystemId: '"2158285b-a489-44b6-be61-5cab2bec43fb"',
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
    ],
    actions: [
        {
            name: 'Add To Home Screen',
            code: 'installPwa',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/AddToHomeScreen.vue'),
            keywords: ['Android'],
            copilot: {
                description: 'Prompts the user to install the PWA on their device',
                returns: 'void',
                schema: {}
            },
            /* wwEditor:end */
        },
        {
            name: 'Geolocate',
            code: 'geolocation',
            isAsync: true,
            keywords: ['Android', 'iOS'],
            /* wwEditor:start */
            copilot: {
                description: 'Gets the current geolocation coordinates of the device',
                returns: 'object',
                schema: {}
            },
            /* wwEditor:end */
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
            copilot: {
                description: 'Opens the native share dialog with specified content',
                returns: 'void',
                schema: {
                    share_title: {
                        type: 'string',
                        description: 'Title of the content to share',
                        bindable: true
                    },
                    share_text: {
                        type: 'string',
                        description: 'Description text of the content to share',
                        bindable: true
                    },
                    share_url: {
                        type: 'string',
                        description: 'URL to share',
                        bindable: true
                    }
                }
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
            keywords: ['Android'],
            copilot: {
                description: 'Triggers device vibration with a specified pattern',
                returns: 'void',
                schema: {
                    vibrate_pattern: {
                        type: 'array',
                        description: 'Array of numbers representing vibration durations in milliseconds',
                        bindable: true
                    }
                }
            },
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
            copilot: {
                description: 'Displays a system notification with customizable content',
                returns: 'void',
                schema: {
                    notif_title: {
                        type: 'string',
                        description: 'Title of the notification',
                        bindable: true
                    },
                    notif_body: {
                        type: 'string',
                        description: 'Main content of the notification',
                        bindable: true
                    },
                    notif_icon: {
                        type: 'string',
                        description: 'URL of the notification icon',
                        bindable: true
                    },
                    notif_image: {
                        type: 'string',
                        description: 'URL of the notification image',
                        bindable: true
                    },
                    notif_tag: {
                        type: 'string',
                        description: 'Unique identifier for the notification',
                        bindable: true
                    },
                    notif_data: {
                        type: 'object',
                        description: 'Additional data to attach to the notification',
                        bindable: true
                    },
                    notif_vibrate: {
                        type: 'array',
                        description: 'Vibration pattern for the notification',
                        bindable: true
                    }
                }
            },
            /* wwEditor:end */
        },
        {
            name: 'Request Motion Permission',
            code: 'requestDeviceMotionPermission',
            isAsync: true,
            /* wwEditor:start */
            keywords: ['Android', 'iOS'],
            copilot: {
                description: 'Requests permission to access device motion sensors',
                returns: 'string',
                schema: {}
            },
            /* wwEditor:end */
        },
        {
            name: 'Listen Device Motion',
            code: 'listenDeviceMotion',
            isAsync: true,
            /* wwEditor:start */
            keywords: ['Android', 'iOS'],
            copilot: {
                description: 'Starts listening to device motion events and updates the deviceMotion variable',
                returns: 'object',
                schema: {}
            },
            /* wwEditor:end */
        },
    ],
};