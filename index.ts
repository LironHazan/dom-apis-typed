const bootstrap = async () => {

        const  { WebObserversExample } = await import('./dom-observers-apis/combined-observers.js');
        // DOM REFS:

        const boxRef = <HTMLElement> (document.querySelector('#box'));
        const counterRef = <HTMLElement> (document.querySelector('.counter'));

        const app = new WebObserversExample(boxRef, counterRef);
        app.startObserving();
        return app;

};


bootstrap()
    .then((appRef) => {
        console.info('app is up and running');
        //console.log(appRef);
    });
