import { cn } from '../utils';

interface Props {
    text?: string;
    attrs: Record<string, string>;
    checked?: boolean;
    onChange?: (event: HtmlInputEvent) => void;
}

export const createToggle = ({ text, attrs, checked, onChange }: Props): HTMLElement => {
    const inputAttrs = checked ? { type: 'checkbox', checked } : { type: 'checkbox' };
    const input = cn('input', inputAttrs);
    const icon = cn('span', { class: 'icon' });
    const textElement = cn('span', { class: 'text' }, [text]);
    const label = cn('label', { class: 'mrp-toggle', ...attrs }, [input, icon, textElement]);

    if (onChange) {
        input.addEventListener('change', onChange);
    }

    return label;
};
