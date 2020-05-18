
const config = {
    zoom: 0.01,
    planeLeftStart: -3,
    planeTopStart: 2,
    iterations: 30,
    update: drawMandelbrot
};
var gui = new dat.GUI({name: 'Mandelbrot set'});
gui.add(config, 'zoom');
gui.add(config, 'planeLeftStart');
gui.add(config, 'planeTopStart');
gui.add(config, 'iterations');
gui.add(config, 'update');

const maxWidth = window.innerWidth;
const maxHeight = window.innerHeight;


function belongsToMandelbrotSet(c){
    let z = math.complex(c);
    for (let i = 0; i < config.iterations; i++) {

        if (Math.sqrt(z.re * z.re + z.im * z.im) == Infinity) {
            return false;
        }
        // z = z^2 + c
        z = math.add(math.multiply(z, z), c)
    }
    return true;
}

function drawPixel(pixel, color = '#000000'){
    context2d.fillStyle = color;
    context2d.fillRect(pixel[0], pixel[1], 1, 1);
}


let canvas = document.createElement('canvas');
canvas.width = maxWidth;
canvas.height = maxHeight;
document.body.appendChild(canvas);
const context2d = canvas.getContext("2d");

function clearScreen(){
    context2d.fillStyle = '#FFFFFF';
    context2d.fillRect(0,0, maxWidth, maxHeight);
}

function drawMandelbrot(){
    clearScreen();

    for (let x = 0; x < maxWidth; x++){
        for (let y = 0; y < maxHeight; y++){
            const c = math.complex(
                config.planeLeftStart + (x * config.zoom),
                config.planeTopStart - (y * config.zoom)
            );
            if (belongsToMandelbrotSet(c)){
                drawPixel([x,y]);
            }
        }
    }
}

drawMandelbrot();
