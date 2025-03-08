
export default function NavigateBtn({ type,click }) {
  switch (type) {
    case "next": {
      return (
        <button
          className="text-2xl absolute h-full top-0 !right-0 group"
          onClick={click}
          title="بعدی"
        >
          <svg
            className="group-hover:!fill-slate-950 transition-all duration-300"
            height="36px"
            viewBox="0 -960 960 960"
            width="36px"
            fill="#444444"
          >
            <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
          </svg>
        </button>
      );
    }
    case "prev": {
      return (
        <button
          className="text-2xl absolute h-full top-0 !left-0 group"
          onClick={click}
          title="قبلی"
        >
          <svg
            className="group-hover:!fill-slate-950 transition-all duration-300"
            height="36px"
            viewBox="0 -960 960 960"
            width="36px"
            fill="#666"
          >
            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
          </svg>
        </button>
      );
    }
  }
}
