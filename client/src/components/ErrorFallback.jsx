import './error-fallback.css';
// Deconstruct the error and resetErrorBoundary from prps passed by the react-error-boundary library.
function ErrorFallback( { error, resetErrorBoundary, fullPage = false }) {
  return (
    // Rendering error alert for accessibility.
    <div className={`error-fallback-parent ${fullPage ? 'full-page' : 'inline'}`}>
      <h2 className="error-fallback-heading">Something broke. Try reloading!</h2>
      <p className="error-fallback-message">If this does not work, try again later.</p>
      <button className="error-fallback-button" onClick={resetErrorBoundary}>
        Try Again
      </button>
    </div>
  );

}

export default ErrorFallback;