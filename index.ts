
const App_Global_Scope = { bootstrap: async () => {
        const  { MyAppSpace } = await import('./dom-observers-apis/combined-observers.js');
        const app = new MyAppSpace();
        app.start();
}
};


App_Global_Scope.bootstrap()
    .then(() => {
        console.info('app is up and running');
    });
