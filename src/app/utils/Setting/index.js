export default function Setting(dispatch, rendition, state) {
  function changefontSize(size) {
    let varibale;
    if (size === "larger") {
      varibale = state.fontSize + 10;
    } else if (size === "smaller") {
      varibale = state.fontSize - 10;
    }
    dispatch({
      type: size,
      val: varibale,
    });
    rendition.themes.fontSize(varibale + "%");
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
  function handleLineHeight(status) {
    let line;
    if (status === "higher") {
      line = state.lineHeight + 1;
    } else if (status === "lower") {
      line = state.lineHeight - 1;
    }
    rendition.themes.register("lineHeight", {
      "h1, h2, h3, h4, h5, h6, p, span, h2.l1": {
        "line-height": `${line} !important`,
      },
    });
    rendition.themes.select("lineHeight");
    dispatch({
      type: status,
      val: line,
    });
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
  function setTitle(rend) {
    const title = rend.book.navigation.toc.find(
      (item) => item.href == rend.location.start.href
    );
    dispatch({
      type: "setTitle",
      val: title?.label,
    });
  }
  const goNext = (rendition=rendition) => {
    rendition.next();
  };
  const changePage = (val)=> {
    var cfi = rendition.book.locations.cfiFromPercentage(val/100);
    rendition.display(cfi)
  }
  const goPrev = (rendition=rendition) => rendition && rendition.prev();
  return {
    changefontSize,
    changeTheme,
    handleAlign,
    handleFullscreen,
    handleLineHeight,
    handleList,
    handleSetting,
    goNext,
    goPrev,
    setTitle,
    changePage
  };
}
