import React, { useEffect, useState } from 'react'
import './Feed.css'
import axios from 'axios'

const Feed = () => {

    const [posts , setPosts] = useState([
        {
            _id: "1",
            image: "https://images.unsplash.com/photo-1771030668566-dc2e0f24c95e?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            caption: "koDak"
        }
    ])

    //we using use effect varna api baar baar call hogi 
    // empty array is dependency array (learn cors policy of browser)
    useEffect(() => {
        axios.get("http://localhost:3000/posts")
        .then((res) => {
            setPosts(res.data.posts)
        })
    } , [])

    return (

        <section className='feed-section'>

        {
            posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post._id} className='post-card'>
                        <img src={post.image} alt={post.caption} className='post-img' />
                        <p className='caption-para'> {post.caption} </p>
                    </div>
                ))
            ) : (
                <h1>No Post Available</h1>
            )
        }

        </section>

    )
}

export default Feed
