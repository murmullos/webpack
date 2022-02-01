import Kiwi from './assets/img/kiwi.jpg';
import altKiwi from './altKiwi.txt';

function addImage() {
    const img = document.createElement('img');
    img.alt = altKiwi;
    img.width = 100;
    img.src = Kiwi;
    const body = document.querySelector('body');
    body.appendChild(img);
}

export default addImage;
