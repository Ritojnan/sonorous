// components/OcrComponent.js
import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Label } from './ui/label';
import { Input } from './ui/input';

const OcrComponent = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleOcr = () => {
    if (!image) return;

    setLoading(true);
    Tesseract.recognize(
      image,
      'eng',
      {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(m.progress * 100);
          }
        },
      }
    ).then(({ data: { text } }) => {
      setText(text);
      setLoading(false);
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">OCR with Tesseract.js</h1>
      <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="ocr">OCR</Label>
      <Input id="ocr" type="file"  onChange={handleImageChange} className="mb-4"/>
    </div>
      <Button onClick={handleOcr} disabled={loading}>
        {loading ? 'Processing...' : 'Extract Text'}
      </Button>
      {loading && (
        <div className="my-4">
          <Progress value={progress} />
        </div>
      )}
      {text && (
        <div className="mt-4 p-4 border rounded-md bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Extracted Text:</h2>
          <p>{text}</p>
        </div>
      )}

<h2 className="text-xl font-semibold mb-2">Image Uploaded:</h2>
{image && <img src={image} alt="Selected" className="max-w-full mt-4" />}
      
    </div>
  );
};

export default OcrComponent;
