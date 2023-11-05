<script setup>
  import ProductList from './components/ProductList.vue'
  import CategoryList from './components/CategoryList.vue'
  import ShoppingCart from './components/ShoppingCart.vue'
  import { ref, onMounted } from 'vue'
  import { useToast } from "primevue/usetoast"
  const toast = useToast()

  const categorySelected = ref("")
  const cart = ref([])
  const sidebar = ref(false)

  const changeCategorySelected = (category) => {
    if(category == categorySelected.value){
      categorySelected.value = ""
    }else {
      categorySelected.value = category
    }
  }

  const addCart = (data) => {
    cart.value.push({
      ...data,
      quantity: 1,
      total: data.price
    })
    toast.add({ severity: 'success', summary: 'Product added to Cart', detail: `${data.title}`, group: 'br', life: 3000 });
  }

  const changeSidebarValue = (data) => {
    sidebar.value = data
  }

  const deleteItem = (data) => {
    let index = cart.value.findIndex(x => x.id == data.id)
    cart.value.splice(index, 1)
    toast.add({ severity: 'error', summary: 'Product removed from Cart', detail: `${data.title}`, group: 'br', life: 3000 });
  }

  const editItem = (data) => {
    let index = cart.value.findIndex(x => x.id == data.id)
    cart.value[index] = {
      ...data,
      total: data.quantity*data.price
    }
  }

  onMounted(() => {
  })
</script>

<template>
  <div class="flex flex-column">
    <Toast position="bottom-right" group="br" />
    <CategoryList :categorySelected="categorySelected" @changeCategorySelected="changeCategorySelected"></CategoryList>
    <ProductList :categorySelected="categorySelected" :cart="cart" @addCart="addCart" @changeSidebarValue="changeSidebarValue"></ProductList>
    <ShoppingCart :sidebar="sidebar" :cart="cart" @changeSidebarValue="changeSidebarValue" @editItem="editItem" @deleteItem="deleteItem"></ShoppingCart>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
