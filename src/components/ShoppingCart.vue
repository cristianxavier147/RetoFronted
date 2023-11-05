<script setup>
    import { computed } from 'vue';

    const $emit = defineEmits(['changeCategorySelected', 'deleteItem', 'editItem'])
    const props = defineProps({
        cart: {
            type: Array
        },
        sidebar: {
            type: Boolean
        }
    })

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const sidebarComputed = computed({
        get() {
            return props.sidebar
        },
        set(newValue) {
            $emit("changeSidebarValue", newValue)
        }
    })

    const getTotal = computed({
        get() {
            return props.cart.reduce((accum, current) => accum + current.total, 0)
        }
    })

    const deleteItem = (data) => {
        $emit('deleteItem', data)
    }

    const editItem = (data) => {
        $emit('editItem', data)
    }
</script>
<template>
    <Sidebar v-model:visible="sidebarComputed" position="right" class="w-full md:w-25rem lg:w-25rem xl:w-25rem" :pt="{
        header: {
            style: 'justify-content: space-between'
        }
    }">
        <template #header>
            <h2 class="mx-0 my-3">Your Shopping Cart</h2>
        </template>
        <div class="flex flex-column gap-2" v-if="cart.length != 0">
            <div class="item-cart" v-for="item in cart" :key="item.id">
                <img :src="item.image" width="80"/>
                <div class="item-cart-description">
                    <span class="item-title">{{ item.title }}</span>
                    <div class="flex align-items-center justify-content-between">
                        <InputNumber v-model="item.quantity" @input="editItem(item)" inputId="minmax-buttons" mode="decimal" showButtons :min="1" :max="100" :inputStyle="{ maxWidth: '100%' }"/>
                        <div class="flex align-items-center justify-content-between gap-3">
                            <span>{{ formatCurrency(item.total) }}</span>
                            <Button icon="pi pi-trash" severity="danger" rounded text aria-label="Cancel" @click="deleteItem(item)"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex align-items-center justify-content-between">
                <h3>Total: </h3>
                <h3>{{ formatCurrency(getTotal) }}</h3>
            </div>
            <div class="flex align-items-center justify-content-center">
                <Button label="Pay products" />
            </div>
        </div>
        <div class="flex flex-column gap-2" v-else>
            <h3>There are no products in your shopping cart! :(</h3>
        </div>
    </Sidebar>
</template>

<style scoped>
.item-cart{
    display: flex;
    flex-direction: row;
    background-color: rgb(236, 236, 236);
    border-radius: 8px;
    gap: 16px;
    padding: 16px;
}

.item-cart img{
    border-radius: 8px;
}

.item-cart-description{
    display: flex;
    flex-direction: column;
    width: calc( 100% - 96px );
    gap: 8px;
}

.item-title{
    font-size: 14px;
    font-weight: 700;
}

.p-inputnumber{
    max-width: 20%;
}

#integeronly{
    max-width: 100%;
}
</style>
  