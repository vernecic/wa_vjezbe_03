<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { addIcons } from 'oh-vue-icons'
import {
  GiTomato,
  GiCheeseWedge,
  GiSlicedMushroom,
  IoLeafSharp,
  CoHotjar,
  GiMilkCarton,
  GiBellPepper,
  LaPepperHotSolid,
  GiCannedFish,
  GiGarlic,
  FaBacon,
  GiHamShank,
} from 'oh-vue-icons/icons'
addIcons(
  GiTomato,
  GiCheeseWedge,
  GiSlicedMushroom,
  IoLeafSharp,
  GiBellPepper,
  GiHamShank,
  LaPepperHotSolid,
  GiCannedFish,
  GiGarlic,
  FaBacon,
  CoHotjar,
  GiMilkCarton,
)
import PizzaDetails from './PizzaDetails.vue'
import PizzaItem from './PizzaItem.vue'
import OrderFooter from '../components/OrderFooter.vue'

const ikoneSastojaka = {
  rajčica: 'gi-tomato',
  sir: 'gi-cheese-wedge',
  gljive: 'gi-sliced-mushroom',
  bosiljak: 'io-leaf-sharp',
  paprika: 'gi-bell-pepper',
  šunka: 'gi-ham-shank',
  'feferoni ljuti': 'la-pepper-hot-solid',
  tunjevina: 'gi-canned-fish',
  'crveni luk': 'gi-garlic',
  panceta: 'fa-bacon',
  kulen: 'co-hotjar',
  vrhnje: 'gi-milk-carton',
}
const pizze = ref([])
const odabrana_pizza = ref(null)
const emit = defineEmits(['odaberi-pizzu'])

// funkcije
const odaberiPizzu = (pizza) => {
  odabrana_pizza.value = pizza
  console.log(`Odabrana pizza: ${odabrana_pizza.value}`)
  emit('odaberi-pizzu', pizza)
}

const fetchPizze = async () => {
  try {
    const res = await axios.get('http://localhost:3000/pizze')
    pizze.value = res.data
    console.log(pizze.value)
  } catch (error) {
    console.error(`Greška pri dohvaćanju podataka ${error}`)
  }
}
const closeFooter = () => {
  odabrana_pizza.value = null
}

//
onMounted(() => {
  fetchPizze()
})
</script>
<template>
  <div
    class="mx-auto bg-linear-to-br min-h-screen p-8 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat"
  >
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <PizzaItem
        v-for="pizza in pizze"
        :key="pizza.id"
        :pizza="pizza"
        :odabrana_pizza="odabrana_pizza"
        :ikoneSastojaka="ikoneSastojaka"
        @click="odaberiPizzu(pizza)"
      ></PizzaItem>
      <PizzaDetails></PizzaDetails>
    </div>
    <OrderFooter :odabrana_pizza="odabrana_pizza" @close-footer="closeFooter" />
  </div>
</template>
