<script setup>
    import { ref, onMounted } from 'vue';

    const $emit = defineEmits(['changeCategorySelected'])
    defineProps({
        categorySelected: {
            type: String
        }
    })

    const categories = ref([])

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

    const getCategories = async (category) => {
        let res = await fetch('https://fakestoreapi.com/products/categories')
        categories.value = await res.json()
    }

    const selectCategory = async (category) => {
        $emit('changeCategorySelected', category)
    }

    onMounted(async () => {
        getCategories()
    })
</script>
<template>
    <div class="flex flex-column">
        <h2>Select a category: </h2>
        <div class="category mb-3">
          <Button class="m-1" :label="category" :severity="getSeverity(category)" v-for="category in categories" :key="category.id" @click="selectCategory(category)" :text="!!categorySelected && categorySelected != category"/>
        </div>
        
    </div>
</template>

<style scoped>
 @media only screen and (max-width: 600px) {
    .category{
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
 }
</style>>
