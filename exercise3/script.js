const API = "wss://echo-ws-service.herokuapp.com"

const btnSend = document.querySelector('.btn-js-send'); //кнопка отправки сообщения
const btnGeo = document.querySelector('.btn-js-geo'); //кнопка отправки геолокации
const inputText = document.querySelector('.js-input-text'); //поле ввода сообщения
const textChat = document.querySelector('.js-chat-masseges'); //поле вывода сообщений
const errorText = document.querySelector('.text-error'); //поле вывода ошибки при определении геолокации

// соединение с сервером
const websocket = new WebSocket(API);
    websocket.onopen = function(evt) {
        console.log("CONNECTED");
    };
    websocket.onmessage = function(evt) {
        writeToScreen(`ответ сервера: ${evt.data}`, 'flex-start');
    };
    websocket.onerror = function(evt) {
        writeToScreen(`server: ${evt.data}`, 'flex-start');
    };

// кнопка отправки сообщения
btnSend.addEventListener('click', () => {
    let massege = inputText.value;
    if (massege == "") {
        errorText.innerHTML = "Нельзя отправить пустое сообщение"
    }else {
        websocket.send(massege);
        writeToScreen(`Вы: ${massege}`);
        inputText.value = '';}
});

// функция выведения сообщения
function writeToScreen(massege, position='flex-end') {
    let chatElement = `<p class='messages border' style='align-self: ${position}'>${massege}</p>`;
    textChat.innerHTML += chatElement;
    textChat.scrollTop = textChat.scrollHeight;
};


// geo-location

//функция вывода сообщения при отключенной геолокации
const error = () => {
    errorText.innerHTML = "Разрешите доступ к вашей геолокации"
};

//функция отправки геолокации
const success = (position) => {
    let latitude  = position.coords.latitude;
	let longitude = position.coords.longitude;
	let geoLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
	writeToScreen(`<a  href='${geoLink}' target='_blank'>Ваша гео-локация</a>`);
};

//кнопка отправки геолокации
btnGeo.addEventListener('click', () => {
    if (!navigator.geolocation) {
        errorText.innerHTML = "Данная функция не поддерживается вашим браузером"
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
});