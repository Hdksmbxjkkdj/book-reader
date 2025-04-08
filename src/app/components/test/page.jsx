"use client";

import { useEffect, useRef, useState } from "react";
import ePub from "epubjs";

const EpubReader = ({ url }) => {
  const [totalPages, setTotalPages] = useState(0);
  const [rend, setRend] = useState();
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const range = useRef();
  const viewer = useRef(null);

  useEffect(() => {
    const loadBook = async () => {
      const book = ePub(url);
      book.loaded.manifest.then((manifest) =>
        console.log("📚 Manifest:", manifest)
      );
      book.loaded.spine.then((spine) => console.log("📚 Spine:", spine));

      const rendition = book.renderTo(viewer.current, {
        width: "100%",
        height: "75vh",
        spread: "none",
      });
      await rendition.started
      console.log("✅ Rendition Object:", rendition);
      // رندر کتاب
      await rendition
        .display(0)
        .then(() => {
          console.log("✅ Display success !");
        })
        .catch((err) => {
          console.error("❌ Error in rendering", err);
        });

        console.log(rendition.location);
      // setLoading(false);

      setRend(rendition);

      // تولید موقعیت‌ها

      // دریافت تعداد صفحات
      setTotalPages(book.locations.total);
    };
    loadBook();

    return () => {
      book?.destroy();
    };
  }, [url]);
  function next() {
    setCounter((counter) => counter + 1);
    rend && rend.next();
  }
  function back() {
    setCounter((counter) => counter - 1);
    rend && rend.prev();
  }
  function next100() {
    var i = 0;
    while (i < 100) {
      next();
      i++;
    }
  }
  function handleChange(val) {
    var cfi = rend.book.locations.cfiFromPercentage(val / 100);
    rend.display(cfi);
    setCounter(
      Math.ceil(
        rend.book.locations.percentageFromLocation(
          (val * Math.pow(totalPages, 2)) / 100
        )
      )
    );
    const percentage = val;
    range.current.style.background = `linear-gradient(to left, #ff0000 0%, #ff0000 ${percentage}%, #d3d3d3 ${percentage}%, #d3d3d3 100%)`;
  }

  return (
    <div className="w-9/12 mx-auto relative">
      {loading && (
        <div className="fixed top-0 right-0 h-screen w-screen bg-slate-100 z-50 flex items-center justify-center gap-8">
          <div className="h-5 w-5 bg-red-500 shadow-md rounded-full ball"></div>
          <div className="h-5 w-5 bg-red-500 shadow-md rounded-full ball"></div>
          <div className="h-5 w-5 bg-red-500 shadow-md rounded-full ball"></div>
        </div>
      )}
      <div ref={viewer} id="reader"></div>
      <button onClick={next}>next</button>
      <br />
      <button onClick={next100}>next 100</button>
      <br />
      <button onClick={back}>back</button>
      <p>تعداد صفحات: {totalPages}</p>
      <p>{counter}</p>
      <input
        ref={range}
        className="w-full"
        type="range"
        onChange={(e) => handleChange(e.target.value, e.target)}
      />
    </div>
  );
};

export default EpubReader;
