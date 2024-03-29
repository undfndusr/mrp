import { PageType } from '../constants';
import { getDomElementAsync } from '../utils';

type AsyncFn = () => Promise<void>;

type ConstructorArgs = {
    pageType: PageType;
    pageReadyElementSelector: string;
    onPreparePage?: AsyncFn;
    onRun: AsyncFn;
};

export class Page {
    private _pageType: PageType;
    private _pageReadyElementSelector: string;

    private onPreparePage: AsyncFn;
    private onRun: AsyncFn;

    constructor({ pageType, pageReadyElementSelector, onPreparePage, onRun }: ConstructorArgs) {
        this._pageType = pageType;
        this._pageReadyElementSelector = pageReadyElementSelector;
        this.onPreparePage = onPreparePage;
        this.onRun = onRun;
    }

    public run = async () => {
        try {
            console.log(`${this._pageType} page init`);

            await getDomElementAsync(this._pageReadyElementSelector);

            await this.onPreparePage?.();

            await this.onRun();
        } catch (e) {
            console.log(`MRP.${this._pageType}.run: `, e);
        }
    };
}
