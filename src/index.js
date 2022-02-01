import HelloWorldButton from "./components/hello-world-button/hello-world-button.js";
import addImage from './add-image.js';
import addSvg from './add-svg';
import addPng from './add-png.js';

const helloWordButton = new HelloWorldButton;
helloWordButton.render();
addImage();
addSvg();
addPng();
