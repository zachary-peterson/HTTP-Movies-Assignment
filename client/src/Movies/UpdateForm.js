import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const emptyForm = {
  // id: '',
  title: '',
  director: '',
  metascore: '',
  stars: [],
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 1% auto;

  input {
    width: 75%;
    margin: 1% auto;
    min-height: 30px;
    font-size: 1.5rem;
  }

  button {
    width: 25%;
    margin: 0 auto;
  }
`

export const UpdateForm = props => {
  const params = useParams();
  const { push } = useHistory();
  const [movie, setMovie] = useState(emptyForm);

  useEffect(() => {
    axios
    .get(`http://localhost:5000/api/movies/${params.id}`)
    .then(res => {
      // console.log(res.data)
      setMovie(res.data);
    })
    .catch(err => {
      console.dir(err)
    })
  }, [params.id])

  const handleChanges = e => {
    setMovie({...movie, [e.target.name] : e.target.value});
  };

  console.log(props.movieList)

  const handleSubmit = (e) => {
    e.preventDefault();
    // make a PUT request to edit the item
    axios
      .put(`http://localhost:5000/api/movies/${params.id}`, movie)
      .then((res) => {
        const updatedMovies = props.movieList.map(newMovie => {
          if(newMovie.id === res.data.id){
            setMovie(res.data)
          }else{
            return newMovie
          }

        })

        props.setMovieList(updatedMovies);
        
        push('/');
        props.getMovieList();
      })
      .catch((err) => console.error(err.message));
  };

  return (
    <div>
      <StyledForm>
        {/* <input
          type='text'
          name='id'
          onChange={handleChanges}
          value={movie.id}
        /> */}

        <input
          type='text'
          name='title'
          onChange={handleChanges}
          value={movie.title}
        />

        <input
          type='text'
          name='director'
          onChange={handleChanges}
          value={movie.director}
        />

        <input
          type=''
          name='metascore'
          onChange={handleChanges}
          value={movie.metascore}
        />

        <button onClick={handleSubmit}>Submit</button>
      </StyledForm>
    </div>
  )
}