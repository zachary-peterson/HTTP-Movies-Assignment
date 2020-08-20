import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import { UpdateForm } from './Movies/UpdateForm';
import AddMovie from './Movies/AddMovie';
import Movie from "./Movies/Movie";
import axios from 'axios';
import styled from 'styled-components';

const AddBttn = styled.div`
  text-align: center;
  width: 20%;
  margin: 0 auto;
  font-size: 1.5rem;
  background-color: lightskyblue;
  padding: 1%;
`

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [movieList.length]);

  return (
    <>
      <SavedList list={savedList} />

      <AddBttn>
        <Link to='/add-movie'>Add A Movie</Link>
      </AddBttn>

      <Route exact path="/">
        <MovieList movies={movieList} setMovieList={setMovieList}/>
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} movieList={movieList} setMovieList={setMovieList} getMovieList={getMovieList}/>
      </Route>

      <Route path='/update-movie/:id'>
        <UpdateForm movieList={movieList} setMovieList={setMovieList} getMovieList={getMovieList} />
      </Route>

      <Route path='/add-movie'>
        <AddMovie setMovieList={setMovieList} getMovieList={getMovieList}/>
      </Route>

    </>
  );
};

export default App;
