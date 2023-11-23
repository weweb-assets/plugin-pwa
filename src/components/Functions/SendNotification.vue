<template>
    <wwEditorInputRow
        label="Title"
        type="query"
        :model-value="notif_title"
        bindable
        required
        placeholder="Enter notification title"
        @update:modelValue="setTitle"
    />
    <wwEditorInputRow
        label="Body"
        type="query"
        :model-value="notif_body"
        bindable
        placeholder="Enter notification body"
        @update:modelValue="setBody"
    />
    <wwEditorInputImage
        label="Icon"
        :model-value="notif_icon"
        bindable
        placeholder="Select an icon"
        @update:modelValue="setIcon"
    />
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        args: { type: Object, required: true },
    },
    emits: ['update:args'],
    computed: {
        notif_title() {
            return this.args.notif_title;
        },
        notif_body() {
            return this.args.notif_body;
        },
        notif_icon() {
            return this.args.notif_icon;
        },
    },
    methods: {
        setTitle(notif_title) {
            this.$emit('update:args', { ...this.args, notif_title });
        },
        setBody(notif_body) {
            this.$emit('update:args', { ...this.args, notif_body });
        },
        setIcon(notif_icon) {
            this.$emit('update:args', { ...this.args, notif_icon });
        },
    },
};
</script>
