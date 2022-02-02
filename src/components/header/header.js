import './header.scss';

class Header {
    render() {
        const h1 = document.createElement('h1');
        h1.innerHTML = 'Titulas cabecera';
        const body = document.querySelector('body');
        body.appendChild(h1);
    }
}

export default Header;
