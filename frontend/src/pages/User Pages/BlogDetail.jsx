import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BlogDetail.css"; // Create a separate CSS file for styling
import Header from '../../components/Common Components/Header';
import Footer from '../../components/Common Components/Footer';

export default function BlogDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const blog = location.state; // Get blog details from state

    if (!blog) {
        return <div>No Blog Found!</div>;
    }

    return (
        <>
            <Header />
            <div className="blog-detail">
                <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
                <div className="blog-header">
                    <h1>{blog.title}</h1>
                    <p><strong>Author:</strong> {blog.author}</p>
                </div>
                <img src={blog.imageUrl} alt={blog.title} className="blog-image" />
                <p className="blog-content">{blog.description}</p>
            </div>
            <Footer />
        </>
    );
}
