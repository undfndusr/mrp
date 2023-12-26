import { debounce } from '../utils';
import { PARAMS } from '../constants';

export const observeUrlChange = async (onChange: () => void): Promise<void> => {
    await GM.setValue(PARAMS.CURRENT_PAGE_URL_KEY, window.location.href);

    const onChangeHandler = async () => {
        const oldHref = await GM.getValue<string>(PARAMS.CURRENT_PAGE_URL_KEY);
        const newHref = window.location.href;

        if (oldHref !== newHref) {
            console.log('MRP.observeUrlChange');

            await GM.setValue(PARAMS.CURRENT_PAGE_URL_KEY, newHref);
            onChange();
        }
    };

    const debouncedOnChangeHandler = debounce(onChangeHandler, 500);

    const observer = new MutationObserver(debouncedOnChangeHandler);

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
};
