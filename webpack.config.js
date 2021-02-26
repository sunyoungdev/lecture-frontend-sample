const path = require('path');
// const MyWebpackPlugin = require('./my-webpack-plugin');
const webpack = require('webpack');
const childProcess = require('child_process');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/app.js'
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js'
    },
    // loader
    module: {
        rules: [
            {
                // test : loader 가 처리해야할 파일들의 패턴(js 확장자를 가진 모든 파일은 로더로 돌림)
                test: /\.css$/,
                // use : 사용할 로더를 명시
                use: [
                    //path.resolve('./my-webpack-loader.js')
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    // 파일로더가 처리하는 파일을 모듈로 사용했을때 경로 앞에 추가되는 문자열
                    publicPath: './dist',
                    name: '[name].[ext]?[hash]',
                    // 파일 용량 설정가능, 20kb 미만의 파일은 url-loader(base64로 인코딩) 실행, 이상은 file-loader(파일 복사) 실행
                    limit: 20000,    // 20kb
                }
            }
        ]
    },
    // plugin
    plugins: [
        // new MyWebpackPlugin(),
        new webpack.BannerPlugin({
            banner: `
                Build Date: ${new Date().toLocaleString()}
            `
            // Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
            // Author: ${childProcess.execSync('git config user.name')}
        })
    ]
}