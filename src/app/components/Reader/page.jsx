"use client";

import { useEffect, useRef, useState } from "react";
import { ReactReader } from "react-reader";
import { motion, AnimatePresence } from "framer-motion";
import useLocalStorageState from "use-local-storage-state";

const STORAGE_KEY = "epub-location";

export default function BookReader({ url }) {
  const [settings, setSettings] = useState(false);
  const [location, setLocation] = useLocalStorageState("persist-location", {
    defaultValue: 0,
  });
  const [fontSize, setFontSize] = useState(100);
  const [theme, setTheme] = useState("light");
  const [align, setAlign] = useState(0);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [rendition, setRendition] = useState(null);
  const [toc, setToc] = useState([]);
  const [page, setPage] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const readerRef = useRef(null);

  const isValidCfi = (cfi) => {
    return typeof cfi === "string" && cfi.startsWith("epubcfi(");
  };

  function reset() {
    setAlign(0);
    setLineHeight(1.6);
    setFontSize(100);
    setTheme("light");
  }

  useEffect(() => {
    if (rendition) {
      rendition.themes.fontSize(`${fontSize}%`);
    }
  }, [fontSize, rendition]);

  useEffect(() => {
    if (rendition) {
      rendition.display(percentage / 100);
    }
  }, [percentage]);

  useEffect(() => {
    if (rendition) updateTheme(rendition, theme);
  }, [theme]);
  useEffect(() => {
    if (rendition) updateAlign(rendition, align);
  }, [align]);
  useEffect(() => {
    if (rendition) updateLineHeight(rendition, lineHeight);
  }, [lineHeight]);

  function updateTheme(rendition, theme) {
    const themes = rendition.themes;
    switch (theme) {
      case "dark": {
        themes.override("color", "#fff");
        themes.override("background", "#000");
        break;
      }
      case "light": {
        themes.override("color", "#000");
        themes.override("background", "#fff");
        break;
      }
      case "sepia": {
        themes.override("color", "#000");
        themes.override("background", "#fecaca");
        break;
      }
    }
  }
  function updateAlign(rendition, align) {
    const themes = rendition.themes;
    switch (align) {
      case 0: {
        themes.update("custom", {
          body: {
            "text-align": "right !important",
          },
          p: {
            "text-align": "right !important",
          },
        });
        themes.select("custom");
        break;
      }
      case 1: {
        themes.register("custom", {
          body: {
            "text-align": "center !important",
          },
          p: {
            "text-align": "center !important",
          },
        });
        themes.select("custom");
        break;
      }
      case 2: {
        themes.register("custom", {
          body: {
            "text-align": "justify !important",
          },
          p: {
            "text-align": "justify !important",
          },
        });
        themes.select("custom");
        break;
      }
    }
  }
  function updateLineHeight(rendition, lineHeight) {
    const themes = rendition.themes;
    themes.register("lineheight", {
      body: {
        "line-height": lineHeight,
      },
      p: {
        "line-height": lineHeight,
      },
    });
    themes.select("lineheight");
  }

  return (
    <div className="flex flex-col h-screen container mx-auto pb-24 md:pb-0 relative">
      {/* Sidebar */}
      <motion.button
        whileHover={{
          rotateZ: 360,
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="mb-3 w-fit absolute right-4 top-4 z-50"
        onClick={() => setSettings(!settings)}
      >
        <svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
          <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
        </svg>
      </motion.button>
      <AnimatePresence initial={false}>
        {settings && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: "tween", duration: 0.3 }}
            className="!min-w-80 !min-h-96 p-4 bg-slate-900/80 z-50 absolute top-12 right-4 rounded-2xl text-white"
          >
            <motion.button
              whileHover={{
                rotateZ: 90,
              }}
              whileTap={{ rotateZ: 405 }}
              onClick={reset}
              className="absolute left-2 top-2"
              title="بازنشانی تنظیمات"
            >
              <svg
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#ffffff"
              >
                <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
              </svg>
            </motion.button>
            <div className="mt-4 basis-auto flex relative">
              <button onClick={() => setAlign(0)} className="z-10 px-2 py-1">
                <svg
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#ffffff"
                >
                  <path d="M120-760v-80h720v80H120Zm240 160v-80h480v80H360ZM120-440v-80h720v80H120Zm240 160v-80h480v80H360ZM120-120v-80h720v80H120Z" />
                </svg>
              </button>
              <button onClick={() => setAlign(1)} className="z-10 px-2 py-1">
                <svg
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#ffffff"
                >
                  <path d="M120-120v-80h720v80H120Zm160-160v-80h400v80H280ZM120-440v-80h720v80H120Zm160-160v-80h400v80H280ZM120-760v-80h720v80H120Z" />
                </svg>
              </button>
              <button onClick={() => setAlign(2)} className="z-10 px-2 py-1">
                <svg
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#ffffff"
                >
                  <path d="M120-120v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Z" />
                </svg>
              </button>
              <motion.div
                style={{
                  transform: `translateX(-${align * 2.5}rem)`,
                  transition: "transform 0.3s ease",
                }}
                className="absolute top-0 right-0 bottom-0 w-[2.5rem] bg-red-500 rounded-md z-0"
              ></motion.div>
            </div>
            {/* Font size */}
            <div className="mt-4 basis-auto">
              <label className="block text-sm mb-1">🅰 تغییر اندازه فونت</label>
              <p>{fontSize}%</p>
              <input
                type="range"
                min={80}
                max={140}
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
              />
            </div>
            <div className="mt-4 basis-auto">
              <label className="block text-sm mb-1">🅰 تغییر ارتفاع خطوط</label>
              <p>{lineHeight}</p>
              <input
                type="range"
                min={1.2}
                max={2.5}
                step={0.1}
                value={lineHeight}
                onChange={(e) => setLineHeight(parseFloat(e.target.value))}
              />
            </div>

            {/* Theme select */}
            <div className="mt-4 basis-auto">
              <div className="flex flex-nowrap gap-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setTheme("dark")}
                  className="h-10 w-10 rounded-full cursor-pointer bg-black flex justify-center items-center"
                >
                  {theme === "dark" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="32px"
                      viewBox="0 -960 960 960"
                      width="32px"
                      fill="#333333"
                    >
                      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                    </svg>
                  )}
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setTheme("light")}
                  className="h-10 w-10 rounded-full cursor-pointer bg-white flex items-center justify-center"
                >
                  {theme === "light" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="32px"
                      viewBox="0 -960 960 960"
                      width="32px"
                      fill="#dddddd"
                    >
                      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                    </svg>
                  )}
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setTheme("sepia")}
                  className="h-10 w-10 rounded-full cursor-pointer bg-red-200 flex items-center justify-center"
                >
                  {theme === "sepia" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="32px"
                      viewBox="0 -960 960 960"
                      width="32px"
                      fill="#feaaaa"
                    >
                      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                    </svg>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reader */}
      <div className="flex-1 flex flex-col" style={{ direction: "ltr" }}>
        <div className="flex-1 !rounded-lg border border-slate-300 relative">
          <ReactReader
            ref={readerRef}
            swipeable={true}
            url={url}
            location={location}
            tocChanged={(toc) => setToc(toc)}
            locationChanged={(loc) => {
              setLocation(loc);
              if (!isValidCfi(loc)) return;
              setPercentage(
                Math.ceil(rendition.book.locations.percentageFromCfi(loc) * 100)
              );

              if ((rendition, toc)) {
                const { displayed, href } = rendition.location.start;
                const chapter = toc.find((item) => item.href === href);
                setPage(
                  `صفحه ${displayed?.page} از ${displayed?.total} (بخش ${
                    chapter ? chapter.label : "نامعلوم"
                  })`
                );
              }
            }}
            epubOptions={{ flow: "paginated" }}
            getRendition={(r) => {
              setRendition(r);

              // Register themes
              r.themes.fontSize(`${fontSize}%`);

              r.book.ready.then(() => {
                r.book.locations.generate(1000).then(() => {
                  if (location) {
                    r.display(location);
                  }
                });
              });
            }}
          />
        </div>

        {/* Bottom Controls */}
        <div className="p-6 text-sm">
          <div className="text-right min-w-[120px] relative">
            <p className="absolute -top-5" style={{ left: `${percentage}%` }}>
              {percentage}%
            </p>
            <input
              type="range"
              className="w-full mx-auto block mb-6"
              style={{
                background: `linear-gradient(90deg, red ${percentage}%,#dadada ${percentage}%)`,
              }}
              min={0}
              max={100}
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
            />
            <p className="text-center">{page}</p>
            <button
              onClick={() => {
                rendition?.prev();
              }}
            >
              قبلی
            </button>
            <button
              onClick={() => {
                rendition?.next();
              }}
            >
              بعدی
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
