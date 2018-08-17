const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcPath = path.resolve(__dirname);
const distPath = path.resolve(__dirname, 'dist');

let postPlugins = [
    // require('postcss-cssnext')(),
    require('autoprefixer')({ browsers: ['last 2 version', 'Safari 5', 'Firefox 14', 'IE >= 9', 'iOS 7'] }),
    // require('cssnano')()
]
let config = {
    entry: {
        app: `${srcPath}/index.jsx`
    },
    output: {
        path: distPath,
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.(jsx)$/i,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        }, {
            test: /\.(scss)$/i,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                { loader: 'postcss-loader', options: {
                    plugins: () => postPlugins
                }},
                'sass-loader'
            ]
        }, {
            test: /\.(pug|jade)$/i,
            use: 'pug-loader'
        }, {
            test: /\.(jp?g|png|gif|svg)$/i,
            use: {
                loader: 'file-loader',
                options: {
                    outputPath: `image`,
                    name: '[name].[ext]'
                }
            }
        }]
    },
    plugins: [
        new CleanWebpackPlugin(distPath),
        new HtmlWebpackPlugin({
            template: `${srcPath}/src/template/index.pug`,
            filename: 'index.html'
        }),
        // new HtmlWebpackPugPlugin(),
        new MiniCssExtractPlugin({
            path: distPath,
            filename: '[name].css'
        }),
    ],
    devServer: {
        contentBase: distPath,
        host: '0.0.0.0',
        port: 10010, // 默认8080
        inline: true, // 可以监控js变化
        hot: false,
        // disableHostCheck: true,
    }
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.devtool = 'inline-source-map';
        config.watch = true;
    }

    if (argv.mode === 'production') {
        postPlugins.push(require('cssnano')());
    }

    return config;
};