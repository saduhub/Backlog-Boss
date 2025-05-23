// import '../../assets/css/artGen.css';
import './action-bar.css';

function ActionBar({ disabled, onSetAvatar, onSave, avatarSet, gallerySaved}) {
  return (
    <div className="artgen-actionbar">
      <button
        className="artgen-secondary-btn"
        onClick={onSetAvatar}
        disabled={disabled || avatarSet}
        title={avatarSet ? "Profile Picture Set" : "Set as Profile Picture"}
      >
        {avatarSet ? "Profile Picture Set" : "Set as Profile Picture"}
      </button>
      <button
        className="artgen-secondary-btn"
        onClick={onSave}
        disabled={disabled || gallerySaved}
        title={gallerySaved ? "Saved to Gallery" : "Save to Gallery"}
      >
        {gallerySaved ? "Saved to Gallery" : "Save to Gallery"}
      </button>
    </div>
  );
}

export default ActionBar;
