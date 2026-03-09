// import { cn } from "@/lib/utils";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { useRef, useState, useEffect } from "react";

// type Props = {
//   children: React.ReactNode;
//   minWidth?: string;
//   className?: string;
// };

// export const ScrollableTable = ({
//   children,
//   minWidth = "1100px",
//   className,
// }: Props) => {
//   const viewportRef = useRef<HTMLDivElement>(null);
//   const [showLeft, setShowLeft] = useState(false);
//   const [showRight, setShowRight] = useState(false);

//   const updateArrows = () => {
//     const el = viewportRef.current;
//     if (!el) return;

//     setShowLeft(el.scrollLeft > 10);
//     setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
//   };

//   useEffect(() => {
//     updateArrows();
//   }, []);

//   return (
//     <div className={cn("relative border rounded-md bg-background", className)}>
//       {showLeft && (
//         <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 z-20">
//           <ChevronLeft className="h-8 w-8 text-muted-foreground opacity-70" />
//         </div>
//       )}

//       {showRight && (
//         <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 z-20">
//           <ChevronRight className="h-8 w-8 text-muted-foreground opacity-70" />
//         </div>
//       )}

//       {/* ONLY horizontal scroll here */}
//       <div
//         ref={viewportRef}
//         onScroll={updateArrows}
//         className="overflow-x-auto"
//       >
//         <div className="min-w-[1100px] px-1">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };


import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

type Props = {
  children: React.ReactNode;
  minWidth?: string;
  className?: string;
};

export const ScrollableTable = ({
  children,
  minWidth = "1100px",
  className,
}: Props) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const updateArrows = () => {
    const el = viewportRef.current;
    if (!el) return;

    const hasOverflow = el.scrollWidth > el.clientWidth;

    if (!hasOverflow) {
      setShowLeft(false);
      setShowRight(false);
      return;
    }

    setShowLeft(el.scrollLeft > 5);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, []);

  return (
    <div className={cn("relative border rounded-md bg-background", className)}>
      {/* LEFT ARROW */}
      <div
        className={cn(
          "pointer-events-none absolute left-1 top-1/2 -translate-y-1/2 z-20",
          "transition-opacity duration-300 ease-in-out",
          showLeft ? "opacity-70" : "opacity-0"
        )}
      >
        <ChevronLeft className="h-8 w-8 text-muted-foreground" />
      </div>

      {/* RIGHT ARROW */}
      <div
        className={cn(
          "pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 z-20",
          "transition-opacity duration-300 ease-in-out",
          showRight ? "opacity-70" : "opacity-0"
        )}
      >
        <ChevronRight className="h-8 w-8 text-muted-foreground" />
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={viewportRef}
        onScroll={updateArrows}
        className="overflow-x-auto overscroll-x-contain"
      >
        <div style={{ minWidth }} className="px-1">
          {children}
        </div>
      </div>
    </div>
  );
};
