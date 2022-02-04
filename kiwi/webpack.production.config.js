const path = require('path');

// PLUGINS
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;


module.exports = {
    entry : './src/kiwi.js',
    output: {                                           // Configuración bundle de salida
        filename: 'kiwi.[contenthash].js',            // Nombre del archivo
        path: path.resolve(__dirname, './dist'),        // Ruta de salida de la compilación (Debe ser absoluta, utilizamos path.resolve())
        publicPath: 'http://localhost:9002/'                                  // Indicamos ruta dinámica del server/cdn  https://server-name.com/
    },
    mode: 'production',                                 // Modo de compilación "develop" || "production"
    optimization: {
        splitChunks: {
            chunks: 'all'                               // Por defecto todas las dependencias comunes
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
        new MiniCssExtractPlugin({   // Separa el css en archivo a parte
            filename: 'kiwi.[contenthash].css'   // Archivo de salida en el bundle
        }),
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
          //  minify: false
        }),
        new ModuleFederationPlugin({
            name : 'KiwiApp',  // Nombre externo que tendrá la app
            remotes: {                // Exponemos los módulos que queremos compartir de esta app
                'HelloWorldApp': 'HelloWorldApp@http://localhost:9001/remoteEntry.js'
            }
        })
    ]
}
