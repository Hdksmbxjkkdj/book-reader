"use client";
import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

const Waveform = ({ url }) => {
  const waveformRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [waver, setWaver] = useState();

  useEffect(() => {
    // مقداردهی اولیه Wavesurfer
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#4F4A85",
      progressColor: "#383351",
      height: 100,
      responsive: true,
      renderFunction: (channels, ctx) => {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        // رسم یک خط ساده
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.strokeStyle = "#dadada"; // رنگ خط
        ctx.lineWidth = 2; // ضخامت خط
        ctx.stroke();
      },
    });

    setWaver(wavesurfer);

    // بارگذاری فایل صوتی
    wavesurfer.load(url);

    // رویداد پخش
    wavesurfer.on("play", () => setIsPlaying(true));
    wavesurfer.on("pause", () => setIsPlaying(false));

    // تمیزکاری (cleanup) هنگام unmount
    return () => {
      wavesurfer.destroy();
    };
  }, [url]);

  const handlePlayPause = () => {
    if (isPlaying) {
      waver.pause();
    } else if (!isPlaying) {
      waver.play();
    }
  };

  return (
    <div className="w-9/12 mx-auto my-6 bg-cyan-500 rounded-md px-5 py-3">
      <div ref={waveformRef} id="waveform" className="cursor-pointer" />
      <button className="block mx-auto" onClick={handlePlayPause}>{isPlaying ? "توقف" : "پخش"}</button>
    </div>
  );
};

export default Waveform;
