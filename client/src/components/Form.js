import React from 'react';

const Form = ({ onInputChange, name, onFormSubmit }) => {
    return (
        <form className="flex" onSubmit={onFormSubmit}>
          <input type="text" placeholder="Name" value={name} onChange={onInputChange} className="p-2 mr-3 border-2 border-black rounded" />
          <input type="submit" className="bg-white border-2 border-black rounded px-5 cursor-pointer" />
        </form>
    );
};

export default Form;