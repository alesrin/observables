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

  datos!: any[]

  

  //PASO 3 Inyectar el servicio HttpClient en el constructor
  constructor(private http: HttpClient){} //Abajo se explican los modificadores de acceso private, public y protected

/* La sintaxis constructor(private http: HttpClient) {}  es una forma abreviada de declarar e inicializar una propiedad http dentro del constructor de una clase.

En TypeScript, puedes declarar y asignar propiedades directamente en el constructor utilizando los modificadores de acceso (como private, public, protected) y el nombre del parámetro.


En el ejemplo dado, private http: HttpClient declara una propiedad http de tipo HttpClient y la inicializa con el valor proporcionado en el constructor. El modificador private indica que la propiedad es privada y solo es accesible dentro de la clase. */



ngOnInit(){
  this.cargarDatos(); // Llamamos a la función cargarDatos en el inicializador

  //EJEMPLOS DE USO DE PARÁMETROS EN TS
  function saludar(nombre: string = "AngularLovers", apellido?: string) {
    if (apellido){
      console.log("Hola, " + nombre + apellido + "!");
    } else {
      console.log("Hola, " + nombre + "!");
    }
    
  }
  saludar() // Devuelve: Hola, AngularLovers!
  saludar("Paquita") // Devuelve: Hola, Paquita!
  saludar("Pepa ", "Martínez") // Devuelve: Hola, Pepa Martínez!

  function saludar2(nombres : string[]){
    for (let nombre of nombres){
      console.log("Hola, ", nombre, "!");
    }
  }

  saludar2( ["María", "Claudia", "Sofía", "Marta", "Eva"] ) 
  //Devuelve:
  // Hola María
  // Hola Claudia
  // Hola Sofía
  // Hola Marta
  // Hola Eva
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
  
Un parámetro es una variable que se define en la firma de una función o método, y se utiliza para recibir valores que se pasan al llamar a esa función o método(el cosntructor també´n es un é´todo). Los parámetros se declaran dentro de los paréntesis de la función, seguidos de un nombre y un tipo:

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

/* MODIFICADORES DE ACCESO PRIVATE PUBLIC Y PROTECTED

1 ---- PRIVATE: Solo se puede acceder a las propiedades o métodos especificados desde dentro de la propia clase, no serán accesibles desde fuera de ella ni desde una subclase.

    Ejemplo: 

    class MiClase{

      private miPropiedad : string

      constructor( private http: HttpClient){

      }

      private miMetodo(){
        //Lógica del método
      }


    }

    const instancia = new MiClase{
      instancia.miPropiedad //Error porque estoy llamando a miPropiedad desde fuera de la clase en la que la he creado y tiene un acceso privado

      instancia.miMetodo() // //Error porque estoy llamando a miMetodo desde fuera de la clase en la que la he creado y tiene un acceso privado

      cargarDatos(){
        this.http.get("../../../assets/datos.json").subscribe((data: any) =>{
        this.datos = data.datos;
      })
      } // Error porque estoy llamando a la propiedad http desde fuera de la clase en la que la he creado y tiene un acceso privado
    }


2--- PUBLIC: Los miembros marcados como public son accesibles desde cualquier lugar, tanto dentro como fuera de la clase. No hay restricciones en el acceso a estos miembros. Es el modificador de acceso predeterminado si no se especifica ninguno. Ejemplo:

class MiClase {
  public miPropiedad: string;

  constructor( public nombre: string){

      } //Declaramos un parámetro que actúa como propiedad pública de la clase

  public miMetodo(): void {
    // Lógica del método
  }
}

const instancia = new MiClase();
instancia.miPropiedad; // Acceso permitido
instancia.miMetodo(); // Acceso permitido
function saludar(nombre: string) {
    console.log("Hola, " + nombre + "!");
  } //nombre será accesible y modificable desde cualquier parte del código que tenga acceso a la instancia de la clase.

3-- PROTECTED
Son accesibles dentro de la clase que los define y en las clases derivadas (subclases) de dicha clase. No se pueden acceder desde fuera de la clase ni desde otras clases no derivadas. Ejemplo:

class MiClase {
  protected miPropiedad: string;

  protected miMetodo(): void {
    // Lógica del método
  }
}

class MiSubclase extends MiClase {
  public otroMetodo(): void {
    this.miPropiedad; // Acceso permitido
    this.miMetodo(); // Acceso permitido
  }
}

const instancia = new MiClase();
instancia.miPropiedad; // Error: no se puede acceder a miPropiedad fuera de la clase o de sus subclases
instancia.miMetodo(); // Error: no se puede acceder a miMetodo fuera de la clase o de sus subclases


*/