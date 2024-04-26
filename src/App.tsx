import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import pdfjsLib from "pdfjs-dist";
import PDFViewer from "./components/PDFViewer";
import myPdf from "./assets/myPdf.pdf";

function App() {
  // const pdfUrl = myPdf;
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (event: any) => {
    // const file = event.target.files[0];
    // setUploadedFile(file);
    // console.log("uploadedFile", uploadedFile);

    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(event: any) {
          setUploadedFile(event.target.result) as any
        };
        reader.readAsDataURL(file);
    }

    // save that file pdf to public folder
    // const pathToSave = "./public/assets/myPdf.pdf";
    // const reader = new FileReader();
    // reader.onload = (e: any) => {
    //   const buffer = e.target.result as any
    //   console.log("buffer", buffer);
    //   const pdfData = new Uint8Array(buffer);
    //   console.log("pdfData", pdfData);
    //   // save to public folder
    //   const fs = require("fs");
    //   fs.writeFile(pathToSave, pdfData, (err: any) => {
    //     if (err) {
    //       console.log("err", err);
    //     } else {
    //       console.log("pdf saved");
    //     }
    //   });
    // }
    // reader.readAsArrayBuffer(file);



  };

  function downloadPDF() {
    if (uploadedFile) {
        const element = document.createElement('a');
        element.setAttribute('href', uploadedFile);
        element.setAttribute('download', 'uploaded_file.pdf');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    } else {
        alert('No PDF file uploaded!');
    }
}
  return (
    <>
      {/* //  <PDFViewer pdfUrl={pdfUrl} />
    // </> */}
      <input type="file" onChange={handleFileChange} />
      <button onClick={downloadPDF}>Download PDF</button>
      {/* {uploadedFile && <PDFViewer file={uploadedFile} />} */}
      <div className="flex items-center justify-center border w-full bg-gray-500 py-10">
        {/* <PDFViewer file={uploadedFile} /> */}
        <div className="flex justify-center items-center h-screen w-full">
          <div className="h-[90vh] w-[90vw]">
            <iframe
              src="/node_modules/@allweb/pdfjs-dist-custom/web/viewer.html"
              width="100%"
              height="100%"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
