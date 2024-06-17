import React, { useState } from 'react';
import { LuMic } from 'react-icons/lu';

const SpeechRecognitionButton = ({ setInput ,selectedLanguage}) => {
  const [recognizing, setRecognizing] = useState(false);
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  recognition.onresult = (event) => {
    setInput(event.results[0][0].transcript);
    setRecognizing(false);
  };

  recognition.onend = () => setRecognizing(false);

  const handleMicClick = () => {
    if (recognizing) {
      recognition.stop();
      setRecognizing(false);
    } else {
      recognition.lang = selectedLanguage;
      recognition.start();
      setRecognizing(true);
    }
  };

  return (
    <button
      className={`p-2 rounded-l-lg ${recognizing ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}
      onClick={handleMicClick}
    >
      <LuMic className="h-5 w-5 text-white" />
    </button>
  );
};

export default SpeechRecognitionButton;
