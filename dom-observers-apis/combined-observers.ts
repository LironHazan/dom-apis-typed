
const run = () => {
    class Utils {
        static randomNumber(from: number, to: number ){
            return ~~(Math.random() * (to - from)) + from;
        };
        static getColors() {
            const COLORS = [];
            while (COLORS.length < 4) {
                COLORS.push(`rgb(${Utils.randomNumber(0, 255)}, 
       ${Utils.randomNumber(0, 255)}, 
       ${Utils.randomNumber(0, 255)})`);
            }
            return COLORS;
        }
    }

    class MyAppSpace {
        COLORS: any;
        template: string;
        appRef: HTMLElement;
        counter: HTMLElement;
        resizeObserver: any;
        mutationObserver: any;
        intersectionObserver: any;

        constructor() {
            this.COLORS = Utils.getColors();
            this.template = MyAppSpace.initTemplate();
            this.appRef = <HTMLElement> (document.querySelector('#app'));
            MyAppSpace.attachTemplate(this.appRef, this.template);
            this.counter = <HTMLElement> (document.querySelector('.counter'));

            // Watchers
            this.setObservers();
        }

        static initTemplate(): string {
            // View box
            return `<h1>Resize me to see what happens!</h1>
            <div> counter: <span class="counter"> 0 </span> </div>`;
        }

        static attachTemplate(appRef: HTMLElement, template: string) {
            appRef.innerHTML = template;
            appRef.style.width = '60%';
            appRef.classList.add('resizable-box');
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
            let times;
            this.mutationObserver = new MutationObserver((entries) => {
                for (let entry of entries) {
                    times = Number(this.counter.textContent) + 1;
                    this.counter.textContent = `${times}`;
                }
            });

            // INTERSECTION OBSERVER - unobserve the other observers when target isn't in viewport!!
            this.intersectionObserver = new IntersectionObserver((entries) => {
                for (let entry of entries) {
                    if (entry.intersectionRatio !== 0) {
                        this.startWatching(this.appRef);
                    } else {
                        this.cleanupWatchers(this.appRef);
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

        start() {
            this.intersectionObserver.observe(this.appRef);
        }
        pause() {
            this.intersectionObserver.unobserve(this.appRef);
        }
        stop() {
            this.intersectionObserver.disconnect(this.appRef);
        }
    }

    const app = new MyAppSpace();
    app.start();
};

run();

// PERFORMANCE OBSERVER - doesn't play well here on stackblitz
const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        // `name` will be either 'first-paint' or 'first-contentful-paint'.
        const metricName = entry.name;
        const time = Math.round(entry.startTime + entry.duration);

        console.table({
            eventCategory: 'Performance Metrics',
            eventAction: metricName,
            eventValue: time,
            nonInteraction: true,
        });
    }
});
// Start observing paint entries.
observer.observe({entryTypes: ['paint']});

