import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null)

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  // Fetch users on initial render
  useEffect(() => {
    fetchUsers();
  }, []);

  // Submission function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users', {
        name,
        email,
        address,
      });
      setUsers([...users, response.data]);
      setName('');
      setEmail('');
      setAddress('');
    } catch (error) {
      console.error('Error saving user', error);
    }
  };

  // Delete User

  const handleDelete = async (userId) => {
    try{
      await axios.delete(`http://localhost:5000/api/users/${userId}`)
      setUsers(users.filter(user => user._id !== userId))
    } catch (error) {
      console.error('Error deleting user', error)
    }
  }

  // Update User

  const handleEdit = (user) => {
    setName(user.name)
    setEmail(user.email)
    setAddress(user.address)
    setEditingUser(user)
  }

  return (
    <div>
      {/* <h1>Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update</button> 
       
      </form> */}

<h1>{editingUser ? 'Edit User' : 'Add User'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit">{editingUser ? 'Update' : 'Add'}</button>
        {editingUser && (
          <button type="button" onClick={() => setEditingUser(null)} className="cancel-btn">
            Cancel
          </button>
        )}
      </form>
      <h2>Users</h2>
     <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email address</th>
          <th>Address</th>
          <th>Delete user</th>
          <th>Update user</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.address}</td>
            <td>
                <button onClick={() => handleDelete(user._id)} className="delete-btn">
                  Delete
                </button>
              </td>
              <td>
              <button onClick={() => handleEdit(user)} className="edit-btn">
                  Edit
                </button>
              </td>
          </tr>
        ))}
      </tbody>
     </table>
    </div>
  );
};

export default App;
