import axios from "axios";

/*  #Function Flecha  
const http = () => {

}
    #Function Anonima
const http2 = function (){

}
    #Function Simple
function http3(){

}*/ 

// HttpAxios.js : Configura las peticiones Http entre cliente hacia el servidor 

const urlServidor = 'http://127.0.0.1:8000/api'; 

// AQUI HACEMOS EL Formato de Nuestra Peticion AL SERVIDOR 
export const http = () => {   // Aqui se intercepta los datos despues de la respuesta del servidor, para reutilizarlos( para otros servicios x ej) 
    // en (let token) reutilizamos el token que ya se guardo con el nombre "access_token"(clave) en el LocalStorage cuando hicimos el Login
    let token = localStorage.getItem("access_token") 
    const interceptor = axios.create({
        baseURL: urlServidor,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        timeout: 30000
    });

    // try catch: captura erroes(401[no autenticado], 403[no autorizado])
    interceptor.interceptors.response.use(
        (response) =>  {
            return response;
        },
        (error) => {
            if(error.response.status === 401){
                localStorage.removeItem("access_token");
                window.location.href = "/login"
            }
        }
    )
    return interceptor;
}

