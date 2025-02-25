export default function Setting(dispatch, rendition, state) {
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
  const goNext = () => rendition && rendition.next();
  const goPrev = () => rendition && rendition.prev();
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
  };
}
