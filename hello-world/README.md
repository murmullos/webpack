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
Esto le permite al navegador saber qué ficheros han cambiado y tener que pedir solo la carga de estos.  

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
	En este caso vamos a usar Handlebars.  
	Pasos :   
	1. Creamos un archivo "index.hbs" que contendrá la plantilla html que queremos  
	2. Incluimos en el HtmlWebpackPlugin las variables que vamos a utilizar y la propiedad   template que hará referencia al archivo plantilla.  
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

### Webpack Mode
Existen tres modos posibles "none", "development", "production"  
La diferencia reside en si permites a webpack meter opciones de optimización o no.  

**none** : No incluye ningún tipo de optimización

**development**: Incluye algunas optimizaciones y cambia el valor de *process.env.NODE_ENV* a "development"  

**production** : Incluye optimizaciones propias de producción y cambia el valor de *process.env.NODE_ENV* a "production"  
Dentro de las optimizaciones de este caso se encuentran `FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`, y `ModuleConcatenationPlugin` `NoEmitOnErrorsPlugin` `TerserPlugin` por defecto.  

**Formas de cambiar de modo**
1. Incluyendo en el script de npm la opción " --mode" con el valor escogido. 
		
			"scripts" : {
				"dev": "webpack --mode=development",
				"build": "webpack --mode=production",
			}

2. Creando archivos "webpack.[mode].config.js" independientes que invocamos con los scripts en función de lo que necesitemos  

			"scripts" : { 
				"dev": "webpack --config webpack.development.config.js", 
				"build": "webpack --config webpack.production.config.js", 
				}
	Diferencias en el archivo de configuración a resaltar entre los dos modos:
	1. Cambiar el "mode" para que cada archivo tenga el correcto.  
	2. Eliminiar el TerserPlugin (En dev no lo usamos y en prod viene default).  
	3. No necesitamos el [contenthash] en modo dev. Lo quitamos.  
	4. No necesitamos separar los archivos css para dev. Volvemos a incluir "style-loader" y quitamos el MiniCssExtractPlugin.

**Server Webpack**
Para el modo dev podemos levantar un server para la ejecución de nuestra aplicación y configurarlo para que refresque el navegador cada vez que se produce un cambio.  
Pasos: 

1. Instalar "webpack-server".  
	
		npm i webpack-dev-server --save-dev
2. Incluir la configuración del server en el webpack.development.config.js en el primer nivel.  

		devServer: {  
			port: 9000, 		// Puerto a usar  
			static: {  			// Directorio de acceso
				directory:path.resolve(__dirname, './dist'),
			},  
			devMiddleware: {   // Root de acceso                         
				index: 'admin.html' ,
				writeToDisk: true  // Forzar crear dist en modo serve 
			}
		},
3. Creamos script npm. La opción 'serve' inicia el servidor.  " --hot" activa el modo escucha.

		"scripts": {
			"dev:server": "webpack serve --config webpack.development.config.js --hot",  
		}
  #

### MPA's
Webpack también permite la creación de bundles separados para multiple page applications.  
Configuración bundle :   
1. La propiedad entry podemos tratarla como un objeto [name]/[valor] indicando los distintos ficheros de entrada: 
		
		"entry" :  {
			'hello-world: "./src/hello-world.js",
			'kiwi': './src/kiwi.js'
		}

También podemos utilizar una función que retorne ese objeto. (Este código sería lo equivalente a importar todos los archivos con sufijo page.js)

	entry: 
		glob.sync('./src/pages/**/*.page.js').reduce(function(obj, el){  
		    obj[path.parse(el).name] = el;  
			return obj
		},{})

2. Indicar en output.filename el nombre del bundle a crear. Como ya se ha comentado, webpack acepta un objeto [nombre]/[valor] para el entry. Esto no es fortuito. Puedes reutilizar dinámicamente el nombre de la entrada en otras partes del código. Por ejemplo el output, css etc. 
	
		output: {                                    
		  filename: '[name].[contenthash].js',
		  ...
3. Generar html para cada page
			
		new HtmlWebpackPlugin({       // Genera html dinámico  
			title : 'Pruebas Webpack' ,  
			filename: '[name].html',  
			chunks: ['hello-world'],       // Array de bundles a cargar (solo 1)
			template: './src/page-template.hbs',  
			description: 'Descripción de la web',  
			viewPort: 'width=device-width, initial-scale=1',  
			minify: false   // Minificamos o no el html  
		}),

	Si lo que queremos es asociar un bundle en específico a cada html utilizamos la propiedad chunk dentro del HtmlWebPackPlugin

4. Dependencias comunes entre bundles:
	Una librería común como puede ser "lodash" se puede compilar en un bundle independiente que será cargado por las páginas si y solo si lo necesitan. Con esto conseguimos que los bundle no tenga código duplicado y aligeramos el tamaño de los mismos.  
	Para optimizar estas dependencias, incluimos este objeto dentro de la configuración a continuación del "mode" de la aplicación.  
	
		optimization: {  
		    splitChunks: {  
	        chunks: 'all' // Por defecto todas las dependencias comunes  
		  }  
		},

***En el ejemplo de git, Webpack separa esa librería en otro bundle y la incluye como script solo en el kiwi.html que es el que lo va a utilizar. Hello-world carece de esa librería porque no la necesita***
Por defecto esta optimización se realiza para toda aquella dependencia común que supere los 30Kbs de tamaño (Por eso funciona con lodash). Por ejemplo si importasemos React no funcionaría porque pesa mucho menos. Podemos cambiar esta configuración añadiendo minSize

		optimization: {  
		    splitChunks: {  
	        chunks: 'all', // Por defecto todas las dependencias comunes 
	        minSize: 3000
		  }  
		},

Los valores aceptados son 3:  
`all` : Optimiza modulos estáticos y dinámicos.    
`async`: Optimiza solo los dinámicos. (Los que se cargan en funcion se necesiten).   
 `initial`: Optimiza solos los estáticos. (Los que se cargan desde el inicio del app).  
#


			
			
		
		 
		  
	


	  

			

