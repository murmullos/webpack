import Header from "../header/header";
import KiwiImage from "../kiwi-image/kiwi-image";
import * as _ from 'lodash';

class KiwiPage {
    render () {
        const header = new Header;
        header.render(_.startCase('títulos Web página Kiwi'));

        const kiwiImage = new KiwiImage;
        kiwiImage.render();

        import ('ImageCaptionApp/ImageCaption')
            .then((ImageCaptionModule) => {
                const ImageCaption = ImageCaptionModule.default;
                const imageCaption = new ImageCaption();
                imageCaption.render('Este kiwi viene de otra app mua ja ja');
            })
    }
}

export default KiwiPage;
