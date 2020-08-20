import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
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

export const AddMovie = props => {

    return (
        <div>
            <StyledForm>
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