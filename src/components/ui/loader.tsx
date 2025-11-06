// const Loader = () => (
//   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//     <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
//   </div>
// );

// export { Loader };

// const Loader: React.FC = () => (
//   <div className="loader-overlay">
//     <span className="loader"></span>
//     <p className="loader-text">Loading, please wait...</p>

//     <style jsx>{`
//       .loader-overlay {
//         position: fixed;
//         top: 0;
//         left: 0;
//         width: 100%;
//         height: 100%;
//         background-color: rgba(0, 0, 0, 0.4);
//         display: flex;
//         flex-direction: column;
//         justify-content: center;
//         align-items: center;
//         z-index: 50;
//       }

//       .loader {
//         width: 48px;
//         height: 48px;
//         border-radius: 50%;
//         display: inline-block;
//         border-top: 3px solid #fff;
//         border-right: 3px solid transparent;
//         box-sizing: border-box;
//         animation: rotation 1s linear infinite;
//       }

//       @keyframes rotation {
//         0% {
//           transform: rotate(0deg);
//         }
//         100% {
//           transform: rotate(360deg);
//         }
//       }

//       .loader-text {
//         margin-top: 16px;
//         color: #fff;
//         font-weight: 500;
//         font-size: 16px;
//       }
//     `}</style>
//   </div>
// );


// export {Loader};


import React from 'react';
import './loader.css';

const Loader: React.FC = () => (
  <div className="loader-overlay">
    <span className="loader"></span>
    <p className="loader-text">Loading, please wait...</p>
  </div>
);

export { Loader };

