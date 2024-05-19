import React, {useState} from "react";
import TutorialService from "../service/TutorialService";

export default function AddTutorialComponent() {

    const [idCounter, setIdCounter] = useState(1);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);

    async function addTutorial(event) {
        event.preventDefault();
        if (title.trim() !== '' && description.trim() !== '') {
            const newTutorial = {id: idCounter, title: title, description: description};
            try {
                await TutorialService.create(newTutorial);
                setIdCounter((count) => count + 1);
                setIsFormVisible(false);
                setIsSubmitted(true);
            } catch (error) {
                console.error("Error adding tutorial:", error);
            }

        } else {
            alert("Please enter a new tutorial");
        }
    }

    function handleTitleChange(event){
        setTitle(event.target.value);
    }

    function handleDescriptionChange(event){
        setDescription(event.target.value);
    }

    function showForm() {
        setTitle('');
        setDescription('');
        setIsFormVisible(true);
        setIsSubmitted(false);
    }

    return(
        <>
            {isFormVisible ? (
                <form className="formSubmit">
                    <label className="title" style={{display: "block"}}>Title</label>
                    <input placeholder="Enter title" type="text" value={title} onChange={handleTitleChange}/>
                    <label className="description" style={{display: "block", marginTop: "20px"}}>Description</label>
                    <input placeholder="Enter description" type="text" value={description}
                           onChange={handleDescriptionChange}/>
                    <br/>
                    <button type="submit" className="btn btn-success" style={{marginTop: "20px"}} onClick={addTutorial}>Submit</button>
                </form>
            ) : (
                <>
                    {isSubmitted && <p>You Submitted Successfully</p>}
                    <button className="btn btn-primary" style={{ marginTop: "20px", backgroundColor: "green"}}
                            onClick={showForm}>Add</button></>)
            }
        </>)
}