# webpack
webpack-pruebas

Webpack : Se encarga de generar un bundle con toda nuestra aplicación

# ###########################################################################
# Generar package.json                                                      #                               
# npm init --yes # This will trigger automatically populated initialization.
# --yes o -y Genera un archivo con las opciones por defecto. 

# Instalar webpack
# npm install webpack webpack-cli --save-dev
# Commando --save-dev # Refleja la dev-dependency en el package.json
# ###########################################################################

# #########################################################################
# Para enlazar los archivos entre si, primero hay que exportarlos como
# modulo y despues importarlo en el fichero padre o el que lo vaya a usar.
# En "hello-world.js"  export default helloWorld
# En "index.js" import helloWorld from "./hello-world.js"
# #########################################################################

# #########################################################################
# Commandos webpack
# npx webpack Ejecuta webpack por defecto (Si no hay configuración)
# npx webpack --stats detailer Saca por consola detalles de la compilación
# #########################################################################

# ########################################################################
# Webpack Configuration
# webpack.config.js es un módulo js que contiene las propiedades a 
# configurar dentro de webpack
#
#
# Assets : Utilizamos los assets para incluir otros archivos al bundle principal
# Se deben generar una serie de reglas para que webpack entienda los archivos que 
# puede/debe incluir 
#
# Estructura asset :
#       module {
#            rules: [
#                {
#                  test: /\.(png|jpg)$/,  extensión a tratar con webpack
#                  type: asset/resource  tipo de fichero en salida
#                }
#            ]
#        }
#
# Tipos de assets :
#
#       asset/resource : Incluye el archivo independiente en el bundle como hash MD4
#
#       asset/inline : Incluye el archivo compilado en base64 dentro del bundle.js
#
#       asset : En función del tamaño del archivo lo trata como resource o inline
#           Para este caso incluimos un objeto js indicando el max que diferencia resource/inline
#              {
#                test: /\.(svg)$/,
#                type: 'asset/inline',
#                parser: {
#                    dataUrlCondition: {
#                        maxSize: 3 * 1024  // Max 3 Kilobytes
#                    }
#                }
#            }
#
#       asset/source :Parecido a inline incluye el archivo como string dentro del bundle
#
#  Si utilizamos inline para archivos grandes, estamos engordando el bundle.js innecesariamente
#  Si utilizamos resource para muchos archivos incrementamos las llamadas para traerlos
#  Hay que buscar el equilibrio entre estas dos opciones o usar "asset"
# #########################################################################################

# ################################################################################
# LOADERS : Librerias js que nos permiten incluir diferentes tipos de archivos dentro del bundle
# Los assets no dejan de ser loaders default de webpack
# 
# 


