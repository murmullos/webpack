import Header from "./components/header/header";
import KiwiImage from "./components/kiwi-image/kiwi-image";
import * as _ from 'lodash';

const header = new Header;
header.render(_.startCase('títulos Web página Kiwi'));

const kiwiImage = new KiwiImage;
kiwiImage.render();


import('HelloWorldApp/HelloWorldButton')
    .then(HelloWorldButtonModule => {
        const HelloWorldButton = HelloWorldButtonModule.default;
        const helloWorldButton = new HelloWorldButton;
        helloWorldButton.render();
    })
