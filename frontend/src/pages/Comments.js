import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Comments() {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ username: '', rate: '', drama: '', text: '' });

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/comments');
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/comments', newComment);
            setNewComment({ username: '', rate: '', drama: '', text: '' });
            fetchComments();
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/comments/${id}`);
            fetchComments();
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    return (
        <div className="container">
            <h3>Comments</h3>
            <form className="mb-3" onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        value={newComment.username}
                        onChange={(e) => setNewComment({ ...newComment, username: e.target.value })}
                    />
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Rate"
                        value={newComment.rate}
                        onChange={(e) => setNewComment({ ...newComment, rate: e.target.value })}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Drama"
                        value={newComment.drama}
                        onChange={(e) => setNewComment({ ...newComment, drama: e.target.value })}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Comment"
                        value={newComment.text}
                        onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                    />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>

            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Rate</th>
                        <th>Drama</th>
                        <th>Comment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map((comment, index) => (
                        <tr key={comment.id}>
                            <td>{index + 1}</td>
                            <td>{comment.username}</td>
                            <td>{comment.rate}</td>
                            <td>{comment.drama}</td>
                            <td>{comment.text}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(comment.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Comments;
