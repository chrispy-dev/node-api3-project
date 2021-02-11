import React from 'react';

const User = ({ user }) => {
    return (
        <div className="p-5 m-2 w-1/4 border-2 border-black rounded">
            <h1>{user.name}</h1>
            <p>Hello, my name is {user.name}. Nice to meet you.</p>
        </div>
    );
};

export default User;