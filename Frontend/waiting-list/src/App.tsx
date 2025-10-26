import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [post, setPost] = useState({
    Name: '',
    email: ''
  })
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };
  function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault()
    console.log(post)

    axios.post('https://smartdrops-waiting-list.onrender.com/list', post, {
      headers: { 'Content-Type': 'application/json'}
    })
    .then(response => {
      console.log(response)
      alert("Thank you!!");
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <div>
       <div>
        <form onSubmit={handleSubmit}>
          <h1>Smart Drops Witing List</h1>
          <p>Name:</p> <input type="text" onChange={handleInput} name="Name" /><br /><br />
          <p>email:</p><input type="email" onChange={handleInput} name="email" /><br /><br />
          <button type='submit'>Submit</button>
        </form>
       </div>
      </div>
       
    </>
  )
}

export default App
