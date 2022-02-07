const path = require('path');

// PLUGINS
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;


module.exports = {
    entry :'./src/dashboard.js',
    output: {                                           // Configuración bundle de salida
        filename: 'dashboard.bundle.js',            // Nombre del archivo
        path: path.resolve(__dirname, './dist'),        // Ruta de salida de la compilación (Debe ser absoluta, utilizamos path.resolve())
        publicPath: 'http://localhost:9000/'                                  // Indicamos ruta dinámica del server/cdn  https://server-name.com/
    },
    mode:'development',                                 // Modo de compilación "develop" || "production"

    devServer: {
        port: 9001,                                     // Puerto a usar
        static: {
            directory:path.resolve(__dirname, './dist'),// Directorio al que apunta el server
        },
        devMiddleware: {                                // Indicamos la raiz del proyecto
            index: 'dashboard.html',
            writeToDisk: true,                               // default(false) Genera el dist mientras se ejecuta
        },
        historyApiFallback: {
            index: 'dashboard.html'
        }
    },

    module: {
        rules: [
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
                test: /\.(scss)$/,
                use: [
                     'style-loader', 'css-loader', 'sass-loader'
                ]
            },
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
            title : 'Dashboard',
            filename: 'dashboard.html',
            minify: false
        }),
        new ModuleFederationPlugin({
            name : 'DashboardApp',  // Nombre externo que tendrá la app
            remotes: {                // Exponemos los módulos que queremos compartir de esta app
                'HelloWorldApp': 'HelloWorldApp@http://localhost:9001/remoteEntry.js',
                'KiwiApp': 'KiwiApp@http://localhost:9002/remoteEntry.js',
            }
        })
    ]
}
