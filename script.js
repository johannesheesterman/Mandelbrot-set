
const config = {
    zoom: 0.01,
    planeLeftStart: -3,
    planeTopStart: 2,
    iterations: 30,
    juliaReal: 0.0,   // 0.353
    juliaIm: 0.0,     // 0.288
    update: drawMandelbrot
};
var gui = new dat.GUI({name: 'Mandelbrot set'});
gui.add(config, 'zoom');
gui.add(config, 'planeLeftStart');
gui.add(config, 'planeTopStart');
gui.add(config, 'iterations');

const juliaFolder = gui.addFolder('julia set');
juliaFolder.add(config, 'juliaReal', 0, 2, 0.001);
juliaFolder.add(config, 'juliaIm', 0, 2, 0.001);

gui.add(config, 'update');

const maxWidth = window.innerWidth;
const maxHeight = window.innerHeight;


function belongsToMandelbrotSet(c){
    let z = math.complex(c);
    for (let i = 0; i < config.iterations; i++) {

        if (Math.sqrt(z.re * z.re + z.im * z.im) >= Infinity) {
            return i;
        }
        // z = z^2 + c
        if (config.juliaReal != 0 && config.juliaIm != null){
            z = math.add(math.multiply(z,z), math.complex(config.juliaReal, config.juliaIm));
        }else{
            z = math.add(math.multiply(z, z), c);
        }
        
        
    }
    return null;
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
    context2d.fillStyle = '#000000';
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
            let n = belongsToMandelbrotSet(c);
            if (n == null){
                //drawPixel([x,y]);
            }else{
                drawPixel([x,y], `rgba(0,0,255, ${n/30})`);
            }
        }
    }
}

drawMandelbrot();
