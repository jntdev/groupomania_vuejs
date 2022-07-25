const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    module: {
        rules: [
            // ... other rules
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            // you can also read from a file, e.g. `variables.scss`
                            // use `prependData` here if sass-loader version = 8, or
                            // `data` if sass-loader version < 8
                            additionalData: `$color: red;`
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        // make sure to include the plugin!
        new VueLoaderPlugin()
    ]
}