import React from 'react';
import { useState } from 'react'
import './CreatePost.css'
import { supabase } from '../client'

const CreatePost = () => {

    const [post, setPost] = useState({title: "", content: "", image_url: ""})

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const createPost = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('Posts')
          .insert({title: post.title, content: post.content, image_url: post.image_url})
          .select();
      
        window.location = "/";
        
      }

    return (
        <div>
            <form>
                <label for="title">Post Title</label> <br />
                <input type="text" id="title" name="title" onChange={handleChange} /><br />
                <br/>

                <label for="content">content</label><br />
                <input type="text" id="content" name="content" onChange={handleChange} /><br />
                <br/>

                <label for="image_url">image_url</label><br />
                <input type="text" id="image_url" name="image_url" onChange={handleChange} /><br />
                <br/>

                <input type="submit" value="Submit" onClick={createPost} />
            </form>
        </div>
    )
}

export default CreatePost