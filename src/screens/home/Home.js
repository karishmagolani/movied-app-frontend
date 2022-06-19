import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import GridListTile from "@material-ui/core/GridListTile";
import { API_URL } from "../../constants";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  GridList,
  GridListTileBar,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";

const style = (theme) => ({
  filterContent: {
    margin: theme.spacing.unit,
    minWidth: 240,
    maxWidth: 240,
  },
  title: {
    color: theme.palette.primary.light,
  },
});

const Home = ({ isLoggedIn, classes }) => {
  // states
  const [upComingMovies, setUpComingMovies] = useState([]);
  const [releasedMovies, setReleasedMovies] = useState([]);
  const [artistsList, setArtistsList] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [seletedGenres, setseletedGenres] = useState([]);
  const [seletedArtists, setseletedArtists] = useState([]);
  const [movieName, setmovieName] = useState("");
  const [startDate, setstartDate] = useState(null);
  const [endDate, setendDate] = useState(null);

  const url = new URL(`${API_URL}/movies`);

  // handlers
  //fetch upcoming movies
  const fetchUpcomingMovies = () => {
    url.search = new URLSearchParams({
      page: 1,
      limit: 6,
      status: "PUBLISHED",
    }).toString();
    fetch(url, {}).then((res) => {
      res.json().then((data) => {
        console.log(data);
        setUpComingMovies(data.movies);
      });
    });
  };
  //fetch released movies
  const fetchReleasedMovies = () => {
    url.search = new URLSearchParams({
      status: "RELEASED",
    }).toString();
    fetch(url, {}).then((res) => {
      res.json().then((data) => {
        setReleasedMovies(data.movies);
      });
    });
  };
  //fetch genres
  const fetchGenres = () => {
    fetch(`${API_URL}/genres`, {}).then((res) => {
      res.json().then((data) => {
        console.log(data.genres);
        if (Array.isArray(data.genres)) setGenresList(data.genres);
      });
    });
  };
  //fetch artists
  const fetchArtists = () => {
    fetch(`${API_URL}/artists`, {}).then((res) => {
      res.json().then((data) => {
        console.log(data.artists);
        if (Array.isArray(data.artists)) setArtistsList(data.artists);
      });
    });
  };
  const handleOnMovieClick = (id) => {
    window.location.href = `/movie/${id}`;
  };
  const handleOnMovieNameChange = (event) => {
    setmovieName(event.target.value);
  };
  const handleOnGenreChange = (event) => {
    setseletedGenres(event.target.value);
  };
  const handleOnArtistChange = (event) => {
    setseletedArtists(event.target.value);
  };
  const handleOnStartDateChange = (event) => {
    setstartDate(event.target.value);
  };
  const handleOnEndDateChange = (event) => {
    setendDate(event.target.value);
  };
  const handleOnApplyFilterClick = () => {
    url.search = new URLSearchParams({
      status: "RELEASED",
      title: movieName,
      genres: seletedGenres.toString(),
      artists: seletedArtists.toString(),
      start_date: startDate || "",
      endDate: endDate || "",
    }).toString();

    fetch(url).then((res) =>
      res.json().then((data) => setReleasedMovies(data.movies))
    );
  };

  // effects
  useEffect(() => {
    fetchUpcomingMovies();
    fetchReleasedMovies();
    fetchGenres();
    fetchArtists();
  }, []);

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      <div className="title">Upcoming Movies</div>
      <GridList cellHeight={250} cols={5} className="upcoming-list">
        {upComingMovies.map((movie) => (
          <GridListTile key={movie.id}>
            <img
              src={movie.poster_url}
              className="movie-poster"
              alt={movie.title}
            />
            <GridListTileBar title={movie.title} />
          </GridListTile>
        ))}
      </GridList>
      <div className="released-list">
        <div className="left-section">
          <GridList cellHeight={350} cols={4}>
            {releasedMovies.map((movie) => (
              <GridListTile
                onClick={() => handleOnMovieClick(movie.id)}
                key={"grid" + movie.id}
              >
                <img
                  src={movie.poster_url}
                  alt={movie.title}
                  style={{ cursor: "pointer" }}
                />
                <GridListTileBar
                  title={movie.title}
                  subtitle={
                    <span>
                      Release Date:{" "}
                      {new Date(movie.release_date).toDateString()}
                    </span>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
        <div className="right-section">
          <Card>
            <CardContent>
              <div className={classes.filterContent}>
                <Typography className={classes.title} color="textSecondary">
                  FIND MOVIES BY:
                </Typography>
              </div>

              <FormControl className={classes.filterContent}>
                <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                <Input id="movieName" onChange={handleOnMovieNameChange} />
              </FormControl>

              <FormControl className={classes.filterContent}>
                <InputLabel htmlFor="select-multiple-checkbox">
                  Genres
                </InputLabel>
                <Select
                  multiple
                  input={<Input id="select-multiple-checkbox-genre" />}
                  renderValue={(selected) => selected.join(",")}
                  value={seletedGenres}
                  onChange={handleOnGenreChange}
                >
                  {Array.isArray(genresList) &&
                    genresList.map((genre) => (
                      <MenuItem key={genre.id} value={genre.genre}>
                        <Checkbox
                          checked={seletedGenres.indexOf(genre.genre) > -1}
                        />
                        <ListItemText primary={genre.genre} />
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <FormControl className={classes.filterContent}>
                <InputLabel htmlFor="select-multiple-checkbox">
                  Artists
                </InputLabel>
                <Select
                  multiple
                  input={<Input id="select-multiple-checkbox" />}
                  renderValue={(selected) => selected.join(",")}
                  value={seletedArtists}
                  onChange={handleOnArtistChange}
                >
                  {artistsList.map((artist) => (
                    <MenuItem
                      key={artist.id}
                      value={artist.first_name + " " + artist.last_name}
                    >
                      <Checkbox
                        checked={
                          seletedArtists.indexOf(
                            artist.first_name + " " + artist.last_name
                          ) > -1
                        }
                      />
                      <ListItemText
                        primary={artist.first_name + " " + artist.last_name}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className={classes.filterContent}>
                <TextField
                  id="releaseDateStart"
                  label="Release Date Start"
                  type="date"
                  defaultValue=""
                  InputLabelProps={{ shrink: true }}
                  onChange={handleOnStartDateChange}
                />
              </FormControl>

              <FormControl className={classes.filterContent}>
                <TextField
                  id="releaseDateEnd"
                  label="Release Date End"
                  type="date"
                  defaultValue=""
                  InputLabelProps={{ shrink: true }}
                  onChange={handleOnEndDateChange}
                />
              </FormControl>
              <br />
              <br />
              <FormControl className={classes.filterContent}>
                <Button
                  onClick={handleOnApplyFilterClick}
                  variant="contained"
                  color="primary"
                >
                  APPLY
                </Button>
              </FormControl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default withStyles(style)(Home);
