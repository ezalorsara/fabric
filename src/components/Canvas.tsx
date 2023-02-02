import React, { useRef, useEffect, useState } from "react";
import { fabric } from "fabric";
import { PDFDocument } from "pdf-lib";
import { Document, Page, pdfjs } from "react-pdf";
import * as htmlToImage from "html-to-image";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Canvas: React.FC = () => {
  const [base64, setBase64] = useState("");
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);
  const doPdf = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText("You can create PDFs!");
    const pdfBytes = await pdfDoc.saveAsBase64({ dataUri: true });
    console.log("pdfBytes: ", pdfBytes);
    setBase64(pdfBytes);
    console.log(pdfBytes);
  };
  useEffect(() => {
    doPdf();
    const canvas = new fabric.Canvas("canvas", {
      width: 500,
      height: 500,
    });

    const rect = new fabric.Rect({
      top: 100,
      left: 100,
      width: 50,
      height: 50,
      fill: "red",
    });
    canvas.add(rect);
    canvas.renderAll();
    if (!!canvasRef?.current) {
      canvasRef.current = canvas;
    }
  }, []);

  return (
    <div>
      <div ref={divRef}>
        <canvas id="canvas" width={500} height={500} />
      </div>
      {!!base64 && (
        <Document
          file={base64}
          onLoadSuccess={async () => {
            if (divRef.current) {
              const dataUrl = await htmlToImage.toPng(divRef.current, {
                quality: 1,
              });
            }
          }}
        >
          <Page pageNumber={1} />
        </Document>
      )}
      <button onClick={() => {}}>download</button>
    </div>
  );
};

export default Canvas;
