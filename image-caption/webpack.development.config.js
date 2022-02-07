const path = require('path');

// PLUGINS
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;


module.exports = {
    entry :'./src/image-caption.js',
    output: {                                           // Configuración bundle de salida
        filename: '[name].bundle.js',            // Nombre del archivo
        path: path.resolve(__dirname, './dist'),        // Ruta de salida de la compilación (Debe ser absoluta, utilizamos path.resolve())
        publicPath: 'http://localhost:9003/'                                  // Indicamos ruta dinámica del server/cdn  https://server-name.com/
    },
    mode:'development',                                 // Modo de compilación "develop" || "production"

    devServer: {
        port: 9003,                                     // Puerto a usar
        static: {
            directory:path.resolve(__dirname, './dist'),// Directorio al que apunta el server
        },
        devMiddleware: {                                // Indicamos la raiz del proyecto
            index: '[name].html',
            writeToDisk: true                               // default(false) Genera el dist mientras se ejecuta
        }
    },

    module: {
        rules: [
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
                        presets: ['@babel/env']
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
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*'       // Por defecto la carpeta output.path
                // path.join(process.cwd(), 'build/**/*')   // Carpetas a parte de la principal
            ]
        }),

        new HtmlWebpackPlugin({       // Genera html dinámico
            title : 'image-caption',
            filename: '[image-caption.html',
            template: './src/page-template.hbs',
            description: 'Descripción de la web Image-caption',
            viewPort: 'width=device-width, initial-scale=1',
            // minify: false    Default true en production
        }),
        new ModuleFederationPlugin({
            name : 'ImageCaptionApp',  // Nombre externo que tendrá la app
            filename: 'remoteEntry.js',  // Convención del nombre del archivo a compartir
            exposes: {                // Exponemos los módulos que queremos compartir de esta app
                './ImageCaption': './src/components/image-caption/image-caption.js',
            }
        })
    ]
}
