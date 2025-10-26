import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [post, setPost] = useState({
    Name: '',
    email: ''
  })
  const handleInput = (event) => {
    setPost({...post, [event.target.name]: event.target.value})
  }
  function handleSubmit(event){
    event.preventDefault()
    console.log(post)

    axios.post('http://localhost:3000/list', post, {
      headers: { 'Content-Type': 'application/json'}
    })
    .then(response => {
      console.log(response)
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
          Name: <input type="text" onChange={handleInput} name="Name" /><br /><br />
          email: <input type="email" onChange={handleInput} name="email" /><br /><br />
          <button>Submit</button>
        </form>
       </div>
      </div>
       
    </>
  )
}

export default App
