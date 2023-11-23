<template>
    <wwEditorFormRow required label="PWA">

    </wwEditorFormRow>
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        settings: { type: Object, required: true },
    },
    emits: ['update:settings'],
    data() {
        return {
        };
    },
    mounted() {

    },
    methods: {

    },
};
</script>
