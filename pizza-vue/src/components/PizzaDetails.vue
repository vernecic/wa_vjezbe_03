<script setup>
defineProps({
  pizze: Array,
})
</script>
<template>
  <div class="border border-slate-300 p-6 rounded-md mt-5 text-xl">
    <div v-for="pizza in pizze" :key="pizza._id">
      <router-link :to="`/pizze/${pizza.naziv}`" class="hover:text-slate-400 cursor-pointer">{{
        pizza.naziv
      }}</router-link>
    </div>
  </div>
</template>
