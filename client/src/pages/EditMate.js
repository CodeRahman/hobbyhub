import React from 'react';
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { supabase } from '../client'
import { useEffect } from 'react';


const Editpost = ({data}) => {

    const {id} = useParams();
    const [post, setPost] = useState({id: null, title: "", content: "", upvotes: "", image_url: ""});

    useEffect(() => {
        const fetchPost = async () => {
            const { data: fetchedPost, error } = await supabase
                .from('Posts')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error("Error fetching post:", error);
            } else {
                setPost(fetchedPost);
            }
        };

        fetchPost();
    }, [id]);
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const updatePost = async (event) => {
        event.preventDefault();

        await supabase
          .from('Posts')
          .update({title: post.title, content: post.content,  image_url: post.image_url})
          .eq('id', id)

        window.location = "/";
    }

    return (
        <div>
            <form>
                <label htmlFor="title">Post</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="content">content</label><br />
                <input type="text" id="content" name="content" value={post.content} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="image_url">image_url</label><br />
                <input type="text" id="image_url" name="image_url" value={post.image_url} onChange={handleChange} /><br />
                <br/>

                <input type="submit" value="Submit" onClick={updatePost}/>
            </form>
        </div>
    )
}

export default Editpost