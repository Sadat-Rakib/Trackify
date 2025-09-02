
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success: 
          "border-green-500/50 text-green-600 dark:text-green-400 [&>svg]:text-green-500",
        info:
          "border-blue-500/50 text-blue-600 dark:text-blue-400 [&>svg]:text-blue-500",
        warning:
          "border-yellow-500/50 text-yellow-600 dark:text-yellow-400 [&>svg]:text-yellow-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface AlertProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof alertVariants> {
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
  icon?: React.ReactNode;
}

const Alert = React.forwardRef<
  HTMLDivElement,
  AlertProps
>(({ className, variant, children, onClose, autoClose = true, autoCloseDelay = 3000, icon, ...props }, ref) => {
  const [isVisible, setIsVisible] = React.useState(true);
  const [isClosing, setIsClosing] = React.useState(false);

  // Get default icon based on variant
  const getDefaultIcon = () => {
    if (icon) return icon;
    
    switch(variant) {
      case "destructive": return <AlertCircle className="h-5 w-5" />;
      case "success": return <CheckCircle className="h-5 w-5" />;
      case "warning": return <AlertTriangle className="h-5 w-5" />;
      case "info": return <Info className="h-5 w-5" />;
      default: return <Info className="h-5 w-5" />;
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300); // Match the transition duration
  };

  React.useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseDelay);
      
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        alertVariants({ variant }), 
        className, 
        "pr-12 transition-all duration-300 shadow-sm",
        isClosing ? "opacity-0 transform translate-y-2" : "opacity-100 transform translate-y-0"
      )}
      {...props}
    >
      {getDefaultIcon()}
      {children}
      <button 
        className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        onClick={handleClose}
        aria-label="Close alert"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
})
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
