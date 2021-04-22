// import * as math from './math.js'   // math.js의 모든 export 를 math 라는 객체로 가져온다
// import {sum} from './math.js'   // sum 만 가져오기

// console.log(math.sum(1, 2));

import './app.css';
import nyancat from './nyancat.jpg';

document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML = `
        <img src="${nyancat}" />
    `
})


console.log(process.env.NODE_ENV)   // process.env.NODE_ENV => module.exports 의 mode 에 접근가능(개발환경/운영환경)
console.log(TWO)    // 1+1
console.log(api.domain)