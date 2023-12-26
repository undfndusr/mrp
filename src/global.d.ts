declare module 'bundle-text:*' {
    const value: string;
    export default value;
}

declare interface HtmlInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}
