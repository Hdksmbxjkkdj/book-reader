"use client";

import { useEffect, useState } from "react";
import { ReactReader } from "react-reader";
import useLocalStorageState from "use-local-storage-state";

export default function Book({ url }) {
  const [page, setPage] = useState("");
  const [rendition, setRendition] = useState();
  const [theme, setTheme] = useState("light");
  const [toc, setToc] = useState();
  const [location, setLocation] = useLocalStorageState("persist-location", {
    defaultValue: 0,
  });
  var font = 100;
  function handleLocation(loc) {
    setLocation(loc);
    const { displayed, href } = rendition.location.start;
    const chapter = toc.find((item) => (item.href = href));
    setPage(
      `صفحه ${displayed.page} از ${displayed.total} : ${ chapter ? chapter.label : "n/a"} فصل `
    );
    rendition.themes.register("transition", {
      transition: "all ease 300ms !important",
    });
    rendition.themes.select("transition");
  }
  function handleFont(type) {
    switch (type) {
      case "larger": {
        font >= 150 ? font : (font += 10);
        break;
      }
      case "smaller": {
        font <= 50 ? font : (font -= 10);
        break;
      }
    }
    rendition.themes.fontSize(font + "%");
  }
  function updateTheme(theme) {
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
    }
  }
  useEffect(() => {
    if (rendition) {
      updateTheme(theme);
    }
  }, [theme]);
  return (
    <>
      <div className="container mx-auto flex justify-between">
        <div className="flex gap-4">
          <button onClick={() => handleFont("larger")}>large</button>
          <button onClick={() => handleFont("smaller")}>small</button>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setTheme("dark")}>dark</button>
          <button onClick={() => setTheme("light")}>light</button>
        </div>
      </div>
      <div
        className={`${
          theme == "light" ? "theme-white" : "theme-black"
        } h-screen container mx-auto py-10`}
      >
        <ReactReader
          url={url}
          location={location}
          locationChanged={(loc) => handleLocation(loc)}
          tocChanged={(t) => setToc(t)}
          showToc={true}
          getRendition={(rend) => {
            setRendition(rend);
          }}
        />
      </div>
        <div className="mx-auto w-fit my-6">{page}</div>
    </>
  );
}
