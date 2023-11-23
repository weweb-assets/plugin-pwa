export default {
    editor: {
        settings: [
            {
                label: 'Configuration',
                icon: 'advanced',
                edit: () => import('./src/components/Configuration/SettingsEdit.vue'),
                summary: () => import('./src/components/Configuration/SettingsSummary.vue'),
                getIsValid(settings) {
                    return ();
                },
            },
        ],
        designSystemId: 'TO BE DEFINED',
    },
    variables: [

    ],
    actions: [

    ],
};
