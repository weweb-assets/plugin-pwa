export default {
    editor: {
        settings: [
            {
                label: 'Configuration',
                icon: 'advanced',
                edit: () => import('./src/components/Configuration/SettingsEdit.vue'),
                summary: () => import('./src/components/Configuration/SettingsSummary.vue'),
                getIsValid(settings) {
                    return true;
                },
            },
        ],
        designSystemId: 'TO BE DEFINED',
        // QR Code
        // Media Capute
    },
    variables: [],
    actions: [
        {
            name: 'Share',
            code: 'share',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/Share.vue'),
            /* wwEditor:end */
        },
    ],
};
