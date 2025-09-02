
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/50">
      <div className="glass-card p-10 max-w-md w-full text-center">
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary text-primary">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">Hmm, this track doesn't exist.</p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors"
        >
          <Home className="h-4 w-4" />
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
