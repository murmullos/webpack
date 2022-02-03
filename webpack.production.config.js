const path = require('path');
const glob = require('glob');

// PLUGINS
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DynamicWebpackPlugin = require('dynamic-html-webpack-plugin');

module.exports = () => {

    let indexList = glob.sync('./src/*.js').reduce((obj, el) => { 
    obj[path.parse(el).name] = el 
    return obj}, {});
    let plugins = [
        new MiniCssExtractPlugin({   // Separa el css en archivo a parte
            filename: '[name].[contenthash].css'   // Archivo de salida en el bundle
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*'       // Por defecto la carpeta output.path
                // path.join(process.cwd(), 'build/**/*')   // Carpetas a parte de la principal
            ]
        }),
    ]; 
    (() =>{for (const prop in indexList) { 
            plugins.push(new HtmlWebpackPlugin({       // Genera html dinámico
                title: prop,
                filename: `${prop}.html`,
                chunks: [prop],
                template: './src/page-template.hbs',
                description: `Descripción de la web ${prop}`,
                meta : {
                    viewport: 'width=device-width, initial-scale=1'
                },
                minify: false
                })
            )
        }})()

    return {
        entry: indexList,
        output: {                                           // Configuración bundle de salida
            filename: '[name].[contenthash].js',            // Nombre del archivo
            path: path.resolve(__dirname, './dist'),        // Ruta de salida de la compilación (Debe ser absoluta, utilizamos path.resolve())
            publicPath: ''                                  // Indicamos ruta dinámica del server/cdn  https://server-name.com/
        },
        mode: 'production',                                // Modo de compilación "develop" || "production"
        optimization: {
            splitChunks: {
                chunks: 'all'                              // Por defecto todas las dependencias comunes
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

