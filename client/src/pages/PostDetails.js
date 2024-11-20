import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';

const PostDetails = () => {
    const { id } = useParams(); // Access the post ID from URL
    const [post, setPost] = useState(null); // State for post details
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [comments, setComments] = useState([]); // State for comments //CHANGE
    const [newComment, setNewComment] = useState('');

    // Fetch post details from Supabase
    useEffect(() => {
        const fetchPostAndComments = async () => {
            setLoading(true); //CHANGE

            // Fetch post details
            const { data: postData, error: postError } = await supabase
                .from('Posts')
                .select()
                .eq('id', id)
                .single();

            if (postError) {
                console.error("Error fetching post:", postError);
            } else {
                setPost(postData);
            }

            // Fetch comments for the post //CHANGE
            const { data: commentsData, error: commentsError } = await supabase
                .from('Comments')
                .select()
                .eq('post_id', id)
                .order('created_at', { ascending: false }); // Order comments by most recent //CHANGE

            if (commentsError) {
                console.error("Error fetching comments:", commentsError);
            } else {
                setComments(commentsData); // Set fetched comments in state //CHANGE
            }

            setLoading(false); // Mark loading as complete //CHANGE
        };

        fetchPostAndComments();
    }, [id]);

    const deletePost = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('Posts')
          .delete()
          .eq('id', id); 
      
        window.location = "http://localhost:3000/";
      }

    // Handle adding a new comment //CHANGE
    const handleAddComment = async (e) => {
        e.preventDefault(); // Prevent default behavior
    
        if (!newComment.trim()) {
            alert("Comment cannot be empty.");
            return;
        }
    
        // Optimistic UI update
        const tempComment = {
            id: Date.now(),
            post_id: id,
            comment: newComment,
            created_at: new Date().toISOString(),
        };
    
        setComments((prev) => [tempComment, ...prev]); // Optimistic update
        setNewComment(''); // Clear input field
    
        // Supabase query
        const { data, error } = await supabase
            .from('Comments')
            .insert([{ post_id: id, comment: newComment }]);
    
        if (error) {
            console.error("Error adding comment:", error);
            alert("Failed to add comment.");
    
            // Revert optimistic update
            setComments((prev) => prev.filter((comment) => comment.id !== tempComment.id));
        } else if (data && data.length > 0) {
            // Replace temporary comment with actual comment from Supabase
            setComments((prev) => [data[0], ...prev]);
        } else {
            console.warn("No data returned from Supabase");
        }
    };
    
    

    if (loading) {
        return <h2>Loading Post Details...</h2>; // Show loading state //CHANGE
    }

    if (!post) {
        return <h2>Post not found</h2>; // Handle post not found //CHANGE
    }
    // Handle upvote action
    const handleUpvote = async () => {
        if (!post) return; // Ensure the post is loaded

        // Optimistically update the UI
        setPost((prevPost) => ({
            ...prevPost,
            upvotes: prevPost.upvotes + 1,
        }));

        // Update upvotes in Supabase
        const { data, error } = await supabase
            .from('Posts')
            .update({ upvotes: post.upvotes + 1 })
            .eq('id', id);

        if (error) {
            console.error("Error updating upvotes:", error);

            // Revert the optimistic update if there's an error
            setPost((prevPost) => ({
                ...prevPost,
                upvotes: prevPost.upvotes - 1,
            }));
        } else {
            // Ensure local state is synchronized with the database (optional step)
            setPost(data[0]);
        }
    };

    
    return (
        <div>
            <Link to="/"><button>Back to Home</button></Link>
            <h2>{post.title}</h2>
            <p><strong>Content:</strong> {post.content}</p>
            {post.image_url && <img src={post.image_url} alt={post.title} style={{ maxWidth: '100%' }} />}
            <button onClick={handleUpvote}>Upvote</button>
            <p>Upvotes: {post.upvotes}</p>
            <Link to={`/edit/${id}`}>
                <button>Edit Post</button>
            </Link>
            <button className="deleteButton" onClick={deletePost}>Delete</button>

            {/* Comments Section */} {/* CHANGE */}
            <div>
                <h3>Comments</h3> {/* CHANGE */}
                <form onSubmit={handleAddComment}> {/* CHANGE */}
                    <input
                        type="text"
                        value={newComment} // Input value for comment //CHANGE
                        onChange={(e) => setNewComment(e.target.value)} // Update newComment state //CHANGE
                        placeholder="Write a comment..."
                        rows="3"
                        style={{ width: '100%' }}
                    />
                    <button type="submit">Add Comment</button> {/* Button to submit comment //CHANGE */}
                </form>
                <ul>
                    {comments.map((comment) => ( // Render list of comments //CHANGE
                        <li key={comment.id}>
                            <p>{comment.comment}</p> {/* Comment content //CHANGE */}
                            <small>{new Date(comment.created_at).toLocaleString()}</small> {/* Timestamp //CHANGE */}
                        </li>
                    ))}
                </ul>
            </div>
            
        </div>
    );
};

export default PostDetails;
