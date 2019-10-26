
const bootstrap = async () => {
        const  { MyAppSpace } = await import('./dom-observers-apis/combined-observers.js');
        const app = new MyAppSpace();
        app.start();
};


bootstrap()
    .then(() => {
        console.info('app is up and running');
    });
