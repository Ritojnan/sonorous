import React, { useEffect, useRef, useState } from 'react';

const SpeechVolumeDetection = () => {
    const [isListening, setIsListening] = useState(false);
    const [volume, setVolume] = useState(0);
    const recognitionRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const mediaStreamSourceRef = useRef(null);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            recognition.onstart = () => {
                setIsListening(true);
                setupAudioContext();
            };

            recognition.onend = () => {
                setIsListening(false);
                cleanupAudioContext();
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error', event);
                setIsListening(false);
                cleanupAudioContext();
            };

            recognitionRef.current = recognition;
        } else {
            alert('Speech recognition is not supported in this browser.');
        }
    }, []);

    const setupAudioContext = async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert('Audio context is not supported in this browser.');
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            const mediaStreamSource = audioContext.createMediaStreamSource(stream);
            mediaStreamSource.connect(analyser);

            audioContextRef.current = audioContext;
            analyserRef.current = analyser;
            mediaStreamSourceRef.current = mediaStreamSource;

            analyzeVolume();
        } catch (error) {
            console.error('Error accessing audio stream', error);
        }
    };

    const cleanupAudioContext = () => {
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
        if (mediaStreamSourceRef.current) {
            mediaStreamSourceRef.current.disconnect();
            mediaStreamSourceRef.current = null;
        }
        if (analyserRef.current) {
            analyserRef.current.disconnect();
            analyserRef.current = null;
        }
    };

    const analyzeVolume = () => {
        if (!analyserRef.current) return;

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const calculateVolume = () => {
            analyserRef.current.getByteFrequencyData(dataArray);
            const sum = dataArray.reduce((a, b) => a + b, 0);
            const average = sum / dataArray.length;
            setVolume(average);
            requestAnimationFrame(calculateVolume);
        };

        calculateVolume();
    };

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            recognitionRef.current.start();
        }
    };

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
        }
    };

    return (
        <div>
            <button onClick={startListening} disabled={isListening}>Start Listening</button>
            <button onClick={stopListening} disabled={!isListening}>Stop Listening</button>
            <div>Volume: {volume.toFixed(2)}</div>
        </div>
    );
};

export default SpeechVolumeDetection;
