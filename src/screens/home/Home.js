import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import GridListTile from "@material-ui/core/GridListTile";
import { API_URL } from "../../constants";
import { GridList, GridListTileBar } from "@material-ui/core";

const Home = ({ isLoggedIn }) => {
  // states
  const [upComingMovies, setUpComingMovies] = useState([]);

  const url = new URL(`${API_URL}/movies`);

  // handlers
  const fetchUpcomingMovies = () => {
    url.search = new URLSearchParams({
      page: 1,
      limit: 6,
      status: "PUBLISHED",
    }).toString();
    fetch(url, {
      // body: {
      //   page: 1,
      //   limit: 6,
      // },
    }).then((res) => {
      res.json().then((data) => {
        console.log(data);
        setUpComingMovies(data.movies);
      });
    });
  };

  // effects
  useEffect(() => {
    fetchUpcomingMovies();
  }, []);
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      <div className="title">Upcoming Movies</div>
      <GridList cols={5} className="upcoming-list">
        {upComingMovies.map((movie) => (
          <GridListTile key={movie.id} style={{ height: "250px" }}>
            <img
              src={movie.poster_url}
              className="movie-poster"
              alt={movie.title}
            />
            <GridListTileBar title={movie.title} />
          </GridListTile>
        ))}
      </GridList>
      <div className="released-list"></div>
    </div>
  );
};

export default Home;
