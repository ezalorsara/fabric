import React, { useRef, useEffect } from "react";
import { fabric } from "fabric";
import { PDFDocument } from "pdf-lib";

const Canvas: React.FC = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const doPdf = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText("You can create PDFs!");
    const pdfBytes = await pdfDoc.save();
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
      <canvas id="canvas" width={500} height={500} />
    </div>
  );
};

export default Canvas;
