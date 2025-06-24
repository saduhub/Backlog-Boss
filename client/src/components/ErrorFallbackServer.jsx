import { useState } from 'react';
import './error-fallback-server.css';
// Deconstruct the error and resetErrorBoundary from prps passed by the react-error-boundary library.
function ErrorFallback( { error, retry, fullPage = false }) {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      retry();
    }, 500); 
  };

  return (
    // Rendering error alert for accessibility.
    <div className={`error-fallback-server-parent ${fullPage ? 'full-page' : 'inline'}`}>
      <h2 className="error-fallback-server-heading">Server might be down. Try reloading!</h2>
      <p className="error-fallback-server-message">
        {isRetrying ? "Retrying..." : "If this doesn't work, try again later."}
      </p>
      <button
        className="error-fallback-server-button"
        onClick={handleRetry}
        disabled={isRetrying}
      >
        {isRetrying ? "Trying..." : "Try Again"}
      </button>
    </div>
  );

}

export default ErrorFallback;