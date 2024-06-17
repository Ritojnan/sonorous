// src/AudioModel.js
import React, { useEffect } from "react";

function SpeechRecognitionComponent() {
  // more documentation available at
  // https://github.com/tensorflow/tfjs-models/tree/master/speech-commands

  // the link to your model provided by Teachable Machine export panel

  const URL = "http://localhost:5173/model/";
  async function createModel() {
    const checkpointURL = URL + "model.json"; // model topology
    const metadataURL = URL + "metadata.json"; // model metadata

    const recognizer = speechCommands.create(
      "BROWSER_FFT", // fourier transform type, not useful to change
      undefined, // speech commands vocabulary feature, not useful for your models
      checkpointURL,
      metadataURL
    );

    // check that model and metadata are loaded via HTTPS requests.
    await recognizer.ensureModelLoaded();
    return recognizer;
  }
  async function init() {
    const recognizer = await createModel();
    const classLabels = recognizer.wordLabels(); // get class labels
    const labelContainer = document.getElementById("label-container");
    for (let i = 0; i < classLabels.length; i++) {
      labelContainer.appendChild(document.createElement("div"));
    }

    // listen() takes two arguments:
    // 1. A callback function that is invoked anytime a word is recognized.
    // 2. A configuration object with adjustable fields
    recognizer.listen(
      (result) => {
        const scores = result.scores; // probability of prediction for each class
        // render the probability scores per class
        console.log(scores);
        // for (let i = 0; i < classLabels.length; i++) {
        //   const classPrediction =
        //     classLabels[i] + ": " + result.scores[i].toFixed(2);
        //   labelContainer.childNodes[i].innerHTML = classPrediction;
        // }
      },
      {
        includeSpectrogram: true, // in case listen should return result.spectrogram
        probabilityThreshold: 0.75,
        invokeCallbackOnNoiseAndUnknown: true,
        overlapFactor: 0.5, // probably want between 0.5 and 0.75. More info in README
      }
    );

    // Stop the recognition in 5 seconds.
    // setTimeout(() => recognizer.stopListening(), 5000);
  }

  return (
    <div>
      <div>Teachable Machine Audio Model</div>
      <button type="button" onClick={init}>
        Start
      </button>
      <div id="label-container"></div>
    </div>
  );
}

export default SpeechRecognitionComponent;

// import React, { useState, useEffect } from 'react';
// import * as tf from '@tensorflow/tfjs';
// import * as speechCommands from '@tensorflow-models/speech-commands';

// const AudioModel = () => {
//     const [recognizer, setRecognizer] = useState(null);
//     const [classLabels, setClassLabels] = useState([]);
//     const [predictions, setPredictions] = useState([]);

//     useEffect(() => {
//         const initModel = async () => {
//             const baseUrl = `${window.location.protocol}//${window.location.host}/model/`;
//             const checkpointURL = baseUrl + 'model.json';
//             const metadataURL = baseUrl + 'metadata.json';

//             const recognizer = speechCommands.create(
//                 'BROWSER_FFT',
//                 undefined,
//                 checkpointURL,
//                 metadataURL
//             );

//             await recognizer.ensureModelLoaded();
//             setRecognizer(recognizer);
//             setClassLabels(recognizer.wordLabels());
//         };

//         initModel();
//     }, []);

//     const startListening = () => {
//         if (recognizer) {
//             recognizer.listen(result => {
//                 const scores = result.scores;
//                 const newPredictions = classLabels.map((label, index) => ({
//                     label,
//                     score: scores[index].toFixed(2)
//                 }));
//                 setPredictions(newPredictions);
//             }, {
//                 includeSpectrogram: true,
//                 probabilityThreshold: 0.75,
//                 invokeCallbackOnNoiseAndUnknown: true,
//                 overlapFactor: 0.50
//             });
//         }
//     };

//     return (
//         <div>
//             {/* <h1>Teachable Machine Audio Model</h1> */}
//             <button onClick={startListening} className='border-t-neutral-300'>Start</button>
//             <div id="label-container">
//                 {predictions.map((prediction, index) => (
//                     <div key={index}>{prediction.label}: {prediction.score}</div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default AudioModel;
// import React, { useState, useEffect } from 'react';
// import * as tf from '@tensorflow/tfjs';
// import * as speechCommands from '@tensorflow-models/speech-commands';

// const AudioModel = ({ modelUrl }) => {
//     const [recognizer, setRecognizer] = useState(null);
//     const [classLabels, setClassLabels] = useState([]);
//     const [predictions, setPredictions] = useState([]);

//     useEffect(() => {
//         const initModel = async () => {
//             const checkpointURL = modelUrl + 'model.json';
//             const metadataURL = modelUrl + 'metadata.json';

//             const recognizer = speechCommands.create(
//                 'BROWSER_FFT',
//                 undefined,
//                 checkpointURL,
//                 metadataURL
//             );

//             await recognizer.ensureModelLoaded();
//             setRecognizer(recognizer);
//             setClassLabels(recognizer.wordLabels());
//         };

//         initModel();
//     }, [modelUrl]);

//     const startListening = () => {
//         if (recognizer) {
//             recognizer.listen(result => {
//                 const scores = result.scores;
//                 const newPredictions = classLabels.map((label, index) => ({
//                     label,
//                     score: scores[index].toFixed(2)
//                 }));
//                 setPredictions(newPredictions);
//             }, {
//                 includeSpectrogram: true,
//                 probabilityThreshold: 0.75,
//                 invokeCallbackOnNoiseAndUnknown: true,
//                 overlapFactor: 0.50
//             });
//         }
//     };

//     return (
//         <div>
//             <h1>Teachable Machine Audio Model</h1>
//             <button onClick={startListening}>Start</button>
//             <div id="label-container">
//                 {predictions.map((prediction, index) => (
//                     <div key={index}>{prediction.label}: {prediction.score}</div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default AudioModel;
