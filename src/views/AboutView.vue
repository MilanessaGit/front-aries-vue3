<template>
  <div class="about">
    <h1>Acerca de </h1>
    <br>
    {{ mis_datos }}
    <br>
    <button @click="salir">SALIR</button>
  </div>
</template>

<script>
import authService from '@/service/AuthService';
import { ref } from 'vue';
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const mis_datos = ref({}) // Si usamos ref , entonces para acceder a los valores d objeto usamos .value

    const perfil = async() => {  
      const {data} = await authService.getPerfil();
      mis_datos.value = data
    }

    const salir = async() => {
      await authService.logout();
      localStorage.removeItem("access_token");
      router.push({name: 'Login'}) // router redirecciona a /login
    } 

    perfil() // Hago funcionar la funcion-flecha perfil
    return {mis_datos, salir}
  }
}
</script>

