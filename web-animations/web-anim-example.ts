export class WebAnimationInUse {
    el: HTMLElement;

    constructor(animElementRef: HTMLElement) {
        this.el = animElementRef;
        this.animate();
    }

    animate() {
        // web animation API no need raf
        const ref = this.el.animate(
            [
                { transform: 'rotate(0) translate3D(-50%, -50%, 0)', color: '#000' },
                { color: '#431236', offset: 0.3},
                { transform: 'rotate(360deg) translate3D(-50%, -50%, 0)', color: '#000' }
            ], {
                duration: 3000,
                iterations: Infinity
            });

        // ref.pause();
    }

}
