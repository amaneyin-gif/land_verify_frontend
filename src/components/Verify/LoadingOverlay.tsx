// import { Loader2 } from 'lucide-react';
import { Loader } from "@/components/ui/loader";


interface LoadingOverlayProps {
  isVisible: boolean;
}

export const LoadingOverlay = ({ isVisible }: LoadingOverlayProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <Loader />
        {/* <p className="text-sm text-muted-foreground">Loading...</p> */}
      </div>
    </div>
  );
};
