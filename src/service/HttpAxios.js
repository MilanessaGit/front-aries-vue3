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
    // ?en (let token) con login la 1ra vz es vacio, cuando utilizamos para getPerfil() let token, ya tiene la informacion(data.access_token)
    let token = localStorage.getItem("access_token") //Obtenemos el token q se guardo en LocalStorage("access_token")
    const interceptor = axios.create({
        baseURL: urlServidor,
        headers: { // (Configuramos el formato de la solicitud)
            'Accept': 'application/json', // Acepto q me envien json
            'Authorization': 'Bearer ' + token // Si esta en LocalStorage se almacena en token
        },
        timeout: 30000
    });

    // try catch: captura erroes(401[no autenticado], 403[no autorizado])
    interceptor.interceptors.response.use(
        (response) =>  { // Si response es verdadero o sea correcto si que el flujo
            return response;
        },
        (error) => { // Y si encuentra que error tiene datos y es 401 entonces..
            if(error.response.status === 401){
                localStorage.removeItem("access_token");
                window.location.href = "/login"
            }
            return Promise.reject(error); // retornar en caso de encontrar otros tipos de errores !=401
        }
    )
    return interceptor;
}

