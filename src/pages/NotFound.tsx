// import { useLocation } from "react-router-dom";
// import { useEffect } from "react";

// const NotFound = () => {
//   const location = useLocation();

//   useEffect(() => {
//     console.error("404 Error: User attempted to access non-existent route:", location.pathname);
//   }, [location.pathname]);

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <div className="text-center">
//         <h1 className="mb-4 text-4xl font-bold">404</h1>
//         <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
//         <a href="/" className="text-blue-500 underline hover:text-blue-700">
//           Return to Login
//         </a>
//       </div>
//     </div>
//   );
// };

// export default NotFound;


import React from "react";


type NotFoundProps = {
  header?: string;
  content?: string;
   fontSize?: string; 
};

export default function NotFound({ header, content, fontSize = "clamp(5rem, 25vmin, 20rem)"  }: NotFoundProps) {
  console.log(header, "___header");
  console.log(content, "___content");
  return (
    <>
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@800&family=Roboto:wght@100;300&display=swap');

:root {
  --button: hsl(44, 0%, 70%);
  --button-color: hsl(0, 0%, 4%);
  --shadow: hsl(0, 0%, 0%);
  --bg: hsla(142, 59%, 51%, 1.00);
  --header: hsl(53, 0%, 48%);
  --color: hsl(0, 0%, 98%);
  --lit-header: hsl(53, 0%, 90%);
  --speed: 2s;
}

.page-404 *,
.page-404 *::before,
.page-404 *::after {
  box-sizing: border-box;
  transform-style: preserve-3d;
}

@property --swing-x {
  initial-value: 0;
  inherits: false;
  syntax: '<integer>';
}

@property --swing-y {
  initial-value: 0;
  inherits: false;
  syntax: '<integer>';
}

.page-404 {
  min-height: 100vh;
  display: flex;
  font-family: 'Roboto', sans-serif;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  color: var(--color);
  perspective: 1200px;
  position: relative;
  overflow: hidden;
}

.page-404 a {
  text-transform: uppercase;
  text-decoration: none;
  background: var(--button);
  color: var(--button-color);
  padding: 1rem 4rem;
  border-radius: 4rem;
  font-size: 0.875rem;
  letter-spacing: 0.05rem;
}

.page-404 p {
  font-weight: 100;
}

.page-404 h1 {
  animation: swing var(--speed) infinite alternate ease-in-out;
  font-size:  var(--dynamic-font-size);
  font-family: 'Open Sans', sans-serif;
  margin: 0 0 1rem 0;
  letter-spacing: 1rem;
  transform: translate3d(0, 0, 0);
  --x: calc(50% + (var(--swing-x) * 0.5) * 1%);
  background: radial-gradient(var(--lit-header), var(--header) 45%) var(--x) 100% / 200% 200%;
  -webkit-background-clip: text;
  color: transparent;
  position: relative;
}

.page-404 h1::after {
  animation: swing var(--speed) infinite alternate ease-in-out;
  content: var(--header-text);
  position: absolute;
  top: 0;
  left: 0;
  color: var(--shadow);
  filter: blur(1.5vmin);
  transform: scale(1.05) translate3d(0, 12%, -10vmin)
    translate(calc((var(--swing-x, 0) * 0.05) * 1%),
              calc((var(--swing-y) * 0.05) * 1%));
}

.page-404 .cloak {
  animation: swing var(--speed) infinite alternate-reverse ease-in-out;
  height: 100%;
  width: 100%;
  transform-origin: 50% 30%;
  transform: rotate(calc(var(--swing-x) * -0.25deg));
  background: radial-gradient(40% 40% at 50% 42%, transparent, black 35%);
}

.page-404 .cloak__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
}

.page-404 .cloak__container {
  height: 250vmax;
  width: 250vmax;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.page-404 .info {
  text-align: center;
  line-height: 1.5;
  max-width: clamp(16rem, 90vmin, 25rem);
  position: relative;
  z-index: 10;
}

.page-404 .info > p {
  margin-bottom: 3rem;
}

@keyframes swing {
  0% {
    --swing-x: -100;
    --swing-y: -100;
  }
  50% {
    --swing-y: 0;
  }
  100% {
    --swing-y: -100;
    --swing-x: 100;
  }
}
      `}</style>

      <div className="page-404">
        {/* <h1>404</h1> */}
        <h1 style={
          {
            "--header-text": `"${header}"`,
             "--dynamic-font-size": fontSize
          } as React.CSSProperties
        }>{header}</h1>

        <div className="cloak__wrapper">
          <div className="cloak__container">
            <div className="cloak"></div>
          </div>
        </div>

        <div className="info">
          {/* <h2>We can't find that page</h2> */}
          <h2>{content}</h2>
          <p>
            {/* Well... That's a bummer... but it’s probably like… the internet is
                        broken or something. */}
          </p>

          <a href="/">Home</a>
        </div>
      </div>
    </>
  );
}
