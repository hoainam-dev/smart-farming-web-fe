import React, { useState } from 'react';
import axios from 'axios';
import { registerUser } from '../../../redux/api/apiUser';
import { useDispatch } from 'react-redux';
const SignUpForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    faceId: false,
    isAdmin: 0,
    isRole: ''
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
  
    if (name === "isAdmin") {
      updatedValue = parseInt(value, 10);
    }
    setFormData({
      ...formData,
      [name]: updatedValue,
      isRole: updatedValue === 1 ? 'admin' : 'user'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await registerUser(formData,dispatch)
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto pt-10">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">firstName</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">lastName</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
      
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <div className="flex items-center">
            <input
              type="radio"
              id="admin"
              name="isAdmin"
              value={1}
              checked={formData.isAdmin === 1}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="admin" className="mr-4">Admin</label>
            <input
              type="radio"
              id="user"
              name="isAdmin"
              value={0}
              checked={formData.isAdmin === 0}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="user">User</label>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
