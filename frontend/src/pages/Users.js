import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [editUser, setEditUser] = useState({ id: null, username: '', email: '', role: '', password: '' });
  const [showEditModal, setShowEditModal] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Failed to fetch users. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users', newUser);
      setNewUser({ username: '', email: '', password: '' });
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const openEditModal = (user) => {
    setEditUser({ id: user.id, username: user.username, email: user.email, role: user.role, password: '' });
    setIsEmailValid(true); // Reset email validity when opening modal
    setShowEditModal(true);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });

    // Validate email format if email field is changed
    if (name === 'email') {
      setIsEmailValid(validateEmail(value));
    }
  };

  const handleEditSubmit = async () => {
    if (!isEmailValid) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const updatedUser = { ...editUser };
      if (!updatedUser.password) delete updatedUser.password; // Remove password if it's empty

      await axios.put(`http://localhost:5000/api/users/${editUser.id}`, updatedUser);
      setShowEditModal(false);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">User Management</h2>

      {/* User Creation Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-3 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              name="username"
              value={newUser.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-3 mb-2">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-3 mb-2">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-3">
            <button type="submit" className="btn btn-primary w-100">
              Add User
            </button>
          </div>
        </div>
      </form>

      {/* User List Table */}
      <table className="table table-striped">
        <thead className="thead-light">
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => openEditModal(user)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Username"
                  name="username"
                  value={editUser.username}
                  onChange={handleEditChange}
                />
                <input
                  type="email"
                  className={`form-control mb-2 ${isEmailValid ? '' : 'is-invalid'}`}
                  placeholder="Email"
                  name="email"
                  value={editUser.email}
                  onChange={handleEditChange}
                />
                {!isEmailValid && <div className="invalid-feedback">Please enter a valid email address.</div>}
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Role"
                  name="role"
                  value={editUser.role}
                  onChange={handleEditChange}
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="New Password (optional)"
                  name="password"
                  value={editUser.password}
                  onChange={handleEditChange}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handleEditSubmit}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
