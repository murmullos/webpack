import './navigation-bar.scss';

class NavigationBar {
    render(navigationItems) {
        const litItems = navigationItems.map(element => {
            return `
                <li>
                    <a href="${element.url}">${element.title}</a>
                </li>`
        });

        const ul = document.createElement('ul');
        ul.innerHTML =  litItems.join('');
        ul.classList.add('navigation-bar')
        const body = document.querySelector('body');
        body.appendChild(ul);
    }
}

export default NavigationBar;
