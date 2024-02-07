<template>
    <wwEditorInputRow
        label="Vibration Pattern"
        type="array"
        :model-value="vibrate_pattern"
        bindable
        required
        placeholder="Enter vibration pattern"
        @update:modelValue="setPattern"
    />
    <wwEditorQuestionMark tooltip-position="top-left" class="ml-2" :forcedContent="vibrationHelp" />
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        args: { type: Object, required: true },
    },
    emits: ['update:args'],
    data() {
        return {
            vibrationHelp: `The vibration pattern is an array of numbers that describes the pattern with which the device should vibrate. The values are in milliseconds. The first value indicates the number of milliseconds to wait before turning the vibration on. The next value indicates the number of milliseconds for which to keep the vibration on before turning it off. Subsequent values alternate between the number of milliseconds to turn the vibration off or to turn the vibration on.`,
        };
    },
    computed: {
        vibrate_pattern() {
            return this.args.vibrate_pattern;
        },
    },
    methods: {
        setPattern(vibrate_pattern) {
            this.$emit('update:args', { ...this.args, vibrate_pattern });
        },
    },
};
</script>
