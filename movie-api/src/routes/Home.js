import { useEffect, useState } from "react";
import Movie from "../components/Movie";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  // useEffect(() => {
  //   fetch(
  //     "https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=110fdecddd53402b776e582b3e7e4800&targetDt=20220704"
  //   )
  //     .then((response) => response.json())
  //     .then((json) => setMovies(json.boxOfficeResult.dailyBoxOfficeList));
  //   setLoading(false);
  // }, []);
  const getMovies = async () => {
    const response = await fetch(
      "https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=110fdecddd53402b776e582b3e7e4800&targetDt=20220704"
    );
    const json = await response.json();
    setMovies(json.boxOfficeResult.dailyBoxOfficeList);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  console.log(movies);
  return (
    <div>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div>
          {movies.map((movie) => (
            <Movie
              movieNm={movie.movieNm}
              openDt={movie.openDt}
              movieRank={movie.rank}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
