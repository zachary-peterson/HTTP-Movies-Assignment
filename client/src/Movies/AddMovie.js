import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const emptyForm = {
  id: '',
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
  text-align: center;

  input {
    width: 75%;
    margin: 1% auto;
    min-height: 30px;
    font-size: 1.5rem;
    text-align: left;
  }

  button {
    width: 25%;
    margin: 0 auto;
  }
`

const AddMovie = props => {
    const [movie, setMovie] = useState(emptyForm);
    const [stars, setStars] = useState();
    const { push } = useHistory();
    
    const handleChanges = e => {
    setMovie({...movie, [e.target.name] : e.target.value});
  };

  const handleSubmit = e => {
      e.preventDefault();

      if(movie.stars.includes(',')){
        let newStars = movie.stars.split(',');
        movie.stars = newStars;
      }

      axios.post("http://localhost:5000/api/movies", movie)
      .then(res => {
          console.log(res);
          props.setMovieList(res.data);
          props.getMovieList();
          push('/');
      })
      .catch(err => {
          console.dir(err);
      })
  }

  

    return (
        <div>
            <StyledForm>
                <input
                    type='text'
                    name='title'
                    onChange={handleChanges}
                    value={movie.title}
                    placeholder='Movies title...'
                />

                <input
                    type='text'
                    name='director'
                    onChange={handleChanges}
                    value={movie.director}
                    placeholder='Movies director...'
                />

                <input
                    type='text'
                    name='metascore'
                    onChange={handleChanges}
                    value={movie.metascore}
                    placeholder='Movies metascore...'
                />

                <br/><br/>

                <label htmlFor='stars'>Please separate stars with a comma</label>
                <input
                    type='text'
                    name='stars'
                    onChange={handleChanges}
                    value={movie.stars}
                    placeholder='Stars'
                />

                <button onClick={handleSubmit}>Submit</button>
            </StyledForm>
        </div>
    )
}

export default AddMovie;