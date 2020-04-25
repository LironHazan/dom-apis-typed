// using css-paint-polyfill

if ('paintWorklet' in CSS) {
    // @ts-ignore :( :(
    CSS.paintWorklet.addModule('my-custom-paint.js');
}

// https://codersblock.com/blog/say-hello-to-houdini-and-the-css-paint-api/
// https://developers.google.com/web/updates/2018/01/paintapi

export class Painting {
    paint<T extends { width: number, height: number
    }>(ctx: CanvasRenderingContext2D, geometry: T, properties: any) {
        // Paint worklet uses CSS Typed OM to model the input values.
        // As of now, they are mostly wrappers around strings,
        // but will be augmented to hold more accessible data over time.
        const size = parseInt(properties.get('--checkerboard-size').toString());
        const spacing = parseInt(properties.get('--checkerboard-spacing').toString());
        const colors = ['red', 'green', 'blue'];
        for(let y = 0; y < geometry.height/size; y++) {
            for(let x = 0; x < geometry.width/size; x++) {
                ctx.fillStyle = colors[(x + y) % colors.length];
                ctx.beginPath();
                ctx.rect(x*(size + spacing), y*(size + spacing), size, size);
                ctx.fill();
            }
        }
    }
}
// @ts-ignore :( :(
registerPaint('my-painting', Painting);

