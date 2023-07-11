import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//PASO 2 Importamos el servicio HttpClient
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'observables';

  //PASO 6 Inicializamos (y tipamos) la variable de los datos a los que nos vamos a subscribir

  datos!: any

  //PASO 3 Inyectar el servicio HttpClient en el constructor
  constructor(private http: HttpClient){}

ngOnInit(){
  this.cargarDatos(); // Llamamos a la función cargarDatos en el inicializador

}

//PASO 4 Crear la función del observable e inicialízala en el método ngOnInit(){}

cargarDatos() {
  this.http.get<any>('../../assets/datos.json').subscribe(
    data => {
      this.datos = data.datos;
    })
}

/* otroCargarDatos(){
  this.http.get("../../../assets/datos.json").subscribe((data: any) =>{
    this.datos = data.datos;
  })
} */

/* ESTRUCTURA OBSERVABLES CON SERVICIOS HTTP

Servicio + método + fuente de datos + subscripción

utilizamos this.http.get() para realizar una solicitud HTTP GET al archivo JSON. Luego, nos suscribimos al resultado de la solicitud y asignamos los datos al array this.datos de este componente. 

OPERADOR => 
  función de flecha (arrow function) en JavaScript y TypeScript, se utiliza para crear funciones de manera más concisa y clara
  (parametros) => { 
  // cuerpo de la función
}
  
Un parámetro es una variable que se define en la firma de una función o método, y se utiliza para recibir valores que se pasan al llamar a esa función o método. Los parámetros se declaran dentro de los paréntesis de la función, seguidos de un nombre y un tipo:

  function saludar(nombre: string) {
    console.log("Hola, " + nombre + "!");
  }
  
  saludar("Juan");

  Podemos indicar que un parámetro es opcional:

  function saludar(nombre: string, apellido?: string) {
  if (apellido) {
    console.log("Hola, " + nombre + " " + apellido + "!");
  } else {
    console.log("Hola, " + nombre + "!");
  }
}

saludar("Juan"); // Llama a la función con un solo argumento
saludar("Juan", "Pérez"); // Llama a la función con dos argumentos
En este caso, el parámetro apellido se declara como opcional agregando el símbolo de interrogación ? después de su nombre. Esto significa que podemos llamar a la función tanto con un solo argumento como con dos argumentos. 

  */
}

/* OBSERVABLES

Es una fuente de datos. Para utilizar los observables en Angular usamos objetos que importamos de un paquete de terceros llamado RxJS. 

npm install --save rxjs@6
npm install --save rxjs-compat

Con los servicios HTTP de Angular conectamos a la solicitud de HTTP, de forma que cuando hay respuesta, se emite como un paquete de datos. Se utiliza para manejar tareas asíncronas, que no sabemos cuándo se lanzan, o cuanto tiempo tardarán en ejecutarse

https://angular.io/guide/observables-in-angular

HTTPCLIENT

El servicio HttpClient es una clase proporcionada por Angular que se utiliza para realizar solicitudes HTTP, como solicitudes GET, POST, PUT, DELETE, etc., a servidores remotos o archivos locales. Permite interactuar con APIs RESTful y recuperar datos de manera asíncrona.

*/