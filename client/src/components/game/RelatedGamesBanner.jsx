import "./related-games-banner.css";
import RelatedGameCard from "./RelatedGameCard.jsx";

function RelatedGamesBanner({ related = [] }) {
  return (
    <div className="related-games-banner">
      <h3 className="relatedgamesbanner-header">Related Games</h3>
      <div className="relatedgamesbanner-list">
        {related.map((g, i) => (
          <RelatedGameCard key={i} game={g} />
        ))}
      </div>
    </div>
  );
}

export default RelatedGamesBanner;
