import HelloWorldButton from "../hello-world-button/hello-world-button.js";
import Header from '../header/header.js';

class HelloWorldPage {
    render() {
        const helloWordButton = new HelloWorldButton;
        helloWordButton.render();

        const header = new Header;
        header.render('título de la web hello World');
    }
}

export default HelloWorldPage;
