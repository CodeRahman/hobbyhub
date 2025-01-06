import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import { supabase } from '../client';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import './ReadPosts.css';

const ReadPosts = (props) => {
    const [posts, setPosts] = useState([]);
    const [sortBy, setSortBy] = useState('created_at');  // Default sort by created_at
    const [order, setOrder] = useState('asc');  // Default order is ascending
    const [searchQuery, setSearchQuery] = useState(''); 

    // Function to fetch posts based on sorting criteria
    const fetchPosts = async () => {
        const { data } = await supabase
            .from('Posts')
            .select()
            .order(sortBy, { ascending: order === 'asc' }); // Sorting based on criteria and order
        setPosts(data);
    };
    

    // Fetch posts on initial render and when sortBy or order changes
    useEffect(() => {
        fetchPosts();
    }, [sortBy, order]); // Dependency array to re-fetch data when sortBy or order changes

    const filteredPosts = posts.filter((post) => {
        return post.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="ReadPosts">
            <h1>FootyHub</h1>
            <Link to="/new"><button className="headerBtn">Create New Post</button></Link>

             {/* Search Input */}
             <div className="search-container">
                <input
                    type="text"
                    placeholder="Search for posts by title..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>

            {/* Dropdown for sorting by upvotes or time created */}
            <div className="sort-options">
                <label htmlFor="sortBy">Sort by: </label>
                <select
                    id="sortBy"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="created_at">Time Created</option>
                    <option value="upvotes">Upvotes</option>
                </select>

                {/* Dropdown for selecting ascending or descending order */}
                <label htmlFor="order">Order: </label>
                <select
                    id="order"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            {/* Render posts */}
            {
                filteredPosts.length > 0 ?
                    filteredPosts.map((post, index) => {
                        const timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: true });
                        return (
                            <PostCard
                                key={index}
                                id={post.id}
                                title={post.title}
                                upvotes={post.upvotes}
                                created_at={timeAgo}
                            />
                        );
                    }) : <h2>{'No Posts Yet 😞'}</h2>
            }
        </div>
    );
}

export default ReadPosts;
