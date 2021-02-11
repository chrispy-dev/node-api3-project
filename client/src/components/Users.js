import React from 'react';

import User from './User';

const Users = ({ users }) => {
    return (
        <div className="flex flex-wrap justify-center items-center mt-3">
            {
                users 
                ? users.map(user => <User key={user.id} user={user} />)
                : <h1>loading...</h1>
            }
        </div>
    );
};

export default Users;