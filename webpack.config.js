const path = require('path');
// const MyWebpackPlugin = require('./my-webpack-plugin');
const webpack = require('webpack');
const childProcess = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
                    process.env.NODE_ENV === 'production'
                    ? MiniCssExtractPlugin.loader
                    : 'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    // 파일로더가 처리하는 파일을 모듈로 사용했을때 경로 앞에 추가되는 문자열
                    // publicPath: './dist',
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

        // webpack 기본 플러그인 2가지
        // 1. 번들링 된 결과물 상단에 빌드 정보를 추가
        new webpack.BannerPlugin({
            // childProcess 터미널 명령어를 실행하는 노드 모듈, execSync 문자열을 받아서 터미널에 실행
            banner: `
                Build Date: ${new Date().toLocaleString()}
                Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
                Author: ${childProcess.execSync('git config user.name')}
            `
        }),
        // 2. 빌드 타임에 결정되는 환경변수를 어플리케이션단에 주입
        new webpack.DefinePlugin({
            // 환경변수 관리
            TWO: JSON.stringify('1+1'), // 어플리케이션에서 전역변수로 접근 가능
            'api.domain': JSON.stringify('http://dev.api.domain.com')
        }),

        // 써드 파티 패키지
        // 3. 빌드과정에 html 파일을 포함해 동적으로 사용 (NODE_ENV=production npm run build)
        new HtmlWebpackPlugin({
            template: './src/index.html',
            templateParameters: {
                env: process.env.NODE_ENV === 'development' ? '(개발용)' : ''
            },
            minify: process.env.NODE_ENV === 'production' ? {
                // collapseWhitespace: true,
                removeComments: true,
            } : false
        }),
        // 4. 이전 결과 아웃풋 폴더 삭제
        new CleanWebpackPlugin(),
        // 5. 번들된 스크립트에서 css 코드만 따로 뽑아내서 파일 생성
        // 나머지 연산자로 플러그인을 활성/비활성화 가능
        ...(process.env.NODE_ENV === 'production'
            ? [new MiniCssExtractPlugin({filename: '[name].css'})]
            : []
        )


    ]
}