const path = require('path');

// PLUGINS
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    entry :'./src/hello-world.js',
    output: {                                           // Configuración bundle de salida
        filename: 'hello-world.[contenthash].js',            // Nombre del archivo
        path: path.resolve(__dirname, './dist'),        // Ruta de salida de la compilación (Debe ser absoluta, utilizamos path.resolve())
        publicPath: 'http://localhost:9001/'                                  // Indicamos ruta dinámica del server/cdn  https://server-name.com/
    },
    mode: 'production',                                 // Modo de compilación "develop" || "production"
    optimization: {
        splitChunks: {
            chunks: 'all'                               // Por defecto todas las dependencias comunes
        }
    },

    module: {
        rules: [
            {
                test: /\.(scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                            // 'style-loader', Comentado para usar MiniCssLoader
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
                        plugins: [ '@babel/plugin-proposal-class-properties']
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
        new MiniCssExtractPlugin({   // Separa el css en archivo a parte
            filename: 'hello-world.[contenthash].css'   // Archivo de salida en el bundle
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*'       // Por defecto la carpeta output.path
                // path.join(process.cwd(), 'build/**/*')   // Carpetas a parte de la principal
            ]
        }),

        new HtmlWebpackPlugin({       // Genera html dinámico
            title : 'hello-world',
            filename: 'hello-world.html',
            template: './src/page-template.hbs',
            description: 'Descripción de la web Hello-world',
            viewPort: 'width=device-width, initial-scale=1',
           // minify: false    Default true en production
        }),

        new ModuleFederationPlugin({
            name : 'HelloWorldApp',  // Nombre externo que tendrá la app
            filename: 'remoteEntry.js',  // Convención del nombre del archivo a compartir
            exposes: {                // Exponemos los módulos que queremos compartir de esta app
                './HelloWorldButton': './src/components/hello-world-button/hello-world-button.js',
                './HelloWorldPage': './src/components/hello-world-page/hello-world-page.js'
            }
        })
    ]
}
