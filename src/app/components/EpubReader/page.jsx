"use client";

import Setting from "@/app/utils/Setting";
import Epub from "epubjs";
import { useEffect, useReducer, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import NavigateBtn from "../NavigateBtn";
import EpubHeader from "../epubHeader";
const EpubReader = ({ url }) => {
  const initialValue = {
    name: "",
    title: "",
    current: 1,
    total: 0,
    totalPage: 0,
    fontSize: 100,
    color: "#333",
    background: "#f4f4f4",
    bodyBackground: "#ececec",
    list: false,
    setting: false,
    lists: [],
    themeId: 1,
    lineHeight: 1.2,
    fullScreen: false,
    align: "rtl",
    location: 0,
  };
  const [init, setInit] = useState(initialValue);
  const viewerRef = useRef(null);
  const range = useRef();
  const bookRef = useRef(null);
  const [rendition, setRendition] = useState(null);
  const [state, dispatch] = useReducer(
    reducerFunction,
    Object.keys(init).length != 0 ? init : initialValue
  );
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("setting", JSON.stringify(state));
    }
  }, [state]);
  function reducerFunction(state, action) {
    switch (action.type) {
      case "setName": {
        return { ...state, name: action.val };
      }
      case "setTitle": {
        return { ...state, title: action.val };
      }
      case "topic": {
        return { ...state, lists: action.val };
      }
      case "changepage": {
        return { ...state, current: action.val };
      }
      case "showtotal": {
        return { ...state, total: action.val };
      }
      case "settotal": {
        return { ...state, totalPage: action.val };
      }
      case "larger":
        return { ...state, fontSize: Math.min(state.fontSize + 10, 250) };

      case "smaller":
        return { ...state, fontSize: Math.max(state.fontSize - 10, 75) };

      case "theme": {
        return {
          ...state,
          color: action.textColor,
          background: action.background,
          bodyBackground: action.bodyBackground,
          themeId: action.themeId,
        };
      }
      case "list": {
        return { ...state, list: !state.list, setting: false };
      }
      case "setting": {
        return { ...state, setting: !state.setting, list: false };
      }
      case "higher": {
        if (state.lineHeight > 5.2) return state;
        return { ...state, lineHeight: action.val };
      }
      case "lower": {
        if (state.lineHeight < 2.2) return state;
        return { ...state, lineHeight: action.val };
      }
      case "reload": {
        return initialValue;
      }
      case "fullscreen": {
        return { ...state, fullScreen: !state.fullScreen };
      }
      case "setlocation": {
        return { ...state, location: action.val };
      }
      default: {
        return state;
      }
    }
  }
  const { goNext, goPrev, setTitle, changePage, ...others } = Setting(
    dispatch,
    rendition,
    state
  );
  useEffect(() => {
    const loadbook = async () => {
      const book = Epub(url);
      bookRef.current = book;
      book.loaded.metadata.then((metadata) => {
        dispatch({
          type: "setName",
          val: metadata.title,
        });
        renditionInstance.display(state.location);
      });
      if (!viewerRef.current) {
        return;
      }
      const renditionInstance = book.renderTo(viewerRef.current, {
        width: "100%",
        height: "80vh",
        spread: "none", // غیرفعال کردن نمایش دو صفحه
      });
      setRendition(renditionInstance);
      await renditionInstance.display().then(async () => {
        renditionInstance.themes.register("default", {
          "body, p, span, div, h1, h2, h3, h4, h5, h6": {
            color: `${state.color} !important`,
            fontFamily: "BNazanin, Arial, sans-serif !important",
            direction: "rtl !important",
            textAlign: "justify !important",
            "user-select": "none",
            fontSize: `${state.fontSize} !important`,
            "line-height": `${state.lineHeight} !important`,
          },
          "h1, h2, h3, h4, h5, h6 ,p ,span,h2.l1": {
            background: "transparent !important",
            fontSize: `${state.fontSize} !important`,
            "line-height": `${state.lineHeight} !important`,
          },
          "body ,section ,div": {
            background: `${state.background} !important`,
          },
        });
        renditionInstance.themes.select("default");
        dispatch({
          type: "topic",
          val: book.navigation.toc,
        });
      });
      await book.locations.generate(2285);
      dispatch({
        type: "settotal",
        val: book.locations.total,
      });
      renditionInstance.on("locationChanged", async function (location) {
        console.log(book.locations.percentageFromCfi(location.start));
        setTitle(renditionInstance);
        dispatch({
          type: "changepage",
          val: renditionInstance.location.start.displayed.page,
        });
        // برای نمایش فصل به فصل مورد استفاده قرار میگیرد
        dispatch({
          type: "showtotal",
          val: renditionInstance.location.start.displayed.total,
        });
        dispatch({
          type: "setlocation",
          val: location.start,
        });
      });
      var startX = 0;
      var deltaX = 0;
      renditionInstance.on("touchstart", function (e) {
        e.preventDefault();
        startX = e.touches[0].clientX;
      });
      renditionInstance.on("touchmove", function (e) {
        e.preventDefault();
        const currentX = e.touches[0].clientX;
        deltaX = startX - currentX;
      });
      renditionInstance.on("touchend", function (e) {
        e.preventDefault();
        if (deltaX > 20) {
          goNext(renditionInstance);
        }
        if (deltaX < -20) {
          goPrev(renditionInstance);
        }
        deltaX = 0;
        startX = 0;
      });
    };
    loadbook();
    return () => {
      rendition?.destroy();
      bookRef.current?.destroy();
      setRendition(null);
      bookRef.current = null;
    };
  }, [url]);
  return (
    <div
      className="w-screen h-screen"
      style={{ backgroundColor: state.bodyBackground }}
    >
      <div
        className={`flex flex-col text-center h-screen max-w-6xl mx-auto ${
          state.fullScreen && "full-screen"
        }`}
      >
        <EpubHeader
          func={others}
          dispatch={dispatch}
          state={state}
          rendition={rendition}
        />
        <div className="flex items-center justify-center relative">
          {!isMobile && (
            <NavigateBtn type="next" click={() => goNext(rendition)} />
          )}
          <div
            id="viewRef"
            ref={viewerRef}
            className={`w-full mx-auto ${!isMobile ? "!px-12" : "!px-2"}`}
          />
          {!isMobile && (
            <NavigateBtn type="prev" click={() => goPrev(rendition)} />
          )}
        </div>
        <div className="p-2 w-full">
          <span style={{ color: state.color }}>
            صفحه {state?.current} از {state?.total} ({state.totalPage} کل)
          </span>{" "}
          <input
            ref={range}
            className="w-full"
            type="range"
            onChange={(e) => changePage(e.target.value)}
            value={state.current}
          />
        </div>
      </div>
    </div>
  );
};
export default EpubReader;
