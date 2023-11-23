<template>
    <wwEditorInputRow
        label="Vibration Pattern"
        type="array"
        :model-value="pattern"
        bindable
        required
        placeholder="Enter vibration pattern"
        @update:modelValue="setPattern"
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
        pattern() {
            return this.args.pattern;
        },
    },
    methods: {
        setPattern(pattern) {
            this.$emit('update:args', { ...this.args, pattern });
        },
    },
};
</script>
