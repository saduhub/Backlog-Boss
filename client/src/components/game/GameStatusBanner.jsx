import "./game-status-banner.css";

function GameStatusBanner({
  inBacklog = false,
  isFavorite = false,
  inProgress = false,
  isCompleted = false,
}) {
  return (
    <div className="game-status-banner">
      <button className={`gamestatusbanner-btn${inBacklog ? " active" : ""}`}>
        In Backlog
      </button>
      <button className={`gamestatusbanner-btn${isFavorite ? " active" : ""}`}>
        Favorite
      </button>
      <button className={`gamestatusbanner-btn${inProgress ? " active" : ""}`}>
        In Progress
      </button>
      <button className={`gamestatusbanner-btn${isCompleted ? " active" : ""}`}>
        Completed
      </button>
    </div>
  );
}

export default GameStatusBanner;
