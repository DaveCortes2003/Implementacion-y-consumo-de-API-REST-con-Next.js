'use client'

import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';

import "./style.css"

const API_URL = "https://jsonplaceholder.typicode.com/posts";

type Post = {
    id?: number;
    title: string;
    body: string;
};

const notifyError = (message: string) => toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    pauseOnFocusLoss: false
});

const notifySucces = (message : string) => toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    pauseOnFocusLoss: false
});

export default function PostList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPost, setNewPost] = useState<Post>({ title: "", body: "" });
    const [editPost, setEditPost] = useState<Post | null>(null);

    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data: Post[]) => setPosts(data.slice(0, 10)))
            .catch((error) => console.error("Error fetching posts:", error));
    }, []);

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPost),
        })
            .then((res) => res.json())
            .then((data: Post) => {
                data.id = (posts.length + 1)
                setPosts([...posts, data]);
                setNewPost({ title: "", body: "" });
                notifySucces("Post Created")
            })
            .catch((error) => {
                console.error("Error creating post:", error)
                notifyError("Error creating post")
            });
    };

    const handleEdit = (post: Post) => {
        setEditPost(post);
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editPost || !editPost.id) return;
        fetch(`${API_URL}/${editPost.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editPost),
        })
            .then(() => {
                setPosts(posts.map((p) => (p.id === editPost.id ? editPost : p)));
                setEditPost(null);
                notifySucces("Post edited")
            })
            .catch((error) => {
                console.error("Error edidting post:", error)
                notifyError("Error editing post")
            });
    };

    return (
        <div className="container">

            <h1 className="pageTitle">List Post</h1>

            <div className="postGrid">
                {posts.map((post) => (
                    <div key={post.id} className="postCard">
                        <h3 className="postTitle">{post.title}</h3>
                        <p className="postBody">{post.body}</p>
                        <button
                            onClick={() => handleEdit(post)}
                            className="editButton"
                        >
                            Edit
                        </button>
                    </div>
                ))}
            </div>

            <div className="formContainer">
                <h2 className="formTitle">Create Post</h2>
                <form onSubmit={handleCreate}>
                    <input
                        className="formInput"
                        type="text"
                        placeholder="Title"
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        required
                    />
                    <textarea
                        className="formTextarea"
                        placeholder="Content"
                        value={newPost.body}
                        onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}

                        required
                    ></textarea>
                    <button
                        className="submitButton"
                    >
                        Create
                    </button>

                </form>
            </div>

            {editPost && (
                <div className="editModal">
                    <div className="editModalContent">
                        <h2 className="formTitle">Edit Post</h2>
                        <form onSubmit={handleUpdate}>
                            <input
                                className="formInput"
                                type="text"
                                value={editPost.title}
                                onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                            />
                            <textarea
                                className="formTextarea"
                                value={editPost.body}
                                onChange={(e) => setEditPost({ ...editPost, body: e.target.value })}
                            ></textarea>
                            <button
                                type="submit"
                                className="submitButton"
                            >
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}