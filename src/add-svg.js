import Icon from './assets/img/ecma-icon.svg'

function addSvg() {
    const svg = document.createElement('img');
    svg.alt = 'icono svg';
    svg.width = 100;
    svg.src = Icon;
    const body = document.querySelector('body');
    body.appendChild(svg);
}

export default addSvg;
