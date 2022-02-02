import HelloWorldButton from "./components/hello-world-button/hello-world-button.js";
import addImage from './add-image.js';
import addSvg from './add-svg';
import addPng from './add-png.js';
import Header from './components/header/header.js';

const helloWordButton = new HelloWorldButton;
helloWordButton.render();

const header = new Header;
header.render();

addImage();
addSvg();
addPng();
