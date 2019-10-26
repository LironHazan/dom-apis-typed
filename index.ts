const bootstrap = async () => {
        const  { MyAppSpace } = await import('./dom-observers-apis/combined-observers.js');
        const app = new MyAppSpace();
        app.start();
        return app;
};


bootstrap()
    .then((appRef) => {
        console.info('app is up and running');
        //console.log(appRef);
    });
