"use client";
import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

const Waveform = ({ url }) => {
  const waveformRef = useRef(null);
  const player = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [waver, setWaver] = useState();
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const data = {
    episode: "1",
    name: "تست",
    auther: "علی اصغر هنرمند",
  };

  useEffect(() => {
    const load = async () => {
      // مقداردهی اولیه Wavesurfer
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#4F4A85",
        progressColor: "#383351",
        height: 100,
        responsive: true,
        dragToSeek: true,
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
      const promise = new Promise(function (resolve, reject) {
        wavesurfer.on("ready", (dur) => {
          const sec = dur.toFixed(0);
          resolve(sec);
        });
      });
      promise
        .then((res) => {
          TimeLine(res);
          wavesurfer.on("timeupdate", (cur) => {
            const sec = res - cur.toFixed(0);
            TimeLine(sec);
          });
        })
        .catch((err) => {
          console.log(err);
        });
      setWaver(wavesurfer);

      // بارگذاری فایل صوتی
      wavesurfer.load(url);

      // رویداد پخش
      wavesurfer.on("play", () => setIsPlaying(true));
      wavesurfer.on("pause", () => setIsPlaying(false));
    };
    load();
    return () => {
      load.wavesurfer.distroy();
    };
  }, [url]);

  function TimeLine(sec) {
    const h = Math.floor(sec / 3600);
    const m = Math.floor(sec / 60 - (h * 3600) / 60);
    const s = sec - m * 60 - h * 3600;
    setDuration(`${s} : ${m < 10 ? "0" + m : m} : ${h < 10 ? "0" + h : h}`);
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      waver.pause();
    } else if (!isPlaying) {
      waver.play();
    }
  };
  function handleClose() {
    isPlaying && waver.pause();
    if (player.current) player.current.style.display = "none";
  }
  function handleSpeed() {
    if (speed < 2) {
      var s = speed + 0.5;
      setSpeed(s);
      waver.setPlaybackRate(s, true);
    } else {
      var s = 0.5;
      setSpeed(s);
      waver.setPlaybackRate(s, true);
    }
  }

  return (
    <div
      ref={player}
      className=" bg-white w-9/12 mx-auto my-6 shadow-lg shadow-gray-300 rounded-md px-5 py-3"
    >
      <button>
        <span className="text-3xl text-slate-700" onClick={handleClose}>
          &times;
        </span>
      </button>
      <div ref={waveformRef} id="waveform" className="cursor-pointer" />
      <div className="flex items-center justify-between">
        <span className="text-slate-700">مدت زمان : {duration}</span>
        <div className="flex gap-1 text-slate-700">
          <p className="text-xl font-semibold"> فصل {data.episode}</p>
          <p>|</p>
          <p className="text-xl font-semibold">{data.name}</p>
          <p>|</p>
          <p className="text-xl font-semibold">با صدای {data.auther}</p>
        </div>
        <div className="flex gap-6">
          <button
            className="text-slate-700 text-xl font-semibold"
            onClick={handleSpeed}
          >
            &times;{speed}
          </button>
          <button
            className=" h-12 w-12 rounded-full bg-blue-950 flex items-center justify-center"
            onClick={handlePlayPause}
          >
            {isPlaying ? (
              <svg
                height="32px"
                viewBox="0 -960 960 960"
                width="32px"
                fill="#ddd"
              >
                <path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z" />
              </svg>
            ) : (
              <svg
                height="32px"
                viewBox="0 -960 960 960"
                width="32px"
                fill="#ddd"
              >
                <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Waveform;
