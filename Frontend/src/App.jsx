import React, { useState } from 'react';
import PDFEditor from './components/PDFEditor';

function App() {
  const [fields, setFields] = useState([]);

  const addField = () => {
    setFields([{ 
      id: Date.now(), 
      type: 'signature', 
      leftPct: 5,  // Changed from 20/50 to 10
      topPct: 5    // Changed from 20/50 to 10
    }]);
  };

  const handleSign = async () => {
    if (fields.length === 0) return alert("Add a box first!");

    const sampleSignature = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

    try {
      const response = await fetch('http://localhost:5001/sign-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leftPct: fields[0].leftPct,
          topPct: fields[0].topPct,
          signatureBase64: sampleSignature
        })
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'signed_document.pdf';
        link.click();
      }
    } catch (err) {
      alert("Check if backend server (node server.js) is running.");
    }
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>BoloForms Engine</h1>
      <button onClick={addField}>1. ADD BOX</button>
      <button onClick={handleSign} style={{ marginLeft: '10px' }}>2. SIGN & DOWNLOAD</button>
      <div style={{ marginTop: '20px' }}>
        <PDFEditor fields={fields} setFields={setFields} />
      </div>
    </div>
  );
}

export default App;