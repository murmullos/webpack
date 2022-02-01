const path = require('path');

module.exports = {
    entry : './src/index.js',                            // Archivo de entrada para iniciar la compilación
    output: {                                            // Configuración bundle de salida
        filename: 'bundle.js',                           // Nombre del archivo
        path: path.resolve(__dirname, './dist'),         // Ruta de salida de la compilación (Debe ser absoluta, utilizamos path.resolve())
        publicPath: 'dist/'                              // Indicamos ruta dinámica del server/cdn  https://server-name.com/
    },
    mode: 'none',                                        // Modo de compilación "develop" || "production"

    // ASSETS
    module: {
        rules: [
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
            }
        ]
    }
}
