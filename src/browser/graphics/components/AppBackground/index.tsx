import React from 'react';
import { useEffect, useRef } from 'react';

export type RectPath = {
  x: number;
  y: number;
  w: number;
  h: number;
}

type AppBackgroundProps = {
  backgroundImage: string;
  width: number;
  height: number;
  clipPath?: RectPath[];
}

export const AppBackground = ({ backgroundImage, width, height, clipPath }: AppBackgroundProps) => {
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {

      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) {
        return;
      }

      ctx.globalCompositeOperation = 'xor';
      clipPath?.forEach(path => {
        ctx.fillRect(path.x, path.y, path.w, path.h);
      });

      const background = new Image();
      background.onload = () => {
        ctx.drawImage(background, 0, 0, width, height);
      }
      background.src = backgroundImage;
    }

  }, [backgroundImage, canvasRef, height, width])

  return (
    <canvas width={width} height={height} style={{
      position: 'fixed'
    }} ref={canvasRef} />
  )
}