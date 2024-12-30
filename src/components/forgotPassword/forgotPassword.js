import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, updateUser, deleteUser } from '../../Actions/ForgotPasswordaction'; // Ensure the path is correct
import './forgotpassword.css';
import Navbar from '../NavBar/Navbar';

export default function ForgotPassword() {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.forgotPassword);

    useEffect(() => {
        dispatch(fetchUsers()).catch((error) => {
            console.error('Error fetching users:', error);
        });
    }, [dispatch]);

    const handleEdit = (user) => {
        const newPassword = prompt("Enter new password:", user.password);
        if (newPassword !== null) {
            const updatedUser = { ...user, password: newPassword };
            dispatch(updateUser(updatedUser));
        }
    };

    const handleDelete = (user) => {
        if (window.confirm(`Are you sure you want to delete ${user.username}?`)) {
            dispatch(deleteUser(user));
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (users.length === 0) {
        return <p>No users found.</p>;
    }

    return (
        <div>
            <Navbar />
            <div className="forgot-password-container">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Password</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={user.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.username}</td>
                                    <td>{user.password}</td>
                                    <td>
                                        <img
                                            src='../assets/trash.png'
                                            alt='Delete'
                                            className='action-icon'
                                            onClick={() => handleDelete(user)}
                                        />
                                        <img
                                            src='../assets/edit.png'
                                            alt='Edit'
                                            className='action-icon'
                                            onClick={() => handleEdit(user)}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
