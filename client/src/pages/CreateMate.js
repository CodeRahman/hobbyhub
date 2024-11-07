import React from 'react';
import { useState } from 'react'
import './CreatePost.css'
import { supabase } from '../client'

const CreateMate = () => {

    const [mate, setMate] = useState({mate_name: "", speed: "", color: "", strengths: "", weaknesses: ""})

    const handleChange = (event) => {
        const {name, value} = event.target;
        setMate( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const createMate = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('Mates')
          .insert({mate_name: mate.mate_name, speed: mate.speed, color: mate.color, strengths: mate.strengths, weaknesses: mate.weaknesses})
          .select();
      
        window.location = "/";
        
      }

    return (
        <div>
            <form>
                <label for="mate_name">Crewmate</label> <br />
                <input type="text" id="mate_name" name="mate_name" onChange={handleChange} /><br />
                <br/>

                <label for="speed">Speed</label><br />
                <input type="text" id="speed" name="speed" onChange={handleChange} /><br />
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
                <input type="text" id="strengths" name="strengths" onChange={handleChange} /><br />
                <br/>

                <label for="weaknesses">Weaknesses</label><br />
                <input type="text" id="weaknesses" name="weaknesses" onChange={handleChange} /><br />
                <br/>
                <input type="submit" value="Submit" onClick={createMate} />
            </form>
        </div>
    )
}

export default CreateMate