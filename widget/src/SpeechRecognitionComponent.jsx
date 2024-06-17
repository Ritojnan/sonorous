import React, { useState, useEffect } from 'react';

const SpeechRecognitionComponent = () => {
  const [recognizedText, setRecognizedText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  const synth = window.speechSynthesis;

  useEffect(() => {
    
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
      console.log('Speech recognition started.');
    };

    recognition.onend = () => {
      if (!isSpeaking) {
        console.log('Speech recognition ended. Restarting...');
        recognition.start();
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event);
      recognition.stop();
      recognition.start();
    };

    recognition.onresult = (event) => {
      if (!isSpeaking) {
        let transcript = event.results[event.resultIndex][0].transcript.trim().toLowerCase();
        setRecognizedText('Recognized: ' + transcript);
        console.log('Recognized speech:', transcript);

        if (transcript.includes('start')) {
          speak('Your predefined text to speak.');
        } else if (transcript.includes('stop')) {
          stopSpeaking();
        }
      } else {
        console.log('Ignored speech:', event.results[event.resultIndex][0].transcript);
      }
    };

    // Cleanup function to stop recognition on component unmount
    return () => {
      recognition.stop();
    };
  }, [isSpeaking]);

  const speak = (text) => {
    setIsSpeaking(true);
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    synth.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synth.speaking) {
      synth.cancel();
      setIsSpeaking(false);
      // recognition.start();
    }
  };

  const startRecognition = () => {
  
    recognition.start();
  };

  const stopRecognition = () => {
    recognition.stop();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="space-x-4">
        <button
          onClick={()=>speak('Your predefined text to speak.')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition"
        >
          Start Speaking
        </button>
        <button
          onClick={startRecognition}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
        >
          Start Recognition
        </button>
        <button
          onClick={stopRecognition}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition"
        >
          Stop Recognition
        </button>
      </div>
      <div id="recognizedText" className="mt-4 text-lg">
        {recognizedText}
      </div>
    </div>
  );
};

export default SpeechRecognitionComponent;
