import React, { useRef, useEffect } from "react";
import { fabric } from "fabric";

const Canvas: React.FC = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
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
