"use client";

import {
  motion,
  type MotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type HuayraScrollCanvasProps = {
  scrollYProgress: MotionValue<number>;
  totalFrames: number;
  imageFolderPath: string;
  filePattern?: "number" | "ezgif";
  horizontalScale?: number;
  verticalScale?: number;
  topSafeArea?: number;
  bottomSafeArea?: number;
  verticalOffset?: number;
  engineVerticalOffset?: number;
  onLoadedChange?: (loaded: boolean) => void;
};

function resolveFrameSrc(
  imageFolderPath: string,
  frameNumber: number,
  filePattern: "number" | "ezgif",
) {
  if (filePattern === "ezgif") {
    return `${imageFolderPath}/ezgif-frame-${String(frameNumber).padStart(3, "0")}.jpg`;
  }

  return `${imageFolderPath}/${frameNumber}.jpg`;
}

export function HuayraScrollCanvas({
  scrollYProgress,
  totalFrames,
  imageFolderPath,
  filePattern = "number",
  horizontalScale = 1,
  verticalScale = 1,
  topSafeArea = 68,
  bottomSafeArea = 18,
  verticalOffset = 18,
  engineVerticalOffset = 0,
  onLoadedChange,
}: HuayraScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(-1);
  const sizeRef = useRef({ width: 0, height: 0 });
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1], {
    clamp: true,
  });

  const sources = useMemo(
    () =>
      Array.from({ length: totalFrames }, (_, index) =>
        resolveFrameSrc(imageFolderPath, index + 1, filePattern),
      ),
    [filePattern, imageFolderPath, totalFrames],
  );

  useEffect(() => {
    let cancelled = false;
    let completed = 0;
    imagesRef.current = new Array(totalFrames);
    setLoaded(false);
    onLoadedChange?.(false);
    setLoadProgress(0);

    sources.forEach((src, index) => {
      const image = new Image();
      image.decoding = "async";
      image.onload = () => {
        if (cancelled) {
          return;
        }
        imagesRef.current[index] = image;
        completed += 1;
        setLoadProgress(completed / totalFrames);
        if (completed === totalFrames) {
          setLoaded(true);
          onLoadedChange?.(true);
        }
      };
      image.onerror = () => {
        if (cancelled) {
          return;
        }
        completed += 1;
        setLoadProgress(completed / totalFrames);
        if (completed === totalFrames) {
          setLoaded(true);
          onLoadedChange?.(true);
        }
      };
      image.src = src;
    });

    return () => {
      cancelled = true;
    };
  }, [onLoadedChange, sources, totalFrames]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const ctx = canvas.getContext("2d");

      if (!ctx || rect.width === 0 || rect.height === 0) {
        return;
      }

      sizeRef.current = { width: rect.width, height: rect.height };
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      drawFrame(Math.max(0, currentFrameRef.current));
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    return () => observer.disconnect();
  }, []);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const image = imagesRef.current[index];
    const { width, height } = sizeRef.current;

    if (!canvas || !ctx || !width || !height) {
      return;
    }

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);

    if (!image) {
      return;
    }

    const imageRatio = image.naturalWidth / image.naturalHeight;
    const canvasRatio = width / height;
    let drawWidth = width;
    let drawHeight = height;

    if (imageRatio > canvasRatio) {
      drawHeight = width / imageRatio;
    } else {
      drawWidth = height * imageRatio;
    }

    if (drawWidth < width) {
      const widthScale = width / drawWidth;
      drawWidth *= widthScale;
      drawHeight *= widthScale;
    }

    drawWidth *= horizontalScale;
    drawHeight *= verticalScale;

    const availableHeight = Math.max(1, height - topSafeArea - bottomSafeArea);
    if (drawHeight > availableHeight) {
      const safeScale = availableHeight / drawHeight;
      drawWidth *= safeScale;
      drawHeight *= safeScale;

      if (drawWidth < width) {
        const widthScale = width / drawWidth;
        drawWidth *= widthScale;
        drawHeight *= widthScale;
      }
    }

    const x = (width - drawWidth) / 2;
    const progress = totalFrames <= 1 ? 0 : index / (totalFrames - 1);
    const engineProgress = Math.min(1, Math.max(0, (progress - 0.72) / 0.18));
    const easedEngineProgress =
      engineProgress * engineProgress * (3 - 2 * engineProgress);
    const preferredY =
      (height - drawHeight) / 2 +
      verticalOffset +
      engineVerticalOffset * easedEngineProgress;
    const maxY = height - bottomSafeArea - drawHeight;
    const clampedY =
      drawHeight > height - topSafeArea - bottomSafeArea
        ? maxY
        : Math.min(maxY, Math.max(topSafeArea, preferredY));
    const y = Number.isFinite(clampedY) ? clampedY : (height - drawHeight) / 2;
    ctx.drawImage(image, x, y, drawWidth, drawHeight);
  };

  useEffect(() => {
    const unsubscribe = frameIndex.on("change", (latest) => {
      const nextFrame = Math.round(latest);
      if (nextFrame === currentFrameRef.current) {
        return;
      }

      currentFrameRef.current = nextFrame;
      drawFrame(nextFrame);
    });

    return () => unsubscribe();
  }, [frameIndex]);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    const nextFrame = Math.round(frameIndex.get());
    currentFrameRef.current = nextFrame;
    drawFrame(nextFrame);
  }, [frameIndex, loaded]);

  return (
    <div className="absolute inset-0 z-0 bg-white">
      <canvas ref={canvasRef} className="h-full w-full" />
      {!loaded && (
        <div className="absolute inset-0 z-20 grid place-items-center bg-white">
          <div className="w-64 text-center">
            <p
              className="mb-4 text-xs font-black tracking-[0.34em] text-pagani-red"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              LOADING
            </p>
            <div className="h-px w-full bg-border-gray">
              <motion.div
                className="h-px bg-pagani-red"
                animate={{ width: `${Math.round(loadProgress * 100)}%` }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
