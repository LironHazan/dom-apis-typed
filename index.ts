
const bootstrap = () => {

        return Promise.all([
                import('./dom-observers-apis/combined-observers.js'),
                import ('./web-animations/web-anim-example.js'),
        ]).then(([ { WebObserversExample }, { WebAnimationInUse }]) => {

                // DOM REFS:
                const boxRef = <HTMLElement> (document.querySelector('#box'));
                const counterRef = <HTMLElement> (document.querySelector('.counter'));
                const animBox = <HTMLElement>(document.querySelector('.anim-box'));
                const animBtn = <HTMLElement>(document.querySelector('.mbtn'));

                const observersExample = new WebObserversExample(boxRef, counterRef);
                const animRef = new WebAnimationInUse(animBox);

                animBtn.addEventListener('click', () => {
                    animRef.toggleAnimation()
                });

                observersExample.startObserving();

            });
};


bootstrap()
    .then((appRef) => {
        console.info('app is up and running');
        //console.log(appRef);
    });
