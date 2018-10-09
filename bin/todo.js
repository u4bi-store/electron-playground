const Observable = require('rxjs');
const { filter, map } = require('rxjs/operators');


let _key_count = 1;


const input = document.querySelector('input');
const list  = document.querySelector('ul');
console.log(input, list)


const insert$ = Observable.fromEvent(input, 'keyup')
const remove$ = Observable.fromEvent(list, 'click')


insert$.pipe(
    filter(e => e.keyCode === 13 && e.target.value),
    map(e => e.target),
    map(e => {

        let element = document.createElement('li');

        element.dataset.key = _key_count;

        element.innerHTML = `<span>${ e.value }</span> <button class="remove">삭제</button>`;
        e.value = '';

        _key_count++;

        return element;
    }),
    map(e => list.appendChild(e)),
    map(e => ({
        key : e.dataset.key,
        text : e.children[0].textContent 
    }))
)
.subscribe(e => console.log('생성', e))


remove$.pipe(
    filter(e => e.target.classList.contains('remove')),
    map(e => e.target),
    map(e => e.parentElement),
    map(e => e.parentElement.removeChild(e)),
    map(e => ({
        key : e.dataset.key,
        text : e.children[0].textContent
    }))
)
.subscribe(e => console.log('삭제', e))