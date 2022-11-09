import React, { useState } from 'react';

import Search from './components/Search';
import Users from './components/Users';
import useFetch from './hook/useFetch';

const App = () => {
  // Task 2: use custom hook
  // get data, error, isLoading states from custom hook here
  const { data, error, isLoading } = useFetch("https://jsonplaceholder.typicode.com/users")
  const [filterUser,setFilterUsers] = useState(data)
  
  // use url: 'https://jsonplaceholder.typicode.com/users'

  // Task 3: delete user
  // get the id from User.js
  const handleDeleteUser = (ids) => {
    const fillter = ids.filter(
      (id) => id.common !== id
    );
    setFilterUsers(fillter);
  };

  // Task 4: search user
  // get the text from Search.js
  const handleSearch = (searchText) => {
    let value = searchText.toLowerCase();
    const newCountries = searchText.filter((country) => {
      const countryName = country.name.common.toLowerCase();
      return countryName.startsWith(value);
    });
    setFilterUsers(newCountries);
  };

  return (
    <div className="container">
      <h1 className="title">Users Management App</h1>
      {isLoading && <p>Loading users...</p>}
      {error && <p>{error}</p>}

      {/* Needs to pass functions from here for state lifting  */}
      <Search onHandleSearch={handleSearch} />
      {Users.length > 1 && <Users users={filterUser} onHandleDeleteUser={handleDeleteUser} />}
    </div>
  );
};

export default App;
