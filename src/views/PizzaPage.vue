<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { GiPizzaCutter } from 'oh-vue-icons/icons'
const route = useRoute()
const naziv = route.params.naziv

const pizza = ref(null)

const fetchPizza = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/pizze/${naziv}`)
    pizza.value = res.data
    console.log(pizza.value)
  } catch (err) {
    console.error(err)
  }
}
onMounted(() => {
  fetchPizza()
})
</script>

<template>
  <div class="max-w-6xl mx-auto mt-10">
    <router-link to="/" class="py-1 px-2 rounded border cursor-pointer hover:bg-slate-50">
      Vrati se na sve pizze
    </router-link>
    <div v-if="pizza">
      <h1 class="text-3xl font-bold text-slate-500 mt-10">{{ pizza.naziv }}</h1>
      <div class="flex gap-10">
        <div>
          <div class="w-[600px] h-[400px]">
            <img :src="pizza.slika" alt="" class="mt-5 w-full h-full object-cover" />
          </div>
          <h3 class="text-xl font-semibold">Sastojci:</h3>
          <div v-for="sastojak in pizza.sastojci" class="uppercase">
            <span></span>{{ sastojak }}
          </div>
        </div>
        <div>
          <h3 class="mt-5 text-xl font-semibold">Cijene</h3>
          <div class="flex flex-column">
            <ul>
              <li>Mala: {{ pizza.cijene.mala }}€</li>
              <li>Srednja: {{ pizza.cijene.srednja }}€</li>
              <li>Jumbo: {{ pizza.cijene.jumbo }}€</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
