const Observable = require('rxjs')
const ajax  = require('rxjs/ajax').ajax

const { debounceTime, mergeMap, map } = require('rxjs/operators')

console.log(ajax)

const btns = document.querySelectorAll('.filters button')
const _content = document.querySelector('.content')
console.log(btns, _content)


const filters$ = Observable.fromEvent(btns, 'click')


filters$.pipe(
    debounceTime(300),
    map(e => e.target.innerText),
    mergeMap( e => {

        let key = '430156241533f1d058c603178cc3ca0e',
            domain = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json',
            url = `${ domain }?key=${ key }&directorNm=${ e }`

        _content.innerHTML = '<h3>검색중입니다...</h3>'

        return ajax(url)
        .pipe(
            map(e => e.response),
            map(e => e.movieListResult),
            map(e => e.movieList)
        )

    })
)
.subscribe(movies => {

    console.log(movies)

    _content.innerHTML = ''

    movies.reduce((element, movie) => {

        let { movieCd, movieNm, movieNmEn, nationAlt, genreAlt, openDt } = movie,
            elem = document.createElement('div')

        elem.className = 'item'

        elem.innerHTML = `
            <h5>no.${ movieCd }</h5>
            <h4>영화명 : ${ movieNm }</h4>
            <h5>영화명(영문) : ${ movieNmEn }</h5>
            <h5>국가 : ${ nationAlt } </h5>
            <h5>장르 : ${ genreAlt }</h5>
            <h5>제작년도 : ${ openDt }</h5>
        `

        element.appendChild(elem)

        return element

    }, _content)
    
})