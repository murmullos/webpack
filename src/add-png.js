import imageSmall from './assets/img/imageSmall.png';
import imageBig from './assets/img/imageBig.png';

function addPng() {
    const imgSmall = document.createElement('img');
    const imgBig = document.createElement('img');

    imgSmall.alt = 'small image png';
    imgSmall.width = 100;
    imgSmall.src = imageSmall;

    imgBig.alt = 'big image png';
    imgBig.width = 100;
    imgBig.src = imageBig;

    const body = document.querySelector('body');
    body.appendChild(imgSmall);
    body.appendChild(imgBig);
}

export default addPng;
