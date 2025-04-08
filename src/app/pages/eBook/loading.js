export default function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <svg
        className="loading-div"
        width="100"
        height="100"
        viewBox="0 0 52 54"
        version="1.1"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: "rgb(260,260,260)", stopOpacity: "1" }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "rgb(220,220,220)", stopOpacity: "1" }}
            />
          </linearGradient>
        </defs>
        <g id="theWholeBook">
          <g id="bookRect">
            <rect id="bRect" x="0" y="15" width="52" height="39" ry="2" />
            <rect id="bottomBookSpine" x="3" y="51" width="46" height="3" />
          </g>
          <polygon
            fill="url(#grad1)"
            points="26 13 49.5735685 12.2915037 49.5735685 51.2915037 26 52"
            ry="2"
          />

          <polygon
            fill="url(#grad1)"
            className="last_page"
            points="26 13 49.5735685 12.2915037 49.5735685 51.2915037 26 52"
            ry="2"
          >
            <animate
              begin="0s"
              fill="freeze"
              attributeName="points"
              dur="10000ms"
              repeatCount="indefinite"
              to="26 13 44.372231 3.8589904 44.372231 42.8589904 26 52"
            />
          </polygon>

          <polygon
            fill="#D9D8D2"
            points="26 13 44.372231 3.8589904 44.372231 42.8589904 26 52"
            ry="1"
          >
            <animate
              begin="0s"
              fill="freeze"
              attributeName="points"
              dur="10000ms"
              repeatCount="indefinite"
              to="26 13 36.3883757 0.178966842 36.3883757 39.1789668 26 52"
            />

            <animate
              begin="0s"
              fill="freeze"
              attributeName="fill"
              dur="10000ms"
              repeatCount="indefinite"
              to="#EDECE6"
            />
          </polygon>

          <polygon
            fill="#EDECE6"
            points="26 13 36.3883757 0.178966842 36.3883757 39.1789668 26 52"
            ry="1"
          >
            <animate
              begin="0s"
              fill="freeze"
              attributeName="points"
              dur="10000ms"
              repeatCount="indefinite"
              to="26 13 30.3765696 0.292749915 30.3765696 39.2927499 26 52"
            />

            <animate
              begin="0s"
              fill="freeze"
              attributeName="fill"
              dur="10000ms"
              repeatCount="indefinite"
              to="#F2F1EB"
            />
          </polygon>

          <polygon
            fill="#F2F1EB"
            points="26 13 30.3765696 0.292749915 30.3765696 39.2927499 26 52"
            ry="1"
          >
            <animate
              begin="0s"
              fill="freeze"
              attributeName="points"
              dur="1300ms"
              repeatCount="indefinite"
              to="26 15 26 0.960355416 26 41.1230808 26 54"
            />

            <animate
              begin="0s"
              fill="freeze"
              attributeName="fill"
              dur="1300ms"
              repeatCount="indefinite"
              to="#F2F1EB"
            />
          </polygon>

          <polygon
            fill="#C7C6C1"
            points="26 13 26 52 2.42643155 51.2915037 2.42643155 12.2915037"
            ry="1"
          ></polygon>

          <polygon
            fill="#D9D8D2"
            points="26 13 26 52 7.62776902 42.8589904 7.62776902 3.8589904"
          >
            <animate
              begin="0s"
              fill="freeze"
              attributeName="points"
              dur="300ms"
              repeatCount="indefinite"
              to="26 13 26 52 2.42643155 51.2915037 2.42643155 12.2915037"
            />

            <animate
              begin="0s"
              fill="freeze"
              attributeName="fill"
              dur="300ms"
              repeatCount="indefinite"
              to="#C7C6C1"
            />
          </polygon>

          <polygon
            fill="#EDECE6"
            points="26 13 26 52 15.6116243 39.1789668 15.6116243 0.178966842"
            ry="1"
          >
            <animate
              begin="0s"
              fill="freeze"
              attributeName="points"
              dur="300ms"
              repeatCount="indefinite"
              to="26 13 26 52 7.62776902 42.8589904 7.62776902 3.8589904"
            />

            <animate
              begin="0s"
              fill="freeze"
              attributeName="fill"
              dur="300ms"
              repeatCount="indefinite"
              to="#D9D8D2"
            />
          </polygon>
          <polygon
            fill="#F2F1EB"
            points="26 13 26 52 21.6234304 39.2927499 21.6234304 0.292749915"
            ry="1"
          >
            <animate
              begin="0s"
              fill="freeze"
              attributeName="points"
              dur="300ms"
              repeatCount="indefinite"
              to="26 13 26 52 15.6116243 39.1789668 15.6116243 0.178966842"
            />

            <animate
              begin="0s"
              fill="freeze"
              attributeName="fill"
              dur="300ms"
              repeatCount="indefinite"
              to="#EDECE6"
            />
          </polygon>
          <polygon
            fill="#F2F1EB"
            points="26 13 26 52 25.6234304 39.2927499 25.6234304 0.292749915"
            ry="1"
          >
            <animate
              begin="0s"
              fill="freeze"
              attributeName="points"
              dur="300ms"
              repeatCount="indefinite"
              to="26 13 26 52 21.6234304 39.2927499 21.6234304 0.292749915"
            />
          </polygon>
        </g>
      </svg>
    </div>
  );
}
