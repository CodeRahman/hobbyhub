import React from 'react';
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { supabase } from '../client'


const EditMate = ({data}) => {

    const {id} = useParams();
    const [mate, setMate] = useState({id: null, mate_name: "", speed: "", color: "", strengths: "", weaknesses: ""});

    const handleChange = (event) => {
        const {name, value} = event.target;
        setMate( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const updateMate = async (event) => {
        event.preventDefault();

        await supabase
          .from('Mates')
          .update({mate_name: mate.mate_name, speed: mate.speed, color: mate.color, strengths: mate.strengths, weaknesses: mate.weaknesses})
          .eq('id', id)

        window.location = "/";
    }

    const deleteMate = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('Mates')
          .delete()
          .eq('id', id); 
      
        window.location = "http://localhost:3000/";
      }

    return (
        <div>
            <form>
                <label for="mate_name">Crewmate</label> <br />
                <input type="text" id="mate_name" name="mate_name" value={mate.mate_name} onChange={handleChange} /><br />
                <br/>

                <label for="speed">speed</label><br />
                <input type="text" id="speed" name="speed" value={mate.speed} onChange={handleChange} /><br />
                <br/>

                <label for="color">Color</label><br />
                <select id="color" name="color" onChange={handleChange} value={mate.color}> {/*CHANGE*/}
                    <option value="">Select Color</option> {/*CHANGE*/}
                    <option value="Red">Red</option> {/*CHANGE*/}
                    <option value="Blue">Blue</option> {/*CHANGE*/}
                    <option value="Green">Green</option> {/*CHANGE*/}
                    <option value="Yellow">Yellow</option> {/*CHANGE*/}
                    <option value="Purple">Purple</option> {/*CHANGE*/}
                </select><br />
                <br />

                <label for="strengths">strengths</label><br />
                <input type="text" id="strengths" name="strengths" value={mate.strengths} onChange={handleChange} /><br />
                <br/>

                <label for="weaknesses">Weaknesses</label><br />
                <input type="text" id="weaknesses" name="weaknesses" value={mate.weaknesses} onChange={handleChange} /><br />
                <br/>

                <input type="submit" value="Submit" onClick={updateMate}/>
                <button className="deleteButton" onClick={deleteMate}>Delete</button>
            </form>
        </div>
    )
}

export default EditMate