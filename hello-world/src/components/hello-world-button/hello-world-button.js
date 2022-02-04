import './hello-world-button.scss';

class HelloWorldButton {
    nombreClaseBoton = 'hello-world-button';
    nombreClaseTexto = 'hello-world-text';
    render() {
        const button = document.createElement('button');
        const body = document.querySelector('body');
        button.innerHTML = 'Pulsame';
        button.classList.add(this.nombreClaseBoton);
        button.onclick = () => {
            const p = document.createElement('p');
            p.innerHTML = 'Botón pulsado';
            p.classList.add(this.nombreClaseTexto);
            body.appendChild(p);
        };
        body.appendChild(button);
    }
}

export default HelloWorldButton;
