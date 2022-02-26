const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { LoaderOptionsPlugin } = require('webpack');

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;
console.log(`IsDev = ${isDev}`);

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all",
        },
    };
    if (isProd) {
        config.minimizer = [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin(),
        ];
    }
    return config;
};

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",

    entry: {
        main: ["@babel/polyfill", "./js/index.js"],
    },
    output: {
        filename: filename("js"),
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html", //add content here from source
            minify: {
                collapseWhitespace: isProd,
            },
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: filename("css"),
        }),
    ],

    module: {
        rules: [{
                test: /\.(sa|sc|c)ss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                    },

                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }

        ]
    },
    optimization: optimization(),

    devtool: isDev ? "source-map" : false,
    resolve: {
        extensions: [".js", ".json", ".png"],
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
}