import Image from "next/image";
import Link from "next/link";

export default function EpubHeader({ state, rendition, func }) {
  const {
    changeTheme,
    changefontSize,
    handleAlign,
    handleFullscreen,
    handleLineHeight,
    handleList,
    handleSetting,
  } = func;
  return (
    <>
      <div className="flex justify-between items-center p-2 relative">
      <div
              className={`absolute top-full z-50 lg:left-0 right- border border-slate-300 cursor-default rounded-sm w-72 h-96 overflow-auto ${
                state?.list ? "block" : "hidden"
              }`}
              style={{ backgroundColor: state?.background }}
            >
              <ul className="flex flex-col">
                {state?.lists?.map((item, i) => {
                  return (
                    <li
                      key={item?.id}
                      className={`text-right border-b px-4 py-3 overflow-hidden hover:bg-gray-200/50 cursor-pointer ${state.location ==item.href && 'bg-gray-200/50'}`}
                      onClick={() => rendition.display(item?.href)}
                    >
                      <span
                        className="text-nowrap text-xs"
                        style={{ color: state?.color }}
                      >
                        {i + 1} .{item?.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
        <Link href="/" className="hidden lg:block"><Image
          src="/logo.png"
          alt="logo"
          width={64}
          height={64}
          style={{filter:"drop-shadow(0 0 .3px #0067b6) !important"}}
        /></Link>
        <button className="lg:hidden" onClick={handleList}>
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
          {state.name} {state.title && ` : ${state.title}`}
        </h1>
        <div className="relative flex gap-6">
          <button
            className="flex-col items-center hidden lg:flex relative"
            onClick={handleList}
            title="فهرست مطالب"
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
          </button>
          <button
            className="flex flex-col items-center"
            onClick={handleSetting}
            title="تنظیمات"
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
            <div className={`${state?.setting ? "block" : "hidden"} menu`}>
              <div className="flex gap-5 p-4">
                <div
                  onClick={() => changeTheme("white", "black", "#ececec", 1)}
                  className={`bg-white text-black selectTheme ${
                    state?.themeId == 1 ? "active" : ""
                  }`}
                >
                  آ
                </div>
                <div
                  onClick={() => changeTheme("#f6efde ", "black", "#f2e5cb", 2)}
                  className={`bg-amber-100 text-black selectTheme ${
                    state?.themeId == 2 ? "active" : ""
                  }`}
                >
                  آ
                </div>
                <div
                  onClick={() => changeTheme("#484848 ", "white", "#484848", 3)}
                  className={`bg-emerald-800 text-white selectTheme ${
                    state?.themeId == 3 ? "active" : ""
                  }`}
                >
                  آ
                </div>
                <div
                  onClick={() => changeTheme("#121212", "white", "black", 4)}
                  className={`bg-black text-white selectTheme ${
                    state?.themeId == 4 ? "active" : ""
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
                <div className="typographySettings" onClick={handleFullscreen}>
                  {state?.fullScreen ? (
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
          <Link href={"/"} className="relative" title="بازگشت به خانه">
            <svg
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
