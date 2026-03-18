import React, { useEffect, useState } from 'react'
import './Feed.css'
import axios from 'axios'

const Feed = () => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Like state (store liked post ids)
    const [likedPosts, setLikedPosts] = useState([])

    useEffect(() => {
        axios.get("https://project-backend-1-u7ui.onrender.com/posts")
            .then((res) => {
                // latest post first
                const reversedPosts = res.data.posts.reverse()
                setPosts(reversedPosts)
                setLoading(false)
            })
            .catch((err) => {
                console.error(err)
                setError("Failed to load posts")
                setLoading(false)
            })
    }, [])

    const toggleLike = (id) => {
        if (likedPosts.includes(id)) {
            setLikedPosts(likedPosts.filter(postId => postId !== id))
        } else {
            setLikedPosts([...likedPosts, id])
        }
    }

    const formatTime = () => {
        return "Just now" // you can later replace with real timestamp
    }

    if (loading) {
        return <h2 className="status-text">Loading posts...</h2>
    }

    if (error) {
        return <h2 className="status-text">{error}</h2>
    }

    return (
        <section className='feed-section'>

            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post._id} className='post-card'>

                        {/* Header */}
                        <div className="post-header">
                            <div className="avatar"></div>
                            <div>
                                <p className="username">suraj_v</p>
                                <p className="time">{formatTime()}</p>
                            </div>
                        </div>

                        {/* Image */}
                        <img
                            src={post.image}
                            alt={post.caption}
                            className='post-img'
                        />

                        {/* Actions */}
                        <div className="post-actions">
                            <button
                                className={`like-btn ${likedPosts.includes(post._id) ? 'liked' : ''}`}
                                onClick={() => toggleLike(post._id)}
                            >
                                {likedPosts.includes(post._id) ? '❤️ Liked' : '🤍 Like'}
                            </button>
                        </div>

                        {/* Caption */}
                        <p className='caption-para'>
                            <span className="username">suraj_v</span> {post.caption}
                        </p>

                    </div>
                ))
            ) : (
                <h1 className="status-text">No Posts Available</h1>
            )}

        </section>
    )
}

export default Feed