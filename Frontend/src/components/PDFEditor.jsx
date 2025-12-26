import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import DraggableField from './DraggableField';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFEditor = ({ fields, setFields }) => {
  return (
    <div id="pdf-container" style={{ 
      position: 'relative', 
      display: 'inline-block', 
      marginTop: '20px',
      boxShadow: '0 0 10px rgba(0,0,0,0.2)' 
    }}>
      <Document file="/sample.pdf">
        <Page pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} />
      </Document>
      {fields.map((field) => (
        <DraggableField
          key={field.id}
          field={field}
          onUpdate={(pos) => {
            setFields(fields.map(f => f.id === field.id ? { ...f, ...pos } : f));
          }}
        />
      ))}
    </div>
  );
};

export default PDFEditor;