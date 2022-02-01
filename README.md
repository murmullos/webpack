                                ## webpack chuleta

Webpack : Se encarga de generar un bundle con toda nuestra aplicación

#### Pasos a seguir
###### 1. Generar package.json     

       *npm init --y*  // Genera un archivo con las opciones por defecto.  

###### 2.Instalar webpack

       *npm install webpack webpack-cli --save-dev*  
        La opción "--save-dev" refleja la dev-dependency en el package.json

# ##########################################################################

        Para enlazar los archivos entre si, primero hay que exportarlos como
        modulo y despues importarlo en el fichero padre o el que lo vaya a usar.
        En "hello-world.js"  export default helloWorld
        En "index.js" import helloWorld from "./hello-world.js"

# ##########################################################################

#### Commandos webpack

        *npx webpack* Ejecuta webpack por defecto (Si no hay configuración)
        *npx webpack --stats detailer* Saca por consola detalles de la compilación

# ##########################################################################

#### Webpack Configuration

        webpack.config.js es un módulo js que contiene las propiedades a 
        configurar dentro de webpack

# #######################################################################

### Assets : 
        Utilizamos los assets para incluir otros archivos al bundle principal
        Se deben generar una serie de reglas para que webpack entienda los archivos que 
        puede/debe incluir 

#### Estructura asset :
>       module {
>            rules: [
>                {
>                  test: /\.(png|jpg)$/,  extensión a tratar con webpack
>                  type: asset/resource  tipo de fichero en salida
>                }
>            ]
>        }

### Tipos de assets :

       asset/resource : Incluye el archivo independiente en el bundle como hash MD4

       asset/inline : Incluye el archivo compilado en base64 dentro del bundle.js

       asset : En función del tamaño del archivo lo trata como resource o inline
       ***Para este caso incluimos un objeto js indicando el max que diferencia resource/inline***

>              {
>                test: /\.(svg)$/,
>                type: 'asset/inline',
>                parser: {
>                    dataUrlCondition: {
>                        maxSize: 3 * 1024  // Max 3 Kilobytes
>                    }
>                }
>            }
>
       asset/source :Parecido a inline incluye el archivo como string dentro del bundle

       Si utilizamos inline para archivos grandes, estamos engordando el bundle.js innecesariamente
       Si utilizamos resource para muchos archivos incrementamos las llamadas para traerlos
       Hay que buscar el equilibrio entre estas dos opciones o usar "asset"

# #########################################################################################

### LOADERS
        Librerias js que nos permiten incluir diferentes tipos de archivos dentro del bundle
        Los assets no dejan de ser loaders que vienen por defecto en webpack

        Para los demás loaders hay que instalar las dependencias vía npm
        Misma estructura que asset solo que en vez del type ponemos "use" (array de dependencias)

> Ejemplo : 
>        module: {
>            rules: [
>                {
>                    test: /\.(css)$/,    // Formato al que le afecta
>                    use: [               
>                        'style-loader', 'css-loader'   // La carga se hace de derecha a izquierda    
>                    ]
>                }
>            ]
>        }


#### Listado de loaders:

         sass-loader : Convierte el sass a css
                    *npm install sass-loader sass --save-dev*

         css-loader : Convierte el css en una representación de JavaScript
                    *npm install css-loader --save-dev*

         style-loader: Incluye los css detectados en el bundle.js
                    *npm install style-loader --save-dev*
         
         babel-loader: Para que nuestro js se pueda leer en todos los navegadores sin importar la V ecmascript.
                    *npm install @babel/core babel-loader @babel/preset-env @babel/plugin-proposal-class-properties --save-dev*
                    

    Ejemplo babel :
>            {
>                test: /\.js$/,
>                exclude: /node_modules/,   // Exclusión de carpetas
>                use: {
>                    loader: 'babel-loader', 
>                    options: {
>                        presets: ['@babel/env'],  // Convierte de cualquier ecmascript al 5 
>                        plugins: ['@babel/plugin-proposal-class-properties'] // Permite propiedades dentro de la class
>                    }
>                }
>             }        

# ######################################################################################################################

### PLUGINS
    Son librerias JavaScript que le dan funcionalidades nuevas a webpack.
    Podemos entender extensiones que los loaders no entiende.
    También modificar el propio bundle en su compilación (Ejemplo : minificar)

    ***IMPORTANTE : La mayoría de plugins son una instancia de una librería por lo que deben importarse con require('name')***

    Deben estar en el array plugins dentro del modulo de webpack  plugins: [...new plugin]

    Plugins usados : 
         1.  *new TerserPlugin()* // Minifica la compilación del bundle
               const TerserPlugin = require('terser-webpack-plugin');
               *npm i terser-webpack-plugin --save-dev* (no-need webpack 5)
               Este plugin ha superado en cuanto rendimiento a sus competidores : Uglify & babel-minify
               https://blog.logrocket.com/terser-vs-uglify-vs-babel-minify-comparing-javascript-minifiers/

