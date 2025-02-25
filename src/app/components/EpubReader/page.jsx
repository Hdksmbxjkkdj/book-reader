"use client";

import Epub from "epubjs";
import Image from "next/image";
import { useEffect, useReducer, useRef, useState } from "react";

const EpubReader = ({ url }) => {
  const initialValue = {
    title: "",
    current: 1,
    total: 0,
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
  };
  const viewerRef = useRef(null);
  const [rendition, setRendition] = useState(null);
  const [state, dispatch] = useReducer(reducerFunction, initialValue);
  function reducerFunction(state, action) {
    switch (action.type) {
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
      case "larger": {
        if (state.fontSize > 250) return state;
        return { ...state, fontSize: action.val };
      }
      case "smaller": {
        if (state.fontSize < 75) return state;
        return { ...state, fontSize: action.val };
      }
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
        return { ...state, lineHeight: state.lineHeight + 1 };
      }
      case "lower": {
        if (state.lineHeight < 2.2) return state;
        return { ...state, lineHeight: state.lineHeight - 1 };
      }
      case "reload": {
        return initialValue;
      }
      case "fullscreen": {
        return { ...state, fullScreen: !state.fullScreen };
      }
      default: {
        return state;
      }
    }
  }

  useEffect(() => {
    const book = Epub(url);
    book.loaded.metadata.then((metadata) => {
      dispatch({
        type: "setTitle",
        val: metadata.title,
      });
    });
    const renditionInstance = book.renderTo(viewerRef.current, {
      width: "100%",
      height: "80vh",
    });

    renditionInstance.display().then(() => {
      renditionInstance.themes.register("default", {
        "body, p, span, div, h1, h2, h3, h4, h5, h6": {
          color: "#000000 !important",
          fontFamily: "BNazanin, Arial, sans-serif !important",
          direction: "rtl !important",
          textAlign: "justify !important",
        },
        "h1, h2, h3, h4, h5, h6 ,p ,span,h2.l1": {
          background: "transparent !important",
        },
        "body ,section ,div": {
          background: "#ffffff",
        },
      });
      renditionInstance.themes.select("default");
      dispatch({
        type: "topic",
        val: book.navigation.toc,
      });
      dispatch({
        type: "showtotal",
        val: book.locations.total,
      });
    });
    setRendition(renditionInstance);
    return () => {
      book.destroy();
    };
  }, [url]);

  const goNext = () => rendition && rendition.next();
  const goPrev = () => rendition && rendition.prev();

  function changefontSize(size) {
    dispatch({
      type: size,
      val: size === "larger" ? state.fontSize + 10 : state.fontSize - 10,
    });
    rendition.themes.fontSize(state.fontSize + "%");
  }
  function changeTheme(background, textColor, bodyBackground, themeId) {
    dispatch({
      type: "theme",
      textColor: textColor,
      background: background,
      bodyBackground: bodyBackground,
      themeId: themeId,
    });
    rendition.themes.register("customTheme", {
      "body ,p ,h1 ,h2 ,h3 ,h4 ,h5 ,h6 ,span": {
        color: `${textColor} !important`,
      },
      "body ,section ,div": {
        background: `${background} !important`,
      },
    });
    rendition.themes.select("customTheme");
  }
  function handleSetting() {
    dispatch({
      type: "setting",
    });
  }
  function handleList() {
    dispatch({
      type: "list",
    });
  }
  function setLineHeight() {
    rendition.themes.register("lineHeight", {
      "h1, h2, h3, h4, h5, h6, p, span, h2.l1": {
        "line-height": `${state.lineHeight} !important`,
      },
    });
    rendition.themes.select("lineHeight");
  }
  function handleLineHeight(status) {
    dispatch({
      type: status,
    });
    setLineHeight();
  }
  function handleAlign(type) {
    rendition.themes.register("align", {
      "body,p,h1,h2,h3,h4,h5,h6,span": {
        "text-align": type,
      },
    });
    rendition.themes.select("align");
  }
  function handleFullscreen() {
    dispatch({
      type: "fullscreen",
    });
  }
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
        <div className="flex justify-between items-center p-2">
          <Image
            src="/logo.png"
            alt="logo"
            width={64}
            height={64}
            className="hidden lg:block"
          />
          <button className="lg:hidden">
            <svg
              height="24px"
              viewBox="0 -960 960 960"
              width="18px"
              fill="#5f6368"
            >
              <path d="M160-200v-80h400v80H160Zm0-160v-80h640v80H160Zm0-160v-80h640v80H160Zm0-160v-80h640v80H160Z" />
            </svg>
          </button>
          <h1 className="text-gray-500 text-xl font-semibold basis-2/3 overflow-hidden text-nowrap">
            {state?.title}
          </h1>
          <div className="relative flex gap-6">
            <button
              className="flex-col items-center hidden lg:flex relative"
              onClick={handleList}
            >
              <svg
                height="24px"
                viewBox="0 -960 960 960"
                width="18px"
                fill="#5f6368"
              >
                <path d="M160-200v-80h400v80H160Zm0-160v-80h640v80H160Zm0-160v-80h640v80H160Zm0-160v-80h640v80H160Z" />
              </svg>
              <span className="text-gray-500 text-sm font-semibold">فهرست</span>
              <div
                className={`absolute top-full z-50 right-0 border border-slate-300 cursor-default rounded-sm w-72 h-96 overflow-auto ${
                  state.list ? "block" : "hidden"
                }`}
                style={{ backgroundColor: state.background }}
              >
                <ul className="flex flex-col">
                  {state.lists.map((item, i) => {
                    return (
                      <li
                        key={item?.id}
                        className="text-right border-b px-4 py-3 overflow-hidden hover:bg-gray-200 cursor-pointer"
                        onClick={() => rendition.display(item?.href)}
                      >
                        <span className="text-nowrap text-xs">
                          {i + 1} .{item?.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </button>
            <button
              className="flex flex-col items-center"
              onClick={handleSetting}
            >
              <svg
                height="24px"
                viewBox="0 -960 960 960"
                width="18px"
                fill="#64748b"
              >
                <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
              </svg>
              <span className="text-gray-500 text-sm font-semibold hidden lg:block">
                تنظیمات
              </span>
            </button>
            <button className="relative">
              <svg
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
              >
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
              </svg>
              <div className={`${state.setting ? "block" : "hidden"} menu`}>
                <div className="flex gap-5 p-4">
                  <div
                    onClick={() => changeTheme("white", "black", "#ececec", 1)}
                    className={`bg-white text-black selectTheme ${
                      state.themeId == 1 ? "active" : ""
                    }`}
                  >
                    آ
                  </div>
                  <div
                    onClick={() =>
                      changeTheme("#f6efde ", "black", "#f2e5cb", 2)
                    }
                    className={`bg-amber-100 text-black selectTheme ${
                      state.themeId == 2 ? "active" : ""
                    }`}
                  >
                    آ
                  </div>
                  <div
                    onClick={() =>
                      changeTheme("#484848 ", "white", "#484848", 3)
                    }
                    className={`bg-emerald-800 text-white selectTheme ${
                      state.themeId == 3 ? "active" : ""
                    }`}
                  >
                    آ
                  </div>
                  <div
                    onClick={() => changeTheme("#121212", "white", "black", 4)}
                    className={`bg-black text-white selectTheme ${
                      state.themeId == 4 ? "active" : ""
                    }`}
                  >
                    آ
                  </div>
                </div>
                <div className="flex h-16">
                  <div
                    className="typographySettings text-slate-500 text-2xl"
                    onClick={() => changefontSize("larger")}
                  >
                    الف
                  </div>
                  <div
                    className="typographySettings text-slate-500"
                    onClick={() => changefontSize("smaller")}
                  >
                    الف
                  </div>
                  <div className="typographySettings">
                    <svg
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#64748b"
                    >
                      <path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440h80q0 117 81.5 198.5T480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720h-6l62 62-56 58-160-160 160-160 56 58-62 62h6q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Z" />
                    </svg>
                  </div>
                  <div
                    className="typographySettings"
                    onClick={() => handleLineHeight("higher")}
                  >
                    <svg
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#5f6368"
                    >
                      <path d="M240-160 80-320l56-56 64 62v-332l-64 62-56-56 160-160 160 160-56 56-64-62v332l64-62 56 56-160 160Zm240-40v-80h400v80H480Zm0-240v-80h400v80H480Zm0-240v-80h400v80H480Z" />
                    </svg>
                  </div>
                  <div
                    className="typographySettings"
                    onClick={() => handleLineHeight("lower")}
                  >
                    <svg
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#64748b"
                    >
                      <path d="M440-80v-168l-64 64-56-56 160-160 160 160-56 56-64-64v168h-80ZM160-440v-80h640v80H160Zm320-120L320-720l56-56 64 64v-168h80v168l64-64 56 56-160 160Z" />
                    </svg>
                  </div>
                </div>
                <div className="flex h-16">
                  <div
                    className="typographySettings"
                    onClick={() => handleAlign("right")}
                  >
                    <svg
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#64748b"
                    >
                      <path d="M120-760v-80h720v80H120Zm240 160v-80h480v80H360ZM120-440v-80h720v80H120Zm240 160v-80h480v80H360ZM120-120v-80h720v80H120Z" />
                    </svg>
                  </div>
                  <div
                    className="typographySettings"
                    onClick={() => handleAlign("justify")}
                  >
                    <svg
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#64748b"
                    >
                      <path d="M120-120v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Z" />
                    </svg>
                  </div>
                  <div
                    className="typographySettings"
                    onClick={handleFullscreen}
                  >
                    {state.fullScreen ? (
                      <svg
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#5f6368"
                      >
                        <path d="M240-120v-120H120v-80h200v200h-80Zm400 0v-200h200v80H720v120h-80ZM120-640v-80h120v-120h80v200H120Zm520 0v-200h80v120h120v80H640Z" />
                      </svg>
                    ) : (
                      <svg
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#64748b"
                      >
                        <path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center relative">
          <button
            className="text-2xl absolute h-full top-0 !right-0"
            onClick={goNext}
            title="بعدی"
          >
            <svg
              height="36px"
              viewBox="0 -960 960 960"
              width="36px"
              fill="#444444"
            >
              <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
            </svg>
          </button>
          <div ref={viewerRef} className="w-full mx-auto !px-12" />
          <button
            className="text-2xl absolute h-full top-0 !left-0"
            onClick={goPrev}
            title="قبلی"
          >
            <svg
              height="36px"
              viewBox="0 -960 960 960"
              width="36px"
              fill="#444444"
            >
              <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
            </svg>
          </button>
        </div>
        <div className="p-2 w-full">
          <span style={{ color: state.color }}>
            {state?.current} از {state?.total}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EpubReader;
