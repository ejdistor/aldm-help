const path = require('path');
const fs = require('fs');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const  HtmlWebpackPlugin = require ('html-webpack-plugin');
const buildDateTime = new Date().toISOString();

module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    mode: 'development',
    devtool: 'eval-source-map',
    output: {
        filename: 'bundle-[name].js',
        path: path.resolve(__dirname, 'public', 'scripts'),
        publicPath: 'scripts/',
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 2 },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    browsers: ['last 1 version', 'ie >= 11'],
                                }),
                            ],
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [path.resolve(__dirname, './', './node_modules')],
                        },
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                }]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
                include: /flexboxgrid/
              }
        ]
    },
    plugins: [
        new ReactLoadablePlugin({
            filename: './dist/react-loadable.json',
        }),
        new HtmlWebpackPlugin({
            hash: true,
            template: path.resolve(__dirname, 'src', 'index-template.ejs'),
            filename: path.resolve(__dirname, 'public', 'index.html'),
            inject: true,
            title: 'Business Resiliency Client Connect Framework Help System',
            buildDate:  buildDateTime
        })
    ],
    devServer: {
        before(app){
            // defined CORS before all route definitions
            var cors = require("cors");
            app.use(cors({origin: 'https://localhost:9999'}));
            
            // configure routes
            var config = require("./api/config");
            var sso = require('./api/sso')(config, app);   
            app.use('/sso',  sso);   
        },
        contentBase: [path.join(__dirname, 'public'),path.join(__dirname, 'src')],
        historyApiFallback: true,
        compress: true,
        proxy: {
            "sso/*": "https://localhost:9443/",
            "service/*": "https://localhost:9443/",
            "user/*": "https://localhost:9443/",
        },
        https: {
            key: fs.readFileSync('key.pem'),
            cert: fs.readFileSync('cert.pem'),
            spdy: {
                protocols: ['http/1.1']
            }
        },
        port: 9998,
    },
};
