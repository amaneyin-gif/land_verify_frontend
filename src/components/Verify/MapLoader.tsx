// import { Loader2, Map } from 'lucide-react';

// interface MapLoaderProps {
//   isVisible: boolean;
//   message?: string;
// }

// export const MapLoader = ({ isVisible, message = "Loading map data..." }: MapLoaderProps) => {
//   if (!isVisible) return null;

//   return (
//     <div className="absolute inset-0 z-[999] flex items-center justify-center bg-background/70 backdrop-blur-sm rounded-xl">
//       <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-card border border-border shadow-lg">
//         <div className="relative">
//           <Map className="h-10 w-10 text-primary/30" />
//           <Loader2 className="absolute inset-0 h-10 w-10 animate-spin text-primary" />
//         </div>
//         <div className="text-center">
//           <p className="text-sm font-medium text-foreground">Plotting Map</p>
//           <p className="text-xs text-muted-foreground mt-1">{message}</p>
//         </div>
//       </div>
//     </div>
//   );
// };


import { Map } from "lucide-react";

interface MapLoaderProps {
  isVisible: boolean;
//   message?: string;
}

export const MapLoader = ({
  isVisible,
}: MapLoaderProps) => {
  if (!isVisible) return null;

  return (
    <>
      {/* Inline CSS for wave animation */}
      <style>
        {`
          @keyframes wave {
            0%, 100% {
              height: 6px;
              opacity: 0.4;
            }
            50% {
              height: 24px;
              opacity: 1;
            }
          }

          .animate-wave {
            animation: wave 1.2s ease-in-out infinite;
          }
        `}
      </style>

      <div className="absolute inset-0 z-[999] flex items-center justify-center bg-background/70 backdrop-blur-sm rounded-xl">
        <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-card border border-border shadow-lg w-[240px]">

          {/* Map Icon */}
          {/* <Map className="h-10 w-10 text-primary/40" /> */}

          {/* 🌊 Wave Loader */}
          <div className="flex items-end gap-1 h-6">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="w-2 rounded-full bg-primary animate-wave"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>

          {/* Text */}
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              Plotting Map
            </p>
            {/* <p className="text-xs text-muted-foreground mt-1">
              {message}
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
};
