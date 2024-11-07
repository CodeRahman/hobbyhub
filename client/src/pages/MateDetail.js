// pages/MateDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';

const MateDetail = () => {
    const { id } = useParams(); //CHANGE//
    const [mate, setMate] = useState(null); //CHANGE//

    useEffect(() => {
        const fetchMate = async () => {
            const { data } = await supabase
                .from('Mates')
                .select()
                .eq('id', id)
                .single();
            setMate(data);
        };
        fetchMate();
    }, [id]);

    if (!mate) {
        return <h2>Loading Hero details...</h2>;
    }

    return (
        <div>
            <h2>{mate.mate_name}</h2> {/*CHANGE*/}
            <p><strong>Speed:</strong> {mate.speed}</p> {/*CHANGE*/}
            <p><strong>Color:</strong> {mate.color}</p> {/*CHANGE*/}
            <p><strong>Strengths:</strong> {mate.strengths}</p> {/*CHANGE*/}
            <p><strong>Weaknesses:</strong> {mate.weaknesses}</p> {/*CHANGE*/}
            <Link to="/"><button>Back to Home</button></Link> {/*CHANGE*/}
        </div>
    );
}

export default MateDetail;
