import Kiwi from '../../assets/img/kiwi.jpg';


class KiwiImage {
    render () {
        const img = document.createElement('img');
        const body = document.querySelector('body');
        img.alt = 'Imagen de un kiwi';
        img.src = Kiwi;
        img.classList.add('kiwi-image');
        body.appendChild(img);
    }
}

export default KiwiImage;


