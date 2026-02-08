<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const register = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const res = await axios.post('http://localhost:3000/auth/register', {
      username: username.value,
      password: password.value,
    })
    successMessage.value = 'Registracija uspješna'

    console.log(res.data)
  } catch (error) {
    console.log(error)
    errorMessage.value = 'Greška pri prijavi'
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg border border-gray-300 shadow-md w-full max-w-125">
      <h3 class="font-semibold text-gray-700 text-2xl mb-6 text-center">Registracija</h3>

      <form @submit.prevent="register" class="space-y-4">
        <div class="flex flex-col gap-1">
          <label for="username" class="text-gray-700 font-medium mb-2"> Korisničko ime </label>
          <input
            id="username"
            type="text"
            v-model="username"
            placeholder="Unesite korisničko ime"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            required
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="password" class="text-gray-700 font-medium mb-2"> Lozinka </label>
          <input
            id="password"
            type="password"
            v-model="password"
            placeholder="Unesite lozinku"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            required
          />
        </div>

        <div v-if="errorMessage" class="text-red-500 text-sm">
          {{ errorMessage }}
        </div>
        <div v-if="successMessage" class="text-green-500 text-base font-semibold">
          {{ successMessage }}
        </div>

        <button
          type="submit"
          class="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-400 transition duration-200 cursor-pointer"
        >
          Registriraj se
        </button>
      </form>

      <!-- Link to register -->
      <p class="text-center text-gray-600 mt-4">
        Imaš račun?
        <router-link to="/prijava" class="text-orange-500 hover:text-orange-400 font-medium">
          Prijavi se
        </router-link>
      </p>
    </div>
  </div>
</template>
