import React, {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users')
      setUsers(response.data)
    } catch (error) {
      console.error('Error fetching users', error)
    }
  } 



// Fetch users on intial render
useEffect(() => {
  fetchUsers()
}, [])


// Submission function

const handleSubmit = async (e) => {
e.preventDefault()

try{
  const response = await axios.post('http://localhost:5000/api/users', {name, email, address})
  setUsers([...users, response.data])
  setName('')
  setEmail('')
  setAddress('')
} catch (error) {
  console.error('Error saving user', error)
}
}

return (<>
<div>
  <h1>Form</h1>
  <form onSubmit={handleSubmit}>
    <div>
      <label>Name:</label>
      <input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
    </div>
    
    <div>
      <label>Email:</label>
      <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
    </div>
    <div>
      <label>Address:</label>
      <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} required />
    </div>
    <button type='submit'>Update</button>
  </form>
  <h2>Users</h2>
  <ul>
    {users.map((users) => {
      <li key={users._id}>{users.name} - {users.email} - {users.address} </li>
    })}
  </ul>
</div>
</>)
}

export default App
