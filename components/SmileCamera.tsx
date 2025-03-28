import { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { useUSDC } from '@/hooks/useUSDC';

export function SmileCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [smileScore, setSmileScore] = useState(0);
  const { transferUSDC, isConnected } = useUSDC();

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceExpressionNet.loadFromUri('/models'),
        ]);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading face-api models:', error);
      }
    };

    loadModels();
  }, []);

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current || isLoading) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.play();
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    startCamera();

    const detectSmile = async () => {
      if (!context || !video.videoWidth) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detections.length > 0) {
        const smileProbability = detections[0].expressions.happy;
        setSmileScore(smileProbability);

        // If smile score is high enough and wallet is connected, reward USDC
        if (smileProbability > 0.7 && isConnected) {
          transferUSDC(process.env.NEXT_PUBLIC_REWARD_ADDRESS!, 0.001);
        }
      }
    };

    const interval = setInterval(detectSmile, 100);

    return () => {
      clearInterval(interval);
      if (video.srcObject) {
        const tracks = (video.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [isLoading, isConnected, transferUSDC]);

  if (isLoading) {
    return <div>Loading face detection models...</div>;
  }

  return (
    <div className="relative">
      <video
        ref={videoRef}
        className="rounded-lg"
        autoPlay
        playsInline
        muted
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0"
        style={{ display: 'none' }}
      />
      <div className="absolute bottom-4 left-4 bg-black/50 text-white px-4 py-2 rounded-lg">
        Smile Score: {(smileScore * 100).toFixed(1)}%
      </div>
    </div>
  );
} 