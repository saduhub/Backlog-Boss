// import '../../assets/css/artGen.css';
import './action-bar.css';

function ActionBar({ disabled, onSetAvatar, onSave }) {
  return (
    <div className="artgen-actionbar">
      <button
        className="artgen-secondary-btn"
        onClick={onSetAvatar}
        disabled={disabled}
      >
        Set as Profile Picture
      </button>
      <button
        className="artgen-secondary-btn"
        onClick={onSave}
        disabled={disabled}
      >
        Save to Gallery
      </button>
    </div>
  );
}

export default ActionBar;
