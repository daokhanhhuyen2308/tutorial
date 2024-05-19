import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import TutorialService from "../service/TutorialService";

const TutorialComponent = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPublished, setPublished] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        if (id) {
            fetchTutorialById(id);
        }
    }, [id]);

    async function fetchTutorialById(id) {
        try {
            const data = await TutorialService.get(id);
            setTitle(data.title);
            setDescription(data.description);
            setPublished(data.published);
            setIsLoaded(true);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleUpdate() {
        try {
            await TutorialService.update(id, { title, description });
            setIsUpdate(true);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDelete() {
        try {
            await TutorialService.delete(id);
            setIsDeleted(true);
        } catch (error) {
            console.log(error);
        }
    }

    async function handlePublishedChange(){
        try{
            const data = await TutorialService.updatePublished(id);
            setPublished(data.published);
        }catch (error){
            console.log(error);
        }
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h2>Tutorial</h2>
            <form className="formSubmit" style={{marginBottom: "10px"}}>
                <label className="title" style={{ display: "block" }}>Title</label>
                <input
                    placeholder="Enter title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label className="description" style={{ display: "block", marginTop: "20px" }}>Description</label>
                <input
                    placeholder="Enter description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <h6 style={{ marginTop: "20px" }}>Status: <span>{isPublished ? "Published" : "Pending"}</span></h6>
                <br />
                <button
                    type="button"
                    className="btn btn-primary"
                    style={{ marginTop: "20px", marginRight: "10px" }}
                    onClick={handlePublishedChange}
                >
                    Publish
                </button>
                <button
                    type="button"
                    className="btn btn-success"
                    style={{ marginTop: "20px", marginRight: "10px"}}
                    onClick={handleUpdate}
                >
                    Update
                </button>

                <button
                    type="button"
                    className="btn btn-danger"
                    style={{ marginTop: "20px", marginRight: "10px" }}
                    onClick={handleDelete}
                >
                    Delete
                </button>

            </form>
            {isUpdate && (<>
                <span>The tutorial was updated successfully!</span>
            </>)}
            {isDeleted && (<>
                <span>The tutorial was deleted successfully!</span>
            </>)}
        </>
    );
}

export default TutorialComponent;
