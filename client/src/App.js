import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Users from './components/Users';
import Form from './components/Form';

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(users => setUsers(users.data))
      .catch(err => console.log(err));
  }, [setUsers]);

  const onInputChange = (event) => {
    setName(event.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/users', { name: name })
      .then(user => setUsers({ ...users, user }))
      .catch(err => console.log(err));
  };

  return (
    <div className="h-screen flex items-center">
      <div className="flex flex-col items-center">
        <Form onInputChange={onInputChange} name={name} onFormSubmit={onFormSubmit} />
        <Users users={users} />
      </div>
    </div>
  );
}

export default App;
