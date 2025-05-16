import "./game-status-banner.css";

function GameStatusBanner({
  inBacklog = false,
  isFavorite = false,
  inProgress = false,
  isCompleted = false,
  is100Completed = false,
  onBacklog,
  onFavorite,
  onInProgress,
  onCompleted,
  on100Completed,

}) {
  return (
    <div className="game-status-banner">
      <button className={`gamestatusbanner-btn${inBacklog ? " active" : ""}`} onClick={onBacklog}>
        In Backlog
      </button>
      <button className={`gamestatusbanner-btn${isFavorite ? " active" : ""}`} onClick={onFavorite}>
        Favorite
      </button>
      <button className={`gamestatusbanner-btn${inProgress ? " active" : ""}`} onClick={onInProgress}>
        In Progress
      </button>
      <button className={`gamestatusbanner-btn${isCompleted ? " active" : ""}`} onClick={onCompleted}>
        Completed
      </button>
      <button className={`gamestatusbanner-btn${is100Completed ? " active" : ""}`} onClick={on100Completed}>
        100% Completed
      </button>
    </div>
  );
}

export default GameStatusBanner;
