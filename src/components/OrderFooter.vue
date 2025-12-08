<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
  odabrana_pizza: {
    type: Object,
    required: true,
  },
})
const pizzaKolicina = ref(1)
const cijenaPizze = ref(null)
const odabranaVelicina = ref(null)
const narucenePizze = ref([])

//v-model
const prezime = ref('')
const adresa = ref('')
const brojTelefona = ref('')

const emit = defineEmits(['close-footer'])
// functions
const addPizza = () => {
  pizzaKolicina.value++
}
const subtractPizza = () => {
  if (pizzaKolicina.value > 1) {
    pizzaKolicina.value--
  } else pizzaKolicina = 1
}
const selectSize = (velicina, cijena) => {
  odabranaVelicina.value = velicina
  cijenaPizze.value = cijena
}

const closeFooter = () => {
  emit('close-footer')
  odabranaVelicina.value = null
  pizzaKolicina.value = 1
  narucenePizze.value = []
  cijenaPizze.value = null
}

const dodajNarudzbu = () => {
  if (odabranaVelicina.value) {
    const nova_stavka = {
      naziv: props.odabrana_pizza.naziv,
      velicina: odabranaVelicina.value,
      kolicina: pizzaKolicina.value,
    }
    narucenePizze.value.push(nova_stavka)
    console.log('Naručene pizze:', narucenePizze.value)
  }
}
const removePizza = (index) => {
    narucenePizze.value.splice(index,1)
}

const isError = ref(false)
const errorMessage = ref('')

const naruci = () => {
  if(!prezime.value && !brojTelefona.value && !adresa.value){
    isError.value = true;
    errorMessage.value = 'Unesite sve podatke'
    
  }
}

// computed
const totalPrice = computed(() => cijenaPizze.value * pizzaKolicina.value)
</script>

<template>
  <footer
    v-if="odabrana_pizza"
    class="fixed bottom-0 left-0 right-0 bg-slate-700 backdrop-blur-sm border-t border-slate-600 shadow-xl p-4 sm:p-6 text-white"
  >
    <button
      class="absolute top-2 right-2 text-slate-300 hover:text-white text-xl font-bold cursor-pointer"
      @click="closeFooter"
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
          @click="selectSize(velicina, cijena)"
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
          {{ pizzaKolicina }}
        </div>

        <button
          class="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white font-bold hover:bg-orange-600 transition-all cursor-pointer"
          @click="addPizza"
        >
          +
        </button>
      </div>
      <div>
        Ukupno: <span v-if="totalPrice > 0">{{ totalPrice.toFixed(2) }}€</span>
      </div>

      <button
        class="bg-orange-500 text-white font-semibold px-4 py-2 rounded-xl shadow-md shadow-black/40 hover:bg-orange-600 transition-all tracking-wide cursor-pointer w-full sm:w-auto text-center"
        @click="dodajNarudzbu()"
      >
        Dodaj u košaricu
      </button>
    </div>
    <div
      v-if="narucenePizze.length"
      class="mt-4 max-w-2xl mx-auto max-h-40 overflow-y-auto bg-slate-800/50 backdrop-blur-sm rounded-lg p-3 border border-slate-600"
    >
      <h4 class="font-semibold text-lg text-white mb-2">Stavke u košarici:</h4>
      <ul class="space-y-2">
        <li
          v-for="(stavka, index) in narucenePizze"
          :key="index"
          class="flex items-center justify-between bg-slate-700/50 rounded-md p-2"
        >
          <div class="text-white">
            {{ stavka.naziv }} ({{ stavka.velicina }}) x{{ stavka.kolicina }}
          </div>
          <div class="flex items-center gap-4">
          <div class="text-orange-400 font-semibold">
            {{ (props.odabrana_pizza.cijene[stavka.velicina] * stavka.kolicina).toFixed(2) }}€
          </div>
          <img src="/delete.svg" class="cursor-pointer" @click="removePizza(index)"></img></div>
        </li>
      </ul>
    </div>
    <div  v-if="narucenePizze.length" class="max-w-2xl mx-auto mt-5 ">
        <h3 class="text-lg">Podaci za dostavu: </h3>
        <div>
          <form class="flex flex-col gap-4 mt-2 w-1/3" @submit.prevent="naruci()">
            <div class="flex flex-col gap-2">
             <label for="">Prezime</label>
            <input type="text" v-model="prezime" class="py-1 px-2 rounded border border-slate-300 focus:outline-none " placeholder="Unesite prezime"></div>
            <div class="flex flex-col gap-2">
             <label for="">Adresa</label>
            <input type="text" v-model="adresa" class="py-1 px-2 rounded border border-slate-300 focus:outline-none " placeholder="Unesite adresu"></div>
            <div class="flex flex-col gap-2">
             <label for="">Broj telefona</label>
            <input type="tel" v-model="brojTelefona"  class="py-1 px-2 rounded border border-slate-300 focus:outline-none " placeholder="Unesite broj telefona"></div>
            <button  class="bg-orange-500 text-white font-semibold px-4 py-2 rounded-xl shadow-md shadow-black/40 hover:bg-orange-600 transition-all tracking-wide cursor-pointer  text-center">Naruči</button>
          </form>
          <div v-if="isError" class="text-red-500">
            {{ errorMessage }}
          </div>

        </div>
    </div>
  </footer>
</template>
