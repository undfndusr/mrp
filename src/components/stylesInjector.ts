import * as styles from 'bundle-text:../styles/index.less';

export const injectStyles = () => {
    document.head.insertAdjacentHTML('beforeend', `<style type="text/css" id="mrpStyles">${styles}</style>`);
};
