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
                { label: 'Blood Pressure', value: 'blood_pressure' },
                { label: 'Current Time', value: 'current_time' },
                { label: 'Cycling Speed and Cadence', value: 'cycling_speed_and_cadence' },
                { label: 'Device Information', value: 'device_information' },
                { label: 'Environmental Sensing', value: 'environmental_sensing' },
                { label: 'Heart Rate', value: 'heart_rate' },
                { label: 'Human Interface Device', value: 'human_interface_device' },
                { label: 'Immediate Alert', value: 'immediate_alert' },
                { label: 'Link Loss', value: 'link_loss' },
                { label: 'Location and Navigation', value: 'location_and_navigation' },
                { label: 'Next DST Change', value: 'next_dst_change' },
                { label: 'Phone Alert Status', value: 'phone_alert_status' },
                { label: 'Pulse Oximeter', value: 'pulse_oximeter' },
                { label: 'Running Speed and Cadence', value: 'running_speed_and_cadence' },
                { label: 'Scan Parameters', value: 'scan_parameters' },
                { label: 'Transport Discovery', value: 'transport_discovery' },
                { label: 'Tx Power', value: 'tx_power' },
                { label: 'User Data', value: 'user_data' },
                { label: 'Weight Scale', value: 'weight_scale' },
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
