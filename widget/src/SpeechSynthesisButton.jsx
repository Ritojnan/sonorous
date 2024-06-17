import React, { useState, useEffect } from 'react';
import { LuMegaphone } from 'react-icons/lu';

const SpeechSynthesisButton = ({ message }) => {
  const [speaking, setSpeaking] = useState(false);
  const utterance = new SpeechSynthesisUtterance(message.replace(/[^a-zA-Z0-9 ]/g, ''));
  
  utterance.onend = () => setSpeaking(false);

  const handleMegaphoneClick = () => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    } else {
      window.speechSynthesis.speak(utterance);
      setSpeaking(true);
    }
  };

  useEffect(() => {
    if (speaking) {
      window.speechSynthesis.speak(utterance);
    }
  }, [message]);

  return (
    <button
      className={`p-2 ${speaking ? 'bg-red-500 animate-pulse' : 'bg-orange-500'}`}
      onClick={handleMegaphoneClick}
    >
      <LuMegaphone className="h-5 w-5 text-white" />
    </button>
  );
};

export default SpeechSynthesisButton;
