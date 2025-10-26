import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [post, setPost] = useState({
    Name: '',
    email: '',
    province: ''
  })
  const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };
  function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault()
    // console.log(post)

    axios.post('https://smartdrops-waiting-list.onrender.com/list', post, {
      headers: { 'Content-Type': 'application/json'}
    })
    .then(response => {
      console.log(response)
      alert("Thanks for joining! We'll notify you soon.");
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <div className="Main-div">
          <h1>Let's Build SmartDrops Together</h1>
       <div className="form-div">
        <form onSubmit={handleSubmit}>
          <h4>Join the waitlist and get exclusive early access before everyone else.</h4>
          <p>A community-driven platform that lets South Africans report water leaks in real time using photos and GPS.</p>
          <p>Name: <input type="text" onChange={handleInput} name="Name" /></p><br />
          <p>email: <input type="email" onChange={handleInput} name="email" /></p><br />
          <p>Manucipality: <select name="province" onChange={handleInput}>
          <option value="">-- Choose an option --</option>
          <option value="Gauteng">Gauteng</option>
          <option value="Limpopo">Limpopo</option>
          <option value="North West">North West</option>
          <option value="Mpumalanga">Mpumalanga</option>
          <option value="Northen Cape">Northen Cape</option>
          <option value="Western Cape">Western Cape</option>
          <option value="Free State">Free State</option>
          <option value="KawZulu-Natal">KawZulu-Natal</option>
          <option value="Eastern Cape">Eastern Cape</option>
          </select> </p><br />
          <button type='submit'>Get Early Access</button> <br />
        </form>
       </div>
      </div>
       
    </>
  )
}

export default App
