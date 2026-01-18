<template>
  <h3 class="text-lg">Podaci za dostavu:</h3>
  <div>
    <form class="flex flex-col gap-4 mt-2 w-1/3" @submit.prevent="naruci()">
      <div class="flex flex-col gap-2">
        <label for="">Prezime</label>
        <input
          type="text"
          v-model="prezime"
          class="py-1 px-2 rounded border border-slate-300 focus:outline-none"
          placeholder="Unesite prezime"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="">Adresa</label>
        <input
          type="text"
          v-model="adresa"
          class="py-1 px-2 rounded border border-slate-300 focus:outline-none"
          placeholder="Unesite adresu"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="">Broj telefona</label>
        <input
          type="tel"
          v-model="brojTelefona"
          class="py-1 px-2 rounded border border-slate-300 focus:outline-none"
          placeholder="Unesite broj telefona"
        />
      </div>
      <button
        class="bg-orange-500 text-white font-semibold px-4 py-2 rounded-xl shadow-md shadow-black/40 hover:bg-orange-600 transition-all tracking-wide cursor-pointer text-center"
      >
        Naruči
      </button>
    </form>
    <div v-if="isError" class="text-red-500">
      {{ errorMessage }}
    </div>
  </div>
</template>
