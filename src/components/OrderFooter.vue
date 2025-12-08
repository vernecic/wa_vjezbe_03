<script setup>
import { ref, computed } from 'vue'
defineProps({
  odabrana_pizza: {
    type: Object,
    required: true,
  },
})
const pizza_kolicina = ref(1)
const cijenaPizze = ref(null)

const emit = defineEmits(['close-footer'])
// functions
const addPizza = () => {
  pizza_kolicina.value++
}
const subtractPizza = () => {
  if (pizza_kolicina.value > 1) {
    pizza_kolicina.value--
  } else pizza_kolicina = 1
}
const selectSize = (cijena) => {
  cijenaPizze.value = cijena
}

const totalPrice = computed(() => cijenaPizze.value * pizza_kolicina.value)
</script>

<template>
  <footer
    v-if="odabrana_pizza"
    class="fixed bottom-0 left-0 right-0 bg-slate-700 backdrop-blur-sm border-t border-slate-600 shadow-xl p-4 sm:p-6 text-white"
  >
    <button
      class="absolute top-2 right-2 text-slate-300 hover:text-white text-xl font-bold cursor-pointer"
      @click="$emit('closeFooter')"
    >
      ×
    </button>
    <div
      class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 sm:gap-6"
    >
      <!-- Slika pizze i naziv -->

      <div
        class="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left gap-2 w-full sm:w-auto"
      >
        <img
          :src="odabrana_pizza.slika"
          alt="slika ovdje"
          class="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover shadow-md shadow-black/40"
        />

        <div :key="key">
          <h3 class="font-bold tracking-wide text-base sm:text-lg text-orange-400">
            {{ odabrana_pizza.naziv }}
          </h3>
        </div>
      </div>

      <!-- Odabir veličina + cijene -->
      <div class="flex items-center justify-center sm:justify-start flex-wrap gap-2 sm:w- auto">
        <button
          v-for="(cijena, velicina) in odabrana_pizza.cijene"
          :key="velicina"
          :class="
            cijenaPizze === cijena
              ? 'border-orange-400 bg-orange-300/40'
              : 'border-slate-500 bg-slate-600/40'
          "
          class="px-3 py-1 cursor-pointer rounded-lg border hover:bg-orange-500 hover:border-orange-400 hover:text-white transition-all text-sm sm:text-base"
          @click="selectSize(cijena)"
        >
          {{ velicina }} – {{ cijena }}€
        </button>
      </div>

      <!-- Odabir količine -->
      <div class="flex items-center justify-center space-x-2 w-full sm:w-auto">
        <button
          class="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white font-bold hover:bg-orange-600 transition-all cursor-pointer"
          @click="subtractPizza"
        >
          -
        </button>

        <div
          class="px-3 py-1 bg-slate-600/40 backdrop-blur-sm rounded-md border border-slate-500 text-sm sm:text-base"
        >
          {{ pizza_kolicina }}
        </div>

        <button
          class="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white font-bold hover:bg-orange-600 transition-all cursor-pointer"
          @click="addPizza"
        >
          +
        </button>
      </div>
      <div>
        Ukupno: <span v-if="totalPrice > 0">{{ totalPrice }}€</span>
      </div>

      <button
        class="bg-orange-500 text-white font-semibold px-4 py-2 rounded-xl shadow-md shadow-black/40 hover:bg-orange-600 transition-all tracking-wide cursor-pointer w-full sm:w-auto text-center"
      >
        Dodaj u košaricu
      </button>
    </div>
  </footer>
</template>
