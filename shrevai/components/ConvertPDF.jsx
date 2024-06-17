// pages/convert.js
import { useState } from 'react';
import pdfToText from "react-pdftotext";


function extractText(event) {
  const file = event.target.files[0];
  pdfToText(file)
    .then((text) => console.log(text))
    .catch((error) => console.error("Failed to extract text from pdf"));
}

export default function ConvertPDF() {
  const [file, setFile] = useState(null);
  const [base64, setBase64] = useState('');
  
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

  return (
    <div>
      <h1>Convert PDF to Base64</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <button type="submit">Convert</button>
      </form>
      {base64 && (
        <div>
          <h2>Base64 Output</h2>
          <textarea
            value={base64}
            readOnly
            rows="10"
            cols="80"
          />
        </div>
      )}
      <input type="file" accept="application/pdf" onChange={extractText} />

    </div>
  );
}
