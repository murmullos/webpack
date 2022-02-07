const path = require('path');

// PLUGINS
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;


module.exports = {
    entry : './src/kiwi.js',
    output: {                                           // Configuración bundle de salida
        filename: 'kiwi.bundle.js',                   // Nombre del archivo
        path: path.resolve(__dirname, './dist'),        // Ruta de salida de la compilación (Debe ser absoluta, utilizamos path.resolve())
        publicPath: 'http://localhost:9002/',
    },
    mode:'development',                                 // Modo de compilación "develop" || "production"

    devServer: {
        port: 9002,                                     // Puerto a usar
        static: {
            directory:path.resolve(__dirname, './dist'),// Directorio al que apunta el server
        },
        devMiddleware: {                                // Indicamos la raiz del proyecto
            index: 'kiwi.html',
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
            title : 'kiwi',
            filename: 'kiwi.html',
            template: './src/page-template.hbs',
            description: 'Descripción de la web kiwi',
            viewPort: 'width=device-width, initial-scale=1',
            minify: false
        }),
        new ModuleFederationPlugin({
            name : 'KiwiApp',  // Nombre externo que tendrá la app
            filename: 'remoteEntry.js',
            exposes: {                // Exponemos los módulos que queremos compartir de esta app
                './KiwiPage': './src/components/kiwi-page/kiwi-page.js'
            },
            remotes : {
                ImageCaptionApp: 'ImageCaptionApp@http://localhost:9003/remoteEntry.js'
            }
        })
    ]
}
