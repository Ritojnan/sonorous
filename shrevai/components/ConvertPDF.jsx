// pages/convert.js
import { useState } from 'react';
import pdfToText from "react-pdftotext";
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardHeader, CardTitle } from './ui/card';

export default function ConvertPDF() {
  const [file, setFile] = useState(null);
  const [base64, setBase64] = useState('');
  const [text, setText] = useState('');
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileRead = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      setBase64(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file) {
      handleFileRead(file);
    }
  };

  
function extractText(event) {
  const file = event.target.files[0];
  pdfToText(file)
    .then((text) => setText(text))
    .catch((error) => console.error("Failed to extract text from pdf"));
}

  return (
    <Card className="p-4">
<CardHeader><CardTitle>Convert PDF</CardTitle></CardHeader>
      <Input type="file" accept="application/pdf" onChange={extractText} />
      {text && (
        <div>
          <Textarea
          className='mt-4'
            value={text}
            readOnly
            rows="10"
            cols="80"
          />
        </div>
      )}
    </Card>
  );
}
