let maxWidth = window.innerWidth;
let maxHeight = window.innerHeight;
let zoom = 0.01; // distance between pixels.
let planeLeftStart = -3;
let planeTopStart = 2;
let iterations = 30;


let canvas = document.createElement('canvas');
canvas.width = maxWidth;
canvas.height = maxHeight;
document.body.appendChild(canvas);
const context2d = canvas.getContext("2d");

let first = true;


function belongsToMandelbrotSet(c){
    let z = math.complex(c);
    for (let i = 0; i < iterations; i++) {

        if (Math.sqrt(z.re * z.re + z.im * z.im) == Infinity) {
            return false;
        }
        // z = z^2 + c
        z = math.add(math.multiply(z, z), c)
    }
    return true;
}

function drawPixel(pixel){
    context2d.fillRect(pixel[0], pixel[1], 1, 1);
}

for (let x = 0; x < maxWidth; x++){
    for (let y = 0; y < maxHeight; y++){
        const c = math.complex(
            planeLeftStart + (x * zoom),
            planeTopStart - (y * zoom)
        );
        if (belongsToMandelbrotSet(c)){
            drawPixel([x,y]);
        }
    }
}
