<script setup>
defineProps({
  pizza: Object,
  odabrana_pizza: Object,
  ikoneSastojaka: Object,
})
</script>

<template>
  <div
    class="bg-inherit rounded-xl overflow-hidden h-fit"
    :class="odabrana_pizza === pizza ? 'border-2 border-amber-500' : 'border-2 border-slate-300'"
  >
    <div class="w-full h-48 flex items-center justify-center bg-inherit">
      <img :src="pizza.slika_url" :alt="pizza.naziv" class="w-full h-full object-cover" />
    </div>

    <div class="p-6">
      <div class="flex items-center space-x-3 mb-4">
        <h2 class="text-lg font-bold text-orange-500 tracking-wide">{{ pizza.naziv }}</h2>

        <div class="flex space-x-2">
          <div
            v-for="(sastojak, index) in pizza.sastojci"
            :key="index"
            class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-slate-50 font-semibold text-xs"
          >
            <v-icon :name="ikoneSastojaka[sastojak]"></v-icon>
          </div>
        </div>
      </div>

      <div class="space-y-2">
        <div class="flex justify-between text-gray-700">
          <span class="font-medium">Mala</span>
          <span>€{{ pizza.cijena.mala }}</span>
        </div>

        <div class="flex justify-between text-gray-700">
          <span class="font-medium">Srednja</span>
          <span>€{{ pizza.cijena.srednja }}</span>
        </div>

        <div class="flex justify-between text-gray-700">
          <span class="font-medium">Jumbo</span>
          <span>€{{ pizza.cijena.jumbo }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
