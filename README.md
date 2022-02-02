## webpack chuleta
Webpack : Se encarga de generar un bundle con toda nuestra aplicación
####  Pasos a seguir
#####  1. Generar package.json
	npm init --y // Genera un archivo con las opciones por defecto.
##### 2.Instalar webpack
	npm install webpack webpack-cli --save-dev
La opción "--save-dev" refleja la dev-dependency en el package.json
# 
***Para enlazar los archivos entre si, primero hay que exportarlos como
modulo y despues importarlo en el fichero padre o el que lo vaya a usar.***
***Ejemplo:*** 

En "hello-world.js" 

	export default helloWorld

En "index.js"
		
	import helloWorld from "./hello-world.js"
# 
#### Commandos webpack
	npx webpack  // Ejecuta webpack por defecto (Si no hay configuración)
	npx webpack --stats detailer // Saca por consola detalles de la compilación
#
#### Webpack Configuration
webpack.config.js es un módulo js que contiene las propiedades a
configurar dentro de webpack
# 
  
## Nociones a destacar
### Assets :
Utilizamos los assets para incluir otros archivos al bundle principal.    
Se deben generar una serie de reglas para que webpack entienda los archivos que
puede/debe incluir  

#### Estructura asset :

	module {
		rules: [
			{
				test: /\.(png|jpg)$/, // Extensión a tratar con webpack
				type: asset/resource  // Tipo de fichero en salida
			}
		]
	}

  ### Tipos de assets :
**asset/resource** : Incluye el archivo independiente en el bundle como hash MD4.

**asset/inline** : Incluye el archivo compilado en base64 dentro del bundle.js.

**asset** : En función del tamaño del archivo lo trata como resource o inline.

***Para este caso incluimos un objeto js indicando el max que diferencia resource/inline***

**Ejemplo**

	 {
		test: /\.(svg)$/,
		type: 'asset/inline',
		parser: {
			dataUrlCondition: {
				maxSize: 3 * 1024 // Max 3 Kilobytes
			}
		}
	}

**asset/source** : Parecido a inline. Incluye el archivo como string dentro del bundle pero sin base64

***Si utilizamos inline para archivos grandes, estamos engordando el bundle.js innecesariamente.
Si utilizamos resource para muchos archivos incrementamos las llamadas para traerlos.  
Hay que buscar el equilibrio entre estas dos opciones o usar "asset"***
# 

### LOADERS
Librerias js que nos permiten incluir diferentes tipos de archivos dentro del bundle.  
Los assets no dejan de ser loaders que vienen por defecto en webpack.  
Para los demás loaders hay que instalar las dependencias vía npm.  
Misma estructura que asset solo que en vez del type ponemos "use" (array de dependencias).  

**Ejemplo :**

	module: {
		rules: [
			{
				test: /\.(css)$/, // Formato al que le afecta
				use: [
					'style-loader', 'css-loader' // Se carga de derecha a izquierda
				]
			}
		]
	}
#
#### Listado de loaders:

  **sass-loader** : Convierte el sass a css

	npm install sass-loader sass --save-dev

**css-loader** : Convierte el css en una representación de JavaScript

	npm install css-loader --save-dev

  **style-loader**: Incluye los css detectados en el bundle.js
  
	npm install style-loader --save-dev

