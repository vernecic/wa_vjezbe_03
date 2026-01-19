<script setup>
import { ref, onMounted, watch } from 'vue'
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
const pizzaSearch = ref('')

// filter
const minPrice = ref(null)
const maxPrice = ref(null)

// sort
const selectedSort = ref(null)

// funkcije
const odaberiPizzu = (pizza) => {
  odabrana_pizza.value = pizza
  console.log(`Odabrana pizza: ${odabrana_pizza.value}`)
  emit('odaberi-pizzu', pizza)
}

const fetchPizze = async () => {
  try {
    const res = await axios.get('http://localhost:3000/pizze', {
      params: {
        naziv: pizzaSearch.value,
        minPrice: minPrice.value,
        maxPrice: maxPrice.value,
        sortBy: selectedSort.value,
      },
    })
    pizze.value = res.data
    console.log(pizze.value)
  } catch (error) {
    console.error(`Greška pri dohvaćanju podataka ${error}`)
  }
}
const closeFooter = () => {
  odabrana_pizza.value = null
}

const sortOptions = [
  {
    label: 'Cijena silazno',
    value: 'PRICE_DESC',
  },
  {
    label: 'Cijena uzlazno',
    value: 'PRICE_ASC',
  },
]

const sortBy = (option) => {
  selectedSort.value = option.value
  fetchPizze()
}
//
onMounted(() => {
  fetchPizze()
})

watch(pizzaSearch, (newSearch) => {
  fetchPizze()
})
</script>
<template>
  <div
    class="mx-auto bg-linear-to-br min-h-screen p-8 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat"
  >
    <div class="flex gap-10">
      <div class="w-1/5">
        <PizzaDetails :pizze="pizze" class="w-full h-fit" />
        <div>
          <input
            type="text"
            placeholder="Pretraži pizze"
            class="py-1 px-2 rounded border border-slate-300 w-full focus:outline-none mt-5"
            v-model="pizzaSearch"
          />
        </div>
        <div class="border border-slate-300 p-6 rounded-md mt-5">
          <div class="mt-2">
            <p>Min. cijena</p>
            <input
              type="number"
              v-model="minPrice"
              class="border border-slate-300 px-2 py-1 rounded focus:outline-none w-[100px] mt-1"
            />
          </div>
          <div class="mt-2">
            <p>Max. cijena</p>
            <input
              type="number"
              v-model="maxPrice"
              class="border border-slate-300 px-2 py-1 rounded focus:outline-none w-[100px] mt-1"
            />
          </div>
          <button
            class="bg-slate-500 text-white uppercase font-semibold py-1 px-2 rounded mt-2 hover:bg-slate-600 cursor-pointer"
            @click="fetchPizze"
          >
            Filter
          </button>
        </div>
        <h3 class="font-semibold uppercase mt-5 pl-6">Sort by:</h3>
        <div class="border border-slate-300 px-6 py-2 rounded-md mt-2">
          <p
            v-for="option in sortOptions"
            :key="option.value"
            class="hover:text-slate-800 cursor-pointer"
            @click="sortBy(option)"
          >
            {{ option.label }}
          </p>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-5 w-4/5">
        <PizzaItem
          v-for="pizza in pizze"
          :key="pizza.id"
          :pizza="pizza"
          :odabrana_pizza="odabrana_pizza"
          :ikoneSastojaka="ikoneSastojaka"
          @click="odaberiPizzu(pizza)"
        />
      </div>
    </div>
    <OrderFooter :odabrana_pizza="odabrana_pizza" @close-footer="closeFooter" />
  </div>
</template>
