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
    ],
};
