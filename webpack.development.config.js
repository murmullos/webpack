const path = require('path');
const glob = require('glob');

// PLUGINS
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports =() => {
    let indexList = glob.sync('./src/*.js').reduce((obj, el) => {
        obj[path.parse(el).name] = el
        return obj
    }, {});
    let plugins =[
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*'       // Por defecto la carpeta output.path
                // path.join(process.cwd(), 'build/**/*')   // Carpetas a parte de la principal
            ]
        }),
    ]; 
        (() => {
        for (const prop in indexList) {
            plugins.push(new HtmlWebpackPlugin({       // Genera html dinámico
                title: prop,
                filename: `${prop}.html`,
                chunks: [prop],
                template: './src/page-template.hbs',
                description: `Descripción de la web ${prop}`,
                meta: {
                    viewport: 'width=device-width, initial-scale=1'
                },
                minify: false
            })
            )
        }
    })()
return {
    entry: {
        'hello-world': './src/hello-world.js',
        'kiwi': './src/kiwi.js'
    },                           // Archivo de entrada para iniciar la compilación
    output: {                                           // Configuración bundle de salida
        filename: '[name].bundle.js',            // Nombre del archivo
        path: path.resolve(__dirname, './dist'),        // Ruta de salida de la compilación (Debe ser absoluta, utilizamos path.resolve())
        publicPath: ''                                  // Indicamos ruta dinámica del server/cdn  https://server-name.com/
    },
    mode: 'development',                                 // Modo de compilación "develop" || "production"

    devServer: {
        port: 9000,                                     // Puerto a usar
        static: {
            directory: path.resolve(__dirname, './dist'),// Directorio al que apunta el server
        },
        devMiddleware: {                                // Indicamos la raiz del proyecto
            index: 'admin.html',
            writeToDisk: true                               // default(false) Genera el dist mientras se ejecuta
        }
    },

    module: {
        rules: [
            //////////////////////////////
            // ASSETS
            {
                test: /\.(jpg)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(svg)$/,
                type: 'asset/inline'
            },
            {
                test: /\.(png)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 5 * 1024  // Max 5 Kilobytes
                    }
                }
            },
            {
                test: /\.(txt)$/,
                type: 'asset/source'
            },

            /////////////////////////////////
            // LOADERS

            // Obviamente este loader es redundante si tenemos el de sass
            /*{
                test: /\.(css)$/,
                use: [
                    'style-loader', 'css-loader'
                ]
            },*/
            {
                test: /\.(scss)$/,
                use: [
                    'style-loader',
                    'css-loader', 'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.(hbs)$/,
                use: [
                    'handlebars-loader'
                ]
            }
        ]
    },
    plugins
}
}
