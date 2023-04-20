
// Usage: testSupport({client?: string, os?: string}[])
// Client and os are regular expressions.
// See: https://cdn.jsdelivr.net/npm/device-detector-js@2.2.10/README.md for
// legal values for client and os

const controls = window;
const drawingUtils = window;
const mpFaceMesh = window;
const config = {
    locateFile: (file) => {
        return `` +
            `${mpFaceMesh.VERSION}/${file}`;
    }
};
// Our input frames will come from here.
const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const controlsElement = document.getElementsByClassName('control-panel')[0];
const canvasCtx = canvasElement.getContext('2d');
/**
 * Solution options.
 */
const solutionOptions = {
    selfieMode: true,
    enableFaceGeometry: false,
    maxNumFaces: 1,
    refineLandmarks: false,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
};
// We'll add this to our control panel later, but we'll save it here so we can
// call tick() each time the graph runs.
const fpsControl = new controls.FPS();
// Optimization: Turn off animated spinner after its hiding animation is done.
const spinner = document.querySelector('.loading');
spinner.ontransitionend = () => {
    spinner.style.display = 'none';
};
function dis(p1, p2) {
    let x = (p1.x - p2.x) ** 2
    let y = (p1.y - p2.y) ** 2
    let z = (p1.z - p2.z) ** 2
    return Math.sqrt(x + y + z)
}
function openMouse(landmarks) {
    return dis(landmarks[13], landmarks[14]) / dis(landmarks[78], landmarks[308])
}
function onResults(results) {
    // Hide the spinner.
    document.body.classList.add('loaded');
    // Update the frame rate.
    fpsControl.tick();
    // Draw the overlays.
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
    if (results.multiFaceLandmarks) {
        for (const landmarks of results.multiFaceLandmarks) {
            drawingUtils.drawConnectors(canvasCtx, landmarks, mpFaceMesh.FACEMESH_TESSELATION, { color: '#fffa', lineWidth: 1 });
            // drawingUtils.drawConnectors(canvasCtx, landmarks, mpFaceMesh.FACEMESH_RIGHT_EYE, { color: '#FF3030' , lineWidth: 1});
            // drawingUtils.drawConnectors(canvasCtx, landmarks, mpFaceMesh.FACEMESH_RIGHT_EYEBROW, { color: '#FF3030', lineWidth: 1 });
            // drawingUtils.drawConnectors(canvasCtx, landmarks, mpFaceMesh.FACEMESH_LEFT_EYE, { color: '#30FF30', lineWidth: 1 });
            // drawingUtils.drawConnectors(canvasCtx, landmarks, mpFaceMesh.FACEMESH_LEFT_EYEBROW, { color: '#30FF30' , lineWidth: 1});
            // drawingUtils.drawConnectors(canvasCtx, landmarks, mpFaceMesh.FACEMESH_FACE_OVAL, { color: '#E0E0E0' , lineWidth: 1});
            // drawingUtils.drawConnectors(canvasCtx, landmarks, mpFaceMesh.FACEMESH_LIPS, { color: '#E0E0E0', lineWidth: 1 });
            let isOpenMouse = openMouse(landmarks)
            // console.log(isOpenMouse)
            parent.postMessage( {from:'面部识别',data:isOpenMouse},'/');
            drawingUtils.drawConnectors(canvasCtx, landmarks, [[13, 14], [308, 78]], { color: isOpenMouse>0.2 ? '#FF0000' : '#00FF00' });

        }
    }
    canvasCtx.restore();
}
const faceMesh = new mpFaceMesh.FaceMesh(config);
faceMesh.setOptions(solutionOptions);
faceMesh.onResults(onResults);
// Present a control panel through which the user can manipulate the solution
// options.
new controls
    .ControlPanel(controlsElement, solutionOptions)
    .add([
        new controls.StaticText({ title: '面部识别' }),
        fpsControl,
        // new controls.Toggle({ title: 'Selfie Mode', field: 'selfieMode' }),
        new controls.SourcePicker({
            onFrame: async (input, size) => {
                const aspect = size.height / size.width;
                let width, height;
                if (window.innerWidth > window.innerHeight) {
                    height = window.innerHeight;
                    width = height / aspect;
                }
                else {
                    width = window.innerWidth;
                    height = width * aspect;
                }
                canvasElement.width = width;
                canvasElement.height = height;
                await faceMesh.send({ image: input });
            },
        }),
    ])
    .on(x => {
        const options = x;
        faceMesh.setOptions(options);
    });