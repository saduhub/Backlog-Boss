import "./related-games-banner.css";
import RelatedGameCard from "./RelatedGameCard.jsx";

function RelatedGamesBanner({ related = [], currentGameId }) {

  const filteredRelated = related.filter((g) => g._id !== currentGameId);

  return (
    <div className="related-games-banner">
      <h3 className="relatedgamesbanner-header">Related Games</h3>
      <div className="relatedgamesbanner-list">
        {filteredRelated.map((game) => (
          <RelatedGameCard key={game._id} gameArray={game} />
        ))}
      </div>
    </div>
  );
}

export default RelatedGamesBanner;
