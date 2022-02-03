import HelloWorldButton from "./components/hello-world-button/hello-world-button.js";
import Header from './components/header/header.js';

const helloWordButton = new HelloWorldButton;
helloWordButton.render();

const header = new Header;
header.render('título de la web hello World');
