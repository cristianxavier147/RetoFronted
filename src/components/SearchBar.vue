<script setup>
    import { computed } from 'vue';

    const $emit = defineEmits(['changeSearch'])

    const props = defineProps({
        search: {
            type: String
        }
    })

    const searchComputed = computed({
        get() {
            return props.search
        },
        set(newValue) {
            $emit("changeSearch", newValue)
        }
    })
</script>
<template>
    <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText v-model="searchComputed" placeholder="Search" />
    </span>
</template>
  