import React from 'react';
import { useParams, useHistory, useState } from 'react-router-dom'

const emptyForm = {
  id: '',
  title: '',
  director: '',
  metascore: '',
  // stars: [],
}

export const UpdateForm = () => {
  const { id } = useParams();
  const { push } = useHistory();
  const [movie, setMovie] = useState(emptyForm);

  const handleChanges = e => {
    setMovie({...movie, [e.target.name] : e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // make a PUT request to edit the item
    axios
      .put(`http://localhost:3333/update-movie/${id}`, movie)
      .then((res) => {
        // this works because the server sends us the full array of items
        props.setItems(res.data);
        history.push(`/item-list/${id}`);

        // afternoon project
        // the server will only send back the updated item
        // const newItemArr = props.items.map(v => {
        //   if () {//v is the item we updated - return the new item
        //     else {} // return v untouched
        // })
        // props.setItems(newItemArr);
        push('/movies');
      })
      .catch((err) => console.error(err.message));
  };

  return (
    <div>
      <form>

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

        {/* <input
          type=''
          name=''
          onChange={handleChanges}
        /> */}

        <button onClick=''>Submit</button>
      </form>
    </div>
  )
}