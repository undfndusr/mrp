import { PageType, urlPathByPage } from './constants';

export const isPage = (page: PageType): boolean => {
    const path = urlPathByPage[page];
    return location.pathname.startsWith(path);
};

export const getDomElementAsync = (selector: string, timerLimit = 10000): Promise<HTMLElement | null> => {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                console.log(`Время ожидания DOM элемента ${selector} истекло (${timerLimit / 1000}s)`);
                resolve(null);
            }, timerLimit);

            let timerId;

            const tick = () => {
                const element = document.querySelector(selector) as HTMLElement;

                if (element) {
                    clearTimeout(timerId);
                    resolve(element);
                } else {
                    timerId = setTimeout(tick, 100);
                }
            };

            tick();
        } catch (e) {
            reject(e);
        }
    });
};

export const createLogger = (isEnabled: boolean) => {
    return (...args) => {
        if (isEnabled) {
            console.log(...args);
        }
    };
};

export const digitsOnly = (cur: string): number => {
    return cur ? +cur.replace(/[^0-9.-]+/g, '') : 0;
};

export const sleep = (time: number): Promise<void> => {
    return new Promise(resolve => setTimeout(() => resolve(), time));
};

export const cn = (tagName: string, attrs = {}, childrenList = [], parentNode = null): HTMLElement => {
    const node = document.createElement(tagName);

    if (typeof attrs === 'object') {
        for (const attrsKey in attrs) node.setAttribute(attrsKey, attrs[attrsKey]);
    }

    if (Array.isArray(childrenList)) {
        childrenList.forEach(child => {
            node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
        });
    }

    if (parentNode) {
        parentNode.appendChild(node);
    }

    return node;
};

export const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
        return new Promise(resolve => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                timeout = null;
                Promise.resolve(func.apply(this, [...args])).then(resolve);
            }, wait);
        });
    };
};
