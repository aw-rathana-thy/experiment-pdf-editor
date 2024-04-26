import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
// import viewerPdf from "pdfjs-dist-custom/web";
pdfjsLib.GlobalWorkerOptions.workerSrc = "./build/pdf.worker.mjs";
import "./Canvas.css";
function PDFViewer({ pdfUrl }: any) {
  // const canvasRef = useRef(null);
  //   const [canvasState, setCanvas] = useState(null) as any;
  useEffect(() => {
    const loadPDF = async () => {
      try {
        // Load the PDF from the URL
        const staticPdfUrl = "./test.pdf";
        // const staticPdfUrl = "./form1.pdf";
        const pdf = await pdfjsLib.getDocument(staticPdfUrl).promise;

        const numPages = pdf.numPages;
        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 4 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          } as any;

          const pdfPreview = document.getElementById("pdf-preview");
          pdfPreview?.appendChild(canvas);

          // Render the PDF page onto the canvas
          await page.render(renderContext).promise;
        }
      } catch (error) {
        console.error("Error rendering PDF:", error);
      }
    };

    loadPDF();
  }, []);


  return (
    <div>

      <div id="pdf-preview" className="flex flex-col items-center gap-2"></div>
    </div>
  );
}

export default PDFViewer;

// function PdfEditorWithAddImageAndAddText() {
//     const [image, setImage] = useState(null);
//     const [text, setText] = useState("");
//     const [pdf, setPdf] = useState(null);

//     const handleImageChange = (e: any) => {
//         const file = e.target.files[0];
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             setImage(reader.result);
//         };
//         reader.readAsDataURL(file);
//     };

//     const handleTextChange = (e: any) => {
//         setText(e.target.value);
//     };

//     const handleAddImage = () => {
//         const imageElement = document.createElement("img");
//         imageElement.src = image;
//         imageElement.style.width = "100px";
//         imageElement.style.height = "100px";
//         const pdfPreview = document.getElementById("pdf-preview");
//         pdfPreview?.appendChild(imageElement);
//     };

//     const handleAddText = () => {
//         const textElement = document.createElement("p");
//         textElement.innerText = text;
//         const pdfPreview = document.getElementById("pdf-preview");
//         pdfPreview?.appendChild(textElement);
//     };

//     const handleSave = () => {
//         const pdfPreview = document.getElementById("pdf-preview");
//         const pdf = new jsPDF();
//         const pdfData = pdfPreview?.innerHTML;
//         pdf.fromHTML(pdfData);
//         setPdf(pdf);
//     };

//     return (
//         <div>
//             <PDFViewer pdfUrl="./test.pdf" />
//             <input type="file" onChange={handleImageChange} />
//             <button onClick={handleAddImage}>Add Image</button>
//             <input type="text" value={text} onChange={handleTextChange} />
//             <button onClick={handleAddText}>Add Text</button>
//             <button onClick={handleSave}>Save</button>
//         </div>
//     );


// }