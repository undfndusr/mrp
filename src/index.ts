import { observeUrlChange } from './components/urlObserver';
import { injectStyles } from './components/stylesInjector';
import { router } from './components/router';
import { PARAMS } from './constants';

const observeVisibilityChange = (onChange: () => void) => {
    document.onvisibilitychange = () => {
        if (document.visibilityState === 'visible') {
            onChange();
        }
    };
};

const init = () => {
    console.log('MRP init');

    injectStyles();

    router(); // Стартовый запуск
    observeUrlChange(router); // Запуск при изменении урла

    // Дополнительно запускаем скрипт при переходе на вкладку
    // (для страниц, открытых в новой вкладке или выгруженных из памяти браузером)
    observeVisibilityChange(router);
};

try {
    window.onload = () => {
        console.clear();
        setTimeout(init, PARAMS.INIT_DELAY);
    };
} catch (e) {
    console.log('MRP error:', e);
}
