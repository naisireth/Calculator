const main = document.querySelector('.main');
const day = document.querySelector('#day');
const night = document.querySelector('#night');


day.addEventListener('click', function(){
    main.classList.add('day');
    main.classList.remove('night');
});
night.addEventListener('click', function(){
    main.classList.add('night');
    main.classList.remove('day');
});