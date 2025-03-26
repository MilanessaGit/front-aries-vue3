<template>
    <div>
        <h1>Login - Ingresar</h1>
        {{ usuario }}
        <br> <!-- (br) Salto de Linea--> 
        <input type="email" v-model="usuario.email"> <!-- v-model va capturando y editando la const usuario {email} -->
        <br>
        <input type="password" v-model="usuario.password"> <!-- v-model va capturando y editando la const usuario {password} -->
        <br>
        <button @click="funIngresar()">INGRESAR</button>
    </div>
</template>

<script>
import authService from '@/service/AuthService'; // @ = ./src
import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
    // composition API 
    setup(){
        const router = useRouter();
        const usuario = ref({email: "", password: ""})
        
        const funIngresar = async () => { // async siempre trabaja con await
            // usuario.value (aqui estan los datos de => const usuario, cuando usamos ref())
            // console.log(usuario.value) muestra los datos cm objeto (inspeccionar pagina en la web)
            const {data} = await authService.login(usuario.value) //1ro. se envia los datos de usuario desde Vue, 2do.(await) se espera la respuesta del servidor Laravel(token)
            console.log(data) 
            
            localStorage.setItem("access_token", data.access_token) // En LocalStorage seteamos y guardamos la respuesta del servidor(data.access_token), con el nombre de "access_token"
            //,data.access_token : Es el token que genero Laravel y q nos envia cm respuesta de la funcion login-LARAVEL
            alert("INGRESANDO..")
            router.push({name: 'about'}) // redireccionamos a dashboard
            
        }
        return{ usuario, funIngresar }
    }
}
</script>