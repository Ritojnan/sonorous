import React, { useState, useEffect } from 'react';

const SpeechSynthesizer = () => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [text, setText] = useState('');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const populateVoiceList = () => {
      let availableVoices = synth.getVoices().filter(voice => voice.lang.startsWith('en'));
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0].name);
      }
    };

    populateVoiceList();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = populateVoiceList;
    }
  }, []);

  const speak = () => {
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      console.error('speechSynthesis.speaking');
      return;
    }
    if (text !== '') {
      const utterThis = new SpeechSynthesisUtterance(text);
      const selectedOption = voices.find(voice => voice.name === selectedVoice);
      utterThis.voice = selectedOption;
      utterThis.pitch = pitch;
      utterThis.rate = rate;
      synth.speak(utterThis);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    speak();
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-center">Speech Synthesizer</h1>
      <p className="text-center my-4">
        Enter some text in the input below and press return or the "play" button to hear it. Change voices using the dropdown menu.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="text" className="mb-1">Enter text</label>
          <input
            id="text"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="rate" className="mb-1">Rate</label>
          <input
            type="range"
            min="0.5"
            max="2"
            value={rate}
            step="0.1"
            id="rate"
            onChange={(e) => setRate(e.target.value)}
            className="w-full"
          />
          <div className="text-right">{rate}</div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="pitch" className="mb-1">Pitch</label>
          <input
            type="range"
            min="0"
            max="2"
            value={pitch}
            step="0.1"
            id="pitch"
            onChange={(e) => setPitch(e.target.value)}
            className="w-full"
          />
          <div className="text-right">{pitch}</div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="voice" className="mb-1">Voice</label>
          <select
            id="voice"
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            {voices.map((voice, index) => (
              <option key={index} value={voice.name}>
                {voice.name} ({voice.lang}) {voice.default && '-- DEFAULT'}
              </option>
            ))}
          </select>
        </div>
        <div className="text-center mt-4">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Play</button>
        </div>
      </form>
    </div>
  );
};

export default SpeechSynthesizer;
