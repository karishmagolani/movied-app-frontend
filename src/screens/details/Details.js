import {
  GridList,
  GridListTile,
  GridListTileBar,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import Header from "../../common/header/Header";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const Details = ({ isLoggedIn, baseUrl, match }) => {
  const [movie, setmovie] = useState(null);
  const [stars, setstars] = useState([
    {
      id: 1,
      stateId: "star1",
      color: "black",
    },
    {
      id: 2,
      stateId: "star2",
      color: "black",
    },
    {
      id: 3,
      stateId: "star3",
      color: "black",
    },
    {
      id: 4,
      stateId: "star4",
      color: "black",
    },
    {
      id: 5,
      stateId: "star5",
      color: "black",
    },
  ]);

  const getMovie = () => {
    fetch(`${baseUrl}/movies/${match.params.id}`).then((res) =>
      res.json().then((data) => {
        console.log("data", data);
        setmovie(data);
      })
    );
  };
  const handleStartClick = (id) => {
    let starIconList = [];
    for (let star of stars) {
      let starNode = star;
      if (star.id <= id) {
        starNode.color = "yellow";
      } else {
        starNode.color = "black";
      }
      starIconList.push(starNode);
    }
    setstars(starIconList);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      <Header
        isLoggedIn={isLoggedIn}
        showBookShowButton={true}
        id={match.params.id}
      />
      <div className="back-btn">
        <Typography>
          <Link to="/"> &#60; Back to Home</Link>
        </Typography>
      </div>
      {movie && (
        <div className="main-flex">
          <div className="left-section">
            <img src={movie.poster_url} alt={movie.title} />
          </div>
          <div className="middle-section">
            <div>
              <Typography variant="headline" component="h2">
                {movie.title}{" "}
              </Typography>
            </div>
            <br />
            <div>
              <Typography>
                <span className="bold">Genres: </span> {movie.genres.join(", ")}
              </Typography>
            </div>
            <div>
              <Typography>
                <span className="bold">Duration:</span> {movie.duration}{" "}
              </Typography>
            </div>
            <div>
              <Typography>
                <span className="bold">Release Date:</span>{" "}
                {new Date(movie.release_date).toDateString()}{" "}
              </Typography>
            </div>
            <div>
              <Typography>
                <span className="bold"> Rating:</span> {movie.critics_rating}{" "}
              </Typography>
            </div>
            <div style={{ marginTop: "16px" }}>
              <Typography>
                <span className="bold">Plot:</span>{" "}
                <a href={movie.wiki_url}>(Wiki Link)</a> {movie.storyline}{" "}
              </Typography>
            </div>
            <div style={{ marginTop: "16px" }}>
              <Typography>
                <span className="bold">Trailer:</span>
              </Typography>
              <YouTube
                videoId={movie.trailer_url.split("?v=")[1]}
                opts={{
                  height: "300",
                  width: "700",
                  playerVars: {
                    autoplay: 1,
                  },
                }}
                onReady={this._onReady}
              />
            </div>
          </div>
          <div className="right-section">
            <Typography>
              <span className="bold">Rate this movie: </span>
            </Typography>
            {stars.map((star) => (
              <StarBorderIcon
                className={star.color}
                key={"star" + star.id}
                onClick={() => handleStartClick(star.id)}
              />
            ))}

            <div className="bold" style={{ margin: "16px 0px" }}>
              <Typography>
                <span className="bold">Artists:</span>
              </Typography>
            </div>
            <div className="paddingRight">
              <GridList cellHeight={160} cols={2}>
                {movie.artists != null &&
                  movie.artists.map((artist) => (
                    <GridListTile
                      className="gridTile"
                      onClick={() => this.artistClickHandler(artist.wiki_url)}
                      key={artist.id}
                    >
                      <img
                        src={artist.profile_url}
                        alt={artist.first_name + " " + artist.last_name}
                      />
                      <GridListTileBar
                        title={artist.first_name + " " + artist.last_name}
                      />
                    </GridListTile>
                  ))}
              </GridList>
            </div>
          </div>
        </div>
      )}{" "}
    </div>
  );
};

export default Details;
