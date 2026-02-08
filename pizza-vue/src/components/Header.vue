<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isUser = ref(false)

const checkAuth = () => {
  const token = localStorage.getItem('token')
  isUser.value = !!token
}

onMounted(() => {
  checkAuth()
})

const logout = () => {
  localStorage.removeItem('token')
  isUser.value = false
  router.push('/prijava')
}

watch(
  () => route.path,
  () => {
    checkAuth()
  },
)
</script>
<template>
  <header class="w-full border-b border-slate-200 bg-slate-700 backdrop-blur-sm">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:px-6">
      <div class="flex items-center gap-2">
        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 shadow-sm">
          <img
            src="https://png.pngtree.com/png-clipart/20250703/original/pngtree-pizza-logo-transparent-image-free-for-online-download-png-image_21265162.png"
            alt="Logo"
            class="h-5 w-5 object-contain"
          />
        </div>
        <div class="flex flex-col leading-tight">
          <span class="text-sm font-semibold tracking-wide text-slate-200 uppercase">
            Pizza app
          </span>
          <span class="text-[11px] text-slate-200"> Fresh • Fast • Hot </span>
        </div>
      </div>
      <div class="flex gap-4 items-center text-white font-semibold" v-if="!isUser">
        <router-link
          to="/prijava"
          class="hover:text-orange-400 cursor-pointer transiton duration-200"
          >Prijava</router-link
        >
        <router-link
          to="/registracija"
          class="hover:text-orange-400 cursor-pointer transiton duration-200"
          >Registracija</router-link
        >
      </div>
      <div class="flex gap-4 items-center text-white font-semibold" v-if="isUser">
        <div class="text-white font-semibold cursor-pointer">Moje narudže</div>
        <div @click="logout" class="font-semibold cursor-pointer text-red-500">Odjava</div>
      </div>

      <div class="hidden text-right text-xs leading-snug text-slate-200 sm:block">
        <div class="font-medium text-slate-200">Negrijeva 6</div>
        <div class="text-[11px] text-slate-200">52100 Pula</div>
      </div>
    </div>
  </header>
</template>