**babel-loader**: Para que nuestro js se pueda leer en todos los navegadores sin importar la V ecmascript.

	npm install @babel/core babel-loader @babel/preset-env --save-dev
	npm install @babel/plugin-proposal-class-properties --save-dev

  **Ejemplo babel :**

	{
	test: /\.js$/,
	exclude: /node_modules/, // Exclusión de carpetas
	use: {
		loader: 'babel-loader',
		options: {
			presets: ['@babel/env'], // Convierte de cualquier ecmascript al 5
			plugins: ['@babel/plugin-proposal-class-properties'] 
			//Este último permite propiedades dentro de la class
		}
	}
# 
  
  ### PLUGINS

Son librerias JavaScript que le dan funcionalidades nuevas a webpack.  
Podemos entender  extensiones que los loaders no entiende.  
También modificar el propio bundle en su compilación (Ejemplo : minificar)  

***IMPORTANTE : La mayoría de plugins son una instancia de una librería por lo que deben importarse con require('name')***

Deben estar en el array plugins dentro del modulo de webpack plugins: [...new plugin]

**Plugins usados :**

**1. TerserPlugin** // Minifica la compilación del bundle

	const TerserPlugin = require('terser-webpack-plugin'); // Import
	
	new TerserPlugin(); // Array de plugins
	
	// NPM
	npm i terser-webpack-plugin --save-dev // no-need webpack 5

**Este plugin ha superado en cuanto rendimiento a sus competidores : Uglify & babel-minify**
https://blog.logrocket.com/terser-vs-uglify-vs-babel-minify-comparing-javascript-minifiers/

**2. MiniCssExtractPlugin**  // Extrae el css a un fichero fuera del bundle 

	const MiniCssExtractPlugin = require('mini-css-extract-plugin') // Import
	
	new MiniCssExtractPlugin({  // Array de plugins
		filename: 'styles.css'   // Output en el bundle
	})
	
	// NPM
	npm i miniCssExtractPlugin --save-dev

***IMPORTANTE: Como ya vimos en los loaders, usamos "style-loader" para incluir los estilos dentro del bundle. Para este caso lo sustituimos por el plugin:***

	rules: [
			{
				test: /\.(scss)$/, // Formato al que le afecta
				use: [
					/* comentamos esta linea 'style-loader',*/
					MiniCssExtractPlugin.loader, // Esta la añadimos
					'css-loader', 'sass-loader' // Se carga de derecha a izquierda
				]
			}
		]


**3. Browser Cache**
Los navegadores poseen una cache donde alojan el contenido de la web que no ha cambiado.
Podemos controlar esto añadiendo [contenthash] al nombre de los ficheros bundle de salida.

¿Qué conseguimos con esto?
Cada vez hagamos un cambio en el código. El bundle vendrá con un [contenthash] nuevo. 
Esto le permite al navegador saber qué ficheros han cambiado y tener que pedir solo la carga de estos

Lo que conseguimos es que la web no tenga tiempos de carga muy elevados y solo se ciña a los cambios.

***Esto no es un plugin como tal. Se incluye en los filename del bundle. Tanto en el js como en los css*** 

Sustituimos esto : 

	filename: 'bundle.js',
Por esto

	filename: 'bundle.[contenthash].js
	// Salida
	bundle.bcc372466248a0cf8b5c.js
	
**4. CleanWebpackPlugin** 
Elimina el contendio de la carpeta indicada en el "output.path" y todas aquellas que se le indiquen.
Plugin básico : 

	const { CleanWebpackPlugin } = require('clean-webpack-plugin') // Import
	
	new CleanWebpackPlugin()  // Elimina los contenidos de la carpeta output.path
	
	// NPM
	npm i clean-webpack-plugin --save-dev

Plugin para otras carpetas :
	
	new CleanWebpackPlugin({  
	    cleanOnceBeforeBuildPatterns: [  
	        '**/*', // Borra la carpeta output.path (default) 
		    path.join(process.cwd(), 'build/**/*')   // Carpetas a parte de la principal  
		  ]  
	})

**5. HtmlWebpackPlugin**
Genera dinámicamente un html dentro del bundle
Forma básica : 
	
	const HtmlWebpackPlugin = require('html-webpack-plugin'); // Import
	
	new HtmlWebpackPlugin()  // Plugin
	
	// NPM
	npm i html-webpack-plugin --save-dev

***Para este caso debemos modificar el "publicPath" del output a vacío puesto que la carga se realiza desde el mismo dist***

Forma customizada :

Este plugin acepta diferentes propiedades para personalizar el html generado.
Podemos ver en la documentación las propiedades aceptadas :
https://www.npmjs.com/package/html-webpack-plugin
Ejemplo : 

	plugins: [
		new HtmlWebpackPlugin({
		      title: 'My App',  // Titulo de la app
		      filename: 'assets/admin.html'  // Nombre del archivo y ruta
		      meta : {         // Info para las tags meta
			      description: 'datos de meta'
		      }
	    })
	  ]

- **Plantillas html** 
	Podemos crear un template personalizado y utilizarlo para crear dinámicamente el html.
	En este caso vamos a usar Handlebars
	Pasos : 
	1. Creamos un archivo "index.hbs" que contendrá la plantilla html que queremos
	2. Incluimos en el HtmlWebpackPlugin las variables que vamos a utilizar y la propiedad template que hará referencia al archivo plantilla.
		Ejemplo : 
		
			new HtmlWebpackPlugin({       // Genera html dinámico  
				  title : 'Pruebas Webpack',  
				  filename: 'admin.html',  
				  template: './src/index.hbs',  
				  description: 'Descripción de la web',  
				  tipoValor: 'Control de valores'  
			}),
	3. Referenciamos las variables nuevas dentro de la plantilla usando "htmlWebpackPlugin.options.propiedad"
		Ejemplo : 
		
			<!DOCTYPE html>  
			<html>  
				<head>  
					 <meta charset="utf-8">  
					 <title>{{htmlWebpackPlugin.options.title}}</title>  
					 <meta name="description" content="{{htmlWebpackPlugin.options.description}}">  
					 <meta name="viewport" content="{{htmlWebpackPlugin.options.viewPort}}">
				 <head>  
				<body>  
				</body>  
			</html>

	4. Incluimos el loader de handlebars para que webpack interprete el formato

			{  
		    test: /\.(hbs)$/,  
		    use: [  
		        'handlebars-loader'  
			  ]  
			}
			
			//NPM
			npm i handlebars-loader --save-dev 
Con esto ya generamos un html dinámico con las propiedades que nosotros queramos incluir en el archivo.
#
			

