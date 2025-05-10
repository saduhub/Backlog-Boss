import LoadingSpinner from './LoadingSpinner.jsx';
// import '../../assets/css/artGen.css';
import './image-preview.css';

function ImagePreview({ src, isLoading }) {
  return (
    <div className="artgen-preview-card">
      {!src && !isLoading && (
        <p className="artgen-preview-placeholder">Image Preview</p>
      )}

      {isLoading && <LoadingSpinner />}

      {src && !isLoading && (
        <img
          className="artgen-preview-image"
          src={src}
          alt="Generated preview"
        />
      )}
    </div>
  );
}

export default ImagePreview;