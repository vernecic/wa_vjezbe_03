<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const pizze = ref([])

const fetchPizze = async () => {
  try {
    const res = await axios.get('http://localhost:3000/pizze')
    pizze.value = res.data
    console.log(pizze.value)
  } catch (error) {
    console.error(`Greška pri dohvaćanju podataka ${error}`)
  }
}

onMounted(() => {
  fetchPizze()
})
</script>
<template>
  <div class="border border-slate-300 p-6 rounded-md mt-5 text-2xl">
    <div v-for="pizza in pizze" :key="pizza.id">
      <router-link :to="`/pizze/${pizza.naziv}`" class="hover:text-slate-400 cursor-pointer">{{
        pizza.naziv
      }}</router-link>
    </div>
  </div>
</template>
