import { cn } from '../utils';

interface Props {
    text?: string;
    attrs: Record<string, string>;
    icon?: string;
    onClick?: () => void;
}

export const createButton = ({ text, attrs, icon, onClick }: Props): HTMLElement => {
    const children = text ? [cn('span', { class: 'text' }, [text])] : [];
    const button = cn('button', { class: 'mrp-button', ...attrs }, children);

    if (icon) {
        button.insertAdjacentHTML('afterbegin', icon);
    }

    if (onClick) {
        button.addEventListener('click', onClick);
    }

    return button;
};
