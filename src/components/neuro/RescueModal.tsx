import { useEffect, useRef, useState } from 'react';
import type { Language } from '../../lib/language';

type Props = {
  isOpen: boolean;
  language?: Language;
  onComplete: () => void;
  onClose: () => void;
};

export function RescueModal({ isOpen, language = 'рус', onComplete, onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const copy = language === 'eng' ? en : ru;

  useEffect(() => {
    if (!isOpen) return;
    setSecondsLeft(60);
    prepareCanvas(canvasRef.current);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (secondsLeft === 0) {
      onComplete();
      return;
    }
    const timerId = window.setTimeout(() => setSecondsLeft((value) => value - 1), 1000);
    return () => window.clearTimeout(timerId);
  }, [isOpen, onComplete, secondsLeft]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <section className="rescue-modal">
        <header className="modal-header">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2>{copy.title}</h2>
          </div>
          <button className="icon-button" onClick={onClose} type="button">×</button>
        </header>
        <p className="task-text">
          {copy.task}
        </p>
        <div className="timer">{secondsLeft} {copy.seconds}</div>
        <canvas
          className="drawing-canvas"
          height="320"
          onPointerDown={(event) => startDrawing(event, canvasRef, drawingRef)}
          onPointerLeave={() => stopDrawing(drawingRef)}
          onPointerMove={(event) => draw(event, canvasRef, drawingRef)}
          onPointerUp={() => stopDrawing(drawingRef)}
          ref={canvasRef}
          width="640"
        />
        <button className="primary-action" onClick={onComplete} type="button">
          {copy.done}
        </button>
      </section>
    </div>
  );
}

function prepareCanvas(canvas: HTMLCanvasElement | null) {
  if (!canvas) return;
  const context = canvas.getContext('2d');
  if (!context) return;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.lineCap = 'round';
  context.lineJoin = 'round';
  context.lineWidth = 5;
  context.strokeStyle = '#38bdf8';
}

function startDrawing(
  event: React.PointerEvent<HTMLCanvasElement>,
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  drawingRef: React.MutableRefObject<boolean>,
) {
  drawingRef.current = true;
  const point = getCanvasPoint(event, canvasRef.current);
  const context = canvasRef.current?.getContext('2d');
  context?.beginPath();
  context?.moveTo(point.x, point.y);
}

function draw(
  event: React.PointerEvent<HTMLCanvasElement>,
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  drawingRef: React.MutableRefObject<boolean>,
) {
  if (!drawingRef.current) return;
  const point = getCanvasPoint(event, canvasRef.current);
  const context = canvasRef.current?.getContext('2d');
  context?.lineTo(point.x, point.y);
  context?.stroke();
}

function stopDrawing(drawingRef: React.MutableRefObject<boolean>) {
  drawingRef.current = false;
}

function getCanvasPoint(event: React.PointerEvent<HTMLCanvasElement>, canvas: HTMLCanvasElement | null) {
  if (!canvas) return { x: 0, y: 0 };
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * canvas.width,
    y: ((event.clientY - rect.top) / rect.height) * canvas.height,
  };
}

const en = {
  done: 'Done',
  eyebrow: 'Activating the motor cortex',
  seconds: 'sec',
  task: 'Draw an object in front of you without lifting your finger.',
  title: 'Blind contour',
};

const ru = {
  done: 'Готово',
  eyebrow: 'Активируем моторную кору',
  seconds: 'сек',
  task: 'Нарисуй предмет перед собой, не отрывая пальца.',
  title: 'Слепой контур',
};
