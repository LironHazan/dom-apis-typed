import { Utils } from '../utils/utils.js'; //TS wont support "mjs" yet

export class WebObserversExample {
    COLORS: any;
    boxRef: HTMLElement;
    counter: HTMLElement;
    resizeObserver: any;
    mutationObserver: MutationObserver | any;
    intersectionObserver: IntersectionObserver | any;

    constructor(boxRef: HTMLElement, counter: HTMLElement) {
        this.COLORS = Utils.getColors();
        this.boxRef = boxRef;
        this.counter = counter;
        this.setBoxRefStyle();
        // Watchers
        this.setObservers();
    }

    setBoxRefStyle() {
        this.boxRef.style.width = '60%';
        // I don't have where to clean it..
        requestAnimationFrame(() => {
            this.boxRef.classList.toggle('resizable-box');
        })
    }

    setObservers(){
        // RESIZE OBSERVER - change the box color on resize!
        // @ts-ignore
        this.resizeObserver = new ResizeObserver((entries:  any) => { //ResizeObserverEntry
            for (let entry of entries) {
                entry.target.style.background = this.COLORS[Utils.randomNumber(0, 4)];
            }
        });

        // MUTATION OBSERVER - increase counter when the style changed!!
        let times: number;
        this.mutationObserver = new MutationObserver((entries: MutationRecord[]) => {
            for (let entry of entries) {
                times = Number(this.counter.textContent) + 1;
                this.counter.textContent = `${times}`;
            }
        });

        // INTERSECTION OBSERVER - unobserve the other observers when target isn't in viewport!!
        this.intersectionObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
            for (let entry of entries) {
                if (entry.intersectionRatio !== 0) {
                    this.startWatching(this.boxRef);
                } else {
                    this.cleanupWatchers(this.boxRef);
                }
            }
        });
    }

    private startWatching(target: HTMLElement){
        this.resizeObserver.observe(target);
        this.mutationObserver.observe(target, { attributes: true, attributeFilter: ['style']});
    };
    private cleanupWatchers(target: HTMLElement){
        this.resizeObserver.unobserve(target);
        this.mutationObserver.disconnect();
    };

    startObserving() {
        this.intersectionObserver.observe(this.boxRef);
    }
    pauseObserving() {
        this.intersectionObserver.unobserve(this.boxRef);
    }
    killObserver() {
        this.intersectionObserver.disconnect();
    }
}

