<template>
    <wwEditorInputRow
        label="Bluetooth Services"
        type="array"
        :model-value="bluetoothServices"
        bindable
        @update:modelValue="setBluetoothServices"
        @add-item="setBluetoothServices([...(bluetoothServices || []), {}])"
    >
        <template #default="{ item, setItem }">
            <wwEditorInputRow
                :model-value="item.key"
                type="select"
                :options="bluetoothServiceOptions"
                small
                placeholder="Select a service"
                @update:model-value="setItem({ ...item, key: $event })"
            />
        </template>
    </wwEditorInputRow>
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
            bluetoothServiceOptions: [
                { label: 'Battery Service', value: 'battery_service' },
                { label: 'Device Information', value: 'device_information' },
                { label: 'Heart Rate', value: 'heart_rate' },
                { label: 'Environmental Sensing', value: 'environmental_sensing' },
                { label: 'Cycling Speed and Cadence', value: 'cycling_speed_and_cadence' },
                { label: 'Human Interface Device', value: 'human_interface_device' },
                { label: 'Automation IO', value: 'automation_io' },
            ],
        };
    },
    computed: {
        bluetoothServices() {
            return this.args.bluetoothServices || [];
        },
    },
    methods: {
        setBluetoothServices(services) {
            this.$emit('update:args', { ...this.args, bluetoothServices: services });
        },
    },
};
</script>
