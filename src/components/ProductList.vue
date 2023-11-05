<script setup>
    import SearchBar from './SearchBar.vue';
    import { ref, computed, onMounted } from 'vue';

    const $emit = defineEmits(['addCart', 'changeSidebarValue'])

    const props = defineProps({
        categorySelected: {
            type: String
        },
        cart: {
            type: Array
        }
    })

    const products = ref([])
    const search = ref("")

    const productsComputed = computed({
        get() {
            return products.value.filter((product) => {
                if(!props.categorySelected){
                    return (
                        product.title
                            .toLowerCase()
                            .indexOf(search.value.toLowerCase()) != -1
                    )
                }
                return (
                    product.title
                        .toLowerCase()
                        .indexOf(search.value.toLowerCase()) != -1
                    && product.category
                        .toLowerCase() == props.categorySelected.toLowerCase()
                )
            })
        }
    })

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const getSeverity = (category) => {
        switch (category) {
            case "men's clothing":
                return 'info';

            case 'electronics':
                return 'success';

            case 'jewelery':
                return 'warning';

            default:
                return 'danger';
        }
    }

    const getProducts = async (category) => {
        let res = await fetch('https://fakestoreapi.com/products')
        products.value = await res.json()
    }

    const changeSearch = (newValue) => {
        search.value = newValue
    }

    const addToCart = async (data) => {
        $emit('addCart', data)
    }

    const existInCart = (id) => {
        if(props.cart.length != 0){
            return props.cart.map(x => x.id).includes(id)
        }
        return false
    }

    onMounted(async () => {
        getProducts()
    })
</script>
<template>
    <DataTable :value="productsComputed" tableStyle="min-width: 50rem">
        <template #header>
            <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                <span class="text-xl text-900 font-bold">Products List</span>
                <div class="flex align-items-center justify-content-between">
                    <SearchBar :search="search" @changeSearch="changeSearch"></SearchBar>
                    <Button v-tooltip.top="'View your cart'" icon="pi pi-shopping-cart" text rounded :badge="`${cart.length}`" :disabled="cart.length == 0" @click="$emit('changeSidebarValue', true)"></Button>
                </div>
            </div>
        </template>
        <Column>
            <template #body="slotProps">
                <img :src="slotProps.data.image" width="100"/>
            </template>
        </Column>
        <Column field="title" header="Name"></Column>
        <Column field="price" header="Price">
            <template #body="slotProps">
                {{ formatCurrency(slotProps.data.price) }}
            </template>
        </Column>
        <Column field="rating" header="Reviews">
            <template #body="slotProps">
                <Rating :modelValue="slotProps.data.rating.rate" readonly :cancel="false" />
            </template>
        </Column>
        <Column header="Category">
            <template #body="slotProps">
                <Tag :value="slotProps.data.category" :severity="getSeverity(slotProps.data.category)" />
            </template>
        </Column>
        <Column>
            <template #body="slotProps">
                <Button v-tooltip.top="'Added to Cart'" icon="pi pi-check" disabled rounded v-if="existInCart(slotProps.data.id)"></Button>
                <Button v-tooltip.top="'Add to Cart'" icon="pi pi-plus" text rounded @click="addToCart(slotProps.data)" v-else></Button>
            </template>
        </Column>
        <template #footer> In total there are {{ products ? products.length : 0 }} products. </template>
    </DataTable>
</template>
  