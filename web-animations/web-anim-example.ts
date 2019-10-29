export class WebAnimationInUse {
    el: HTMLElement;
    animRef: Animation;
    isOn: boolean;

    constructor(animElementRef: HTMLElement) {
        this.el = animElementRef;
        this.animRef = this.animate();
        this.isOn = true;
    }

    private animate(): Animation {
        // web animation API no need raf
        return this.el.animate(
            [
                { transform: 'rotate(0) translate3D(-50%, -50%, 0)', color: '#000' },
                { color: '#431236', offset: 0.3},
                { transform: 'rotate(360deg) translate3D(-50%, -50%, 0)', color: '#000' }
            ], {
                duration: 3000,
                iterations: Infinity
            });

    }

    toggleAnimation(): boolean {
        this.isOn = !this.isOn;
        this.isOn ? this.animRef.play() : this.animRef.pause();
        return this.isOn;
    }

}
