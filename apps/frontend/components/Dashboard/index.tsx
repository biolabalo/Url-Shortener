

import React, { useState } from "react";


interface InputFieldProps {
    label: string;
    type: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    placeholder?: string;
    required?: boolean;
    addon?: React.ReactNode; // Can be any JSX element
  }
  

  const InputField: React.FC<InputFieldProps> = ({
    label,
    type,
    value,
    onChange,
    placeholder,
    required,
    addon,
  }) => (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2" htmlFor={label}>
        {label}
      </label>
      <div className="flex items-center border rounded-md overflow-hidden">
        {addon && <div className="bg-gray-200 text-gray-700 px-3 flex h-10 items-center">{addon}</div>}
        <input
          type={type}
          id={label}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-2 border-0 focus:outline-none ${addon ? '' : 'bg-[#F9FAFB]' }`}
          placeholder={placeholder}
          required={required}
        />
      </div>
    </div>
  );


  const UrlShortener = () => {
    const [name, setName] = useState('');
    const [website, setWebsite] = useState('');
    const [description, setDescription] = useState('');
  
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();
      // Add your URL shortening logic here
      console.log({ name, website, description });
    };
  
    return (
      <div className="min-h-screen flex items-center justify-start">
        <div className="bg-white p-8 rounded w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6">Shorten URL</h1>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Input name"
              required
            />
            <InputField
              label="Website"
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="www.placeholder.com"
              addon="http://" // Passing the addon as a string
            />
            <InputField
              label="Description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Input description"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#3976E8] text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Shorten URL
            </button>
          </form>
        </div>
      </div>
    );
  };

  export default UrlShortener;