const path = require('path');

// PLUGINS
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry : './src/index.js',                            // Archivo de entrada para iniciar la compilación
    output: {                                            // Configuración bundle de salida
        filename: 'bundle.[contenthash].js',                           // Nombre del archivo
        path: path.resolve(__dirname, './dist'),         // Ruta de salida de la compilación (Debe ser absoluta, utilizamos path.resolve())
        publicPath: ''                                  // Indicamos ruta dinámica del server/cdn  https://server-name.com/
    },
    mode: 'none',                                        // Modo de compilación "develop" || "production"

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
        new TerserPlugin(),           // Minificado

        new MiniCssExtractPlugin({   // Separa el css en archivo a parte
            filename: 'styles.[contenthash].css'   // Archivo de salida en el bundle
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*'       // Por defecto la carpeta output.path
                // path.join(process.cwd(), 'build/**/*')   // Carpetas a parte de la principal
            ]
        }),

        new HtmlWebpackPlugin({       // Genera html dinámico
            title : 'Pruebas Webpack',
            filename: 'admin.html',
            template: './src/index.hbs',
            description: 'Descripción de la web',
            viewPort: 'width=device-width, initial-scale=1'
        }),
    ]
}
