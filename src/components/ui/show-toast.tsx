import { toast } from "@/hooks/use-toast"; // adjust import if needed
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

export const showToast = (status: number, message: string) => {
  let icon, iconColor, titleColor;

  if (status >= 200 && status < 300) {
    // Success: 200, 201
    icon = <CheckCircle className="w-6 h-6 text-green-500" />;
    titleColor = "text-green-600";
  } else if (status === 400 || status === 404) {
    // Warning / Not Found
    icon = <AlertCircle className="w-6 h-6 text-yellow-500" />;
    titleColor = "text-yellow-600";
  } else if (status === 401 || status === 403) {
    // Unauthorized / Token expired
    icon = <AlertCircle className="w-6 h-6 text-orange-500" />;
    titleColor = "text-orange-600";
  } else if (status >= 500) {
    // Server error
    icon = <XCircle className="w-6 h-6 text-red-500" />;
    titleColor = "text-red-600";
  } else {
    // Default to neutral
    icon = <AlertCircle className="w-6 h-6 text-gray-500" />;
    titleColor = "text-gray-600";
  }

  toast({
    description: (
      <div className="flex items-center gap-3 mt-2">
        {icon}
        <div>
          <p className={`font-semibold ${titleColor}`}>{message}</p>
        </div>
      </div>
    ),
    
  });
};
