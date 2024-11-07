import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client'

const ReadMates = (props) => {

    const [mates, setMates] = useState([]);

    useEffect(() => {
        // READ all mates from table
        const fetchMates = async () => {
            const {data} = await supabase
            .from('Mates')
            .select()
            .order('created_at', { ascending: true })
        
            // set state of posts
            setMates(data)
        }
        setMates(props.data);
        fetchMates();
    }, [props]);
    
    return (
        <div className="ReadPosts">
            {
                mates && mates.length > 0 ?
                mates.map((mate,index) => 
                   <Card id={mate.id} mate_name={mate.mate_name} speed={mate.speed} color={mate.color} strengths= {mate.strengths} weaknesses = {mate.weaknesses}/>
                ) : <h2>{'No Heroes Yet 😞'}</h2>
            }
        </div>  
    )
}

export default ReadMates;