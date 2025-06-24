import React, { useState, useEffect } from 'react';
import './Blog.css'

function Blog() {

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    
    const storedPosts = JSON.parse(localStorage.getItem('posts'));
    if (storedPosts) {
      setPosts(storedPosts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleAddPost = () => {
    if (title.trim() !== '' && content.trim() !== '') {
      setPosts([...posts, { title, content }]);
      setTitle('');
      setContent('');
    }
  };

  const handleEditPost = (index) => {
    setEditingIndex(index);
    setTitle(posts[index].title);
    setContent(posts[index].content);
  };

  const handleUpdatePost = () => {
    if (editingIndex !== null) {
      const updatedPosts = posts.map((post, index) => {
        if (index === editingIndex) {
          return { title, content };
        }
        return post;
      });
      setPosts(updatedPosts);
      setEditingIndex(null);
      setTitle('');
      setContent('');
    }
  };

  const handleRemovePost = (index) => {
    const newPosts = posts.filter((_, i) => i !== index);
    setPosts(newPosts);
  };

  return (
    <div className="blog-platform">
      <h1>Blog Platform</h1>
      <div className="input-container">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Post Title"
        />
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Post Content"
        />
        {editingIndex !== null ? (
          <button onClick={handleUpdatePost}>Update Post</button>
        ) : (
          <button onClick={handleAddPost}>Add Post</button>
        )}
      </div>
      <h2>Blog Posts</h2>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <div>
            <button onClick={() => handleEditPost(index)}>Edit</button>
            <button onClick={() => handleRemovePost(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog