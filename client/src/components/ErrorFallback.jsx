import { useState } from 'react';
import './error-fallback.css';
// Deconstruct the error and resetErrorBoundary from prps passed by the react-error-boundary library.
function ErrorFallback( { error, resetErrorBoundary, fullPage = false }) {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      resetErrorBoundary();
    }, 500); 
  };

  return (
    // Rendering error alert for accessibility.
    <div className={`error-fallback-parent ${fullPage ? 'full-page' : 'inline'}`}>
      <h2 className="error-fallback-heading">Something broke. Try reloading!</h2>
      <p className="error-fallback-message">
        {isRetrying ? "Retrying..." : "If this doesn't work, try again later."}
      </p>
      <button
        className="error-fallback-button"
        onClick={handleRetry}
        disabled={isRetrying}
      >
        {isRetrying ? "Trying..." : "Try Again"}
      </button>
    </div>
  );

}

export default ErrorFallback;