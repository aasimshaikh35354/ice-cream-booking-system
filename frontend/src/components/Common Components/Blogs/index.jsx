import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Blogs.css";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Navigation function

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blogs");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="blogs" id="blogs">
      <h1 className="heading">
        our <span>blogs</span>
      </h1>
      <div className="blogs-container">
        {blogs.map((blog) => (
          <div className="blog-card" key={blog._id}>
            <div className="blog-image">
              <img src={blog.imageUrl} alt={blog.title} />
            </div>
            <div className="blog-content">
              <h3>{blog.title}</h3>
              <p>
                <strong>Author:</strong> {blog.author}
              </p>
              <p className="blog-description">{blog.description}</p>
              <button
                className="read-more-btn"
                onClick={() => navigate(`/user-home/blog/${blog._id}`, { state: blog })}
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
