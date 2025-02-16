import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
function Movie({ movieNm, openDt, movieRank }) {
  return (
    <div>
      <h1>
        <Link to={`/movie/${movieRank}`}>{movieNm}</Link>
      </h1>
      <p>출시날짜:{openDt}</p>
    </div>
  );
}
Movie.propTypes = {
  movieRank: PropTypes.number.isRequired,
  movieNm: PropTypes.string.isRequired,
  openDt: PropTypes.string.isRequired,
};
export default Movie;
