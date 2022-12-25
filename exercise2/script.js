const btn = document.querySelector('.j-btn-test');
const info = document.querySelector('.information');

btn.addEventListener("click", getScreen, false)


function getScreen() {
    let screenWidth = window.screen.width;
    let screenHeight = window.screen.height;
    window.alert(`Ширина экрана: ${screenWidth}, а высота экрана: ${screenHeight}`)
}

//в задании было написано вывод через alert и гиперссылка на описание этой функции, так же надо было сделать?)