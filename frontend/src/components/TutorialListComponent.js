import React, {useEffect, useState} from "react";
import TutorialComponent from "./TutorialComponent";
import TutorialService from "../service/TutorialService";
import {useNavigate} from "react-router-dom";
function TutorialListComponent(){

    const [tutorials, setTutorials] = useState([]);
    const [filteredTutorials, setFilteredTutorials] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(true);
    const [hoveredTutorial, setHoveredTutorial] = useState(null);
    const navigate = useNavigate();


        useEffect(() => {
        fetchData();
    }, []);

        async function fetchData() {
        try {
            const data = await TutorialService.getAll();
            setTutorials(data);
            setFilteredTutorials(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSearchInput(title) {
        try {
            setInputValue(title);
            const filteredData = tutorials.filter(tutorial => tutorial.title.toLowerCase().includes(title.toLowerCase()));
            setFilteredTutorials(filteredData);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleRemoveAll(){
            try{
                await TutorialService.deleteAll();
                setFilteredTutorials([]);
            } catch (error) {
            console.log(error);
        }
    }

    function handleEditClick(id){
        setIsFormVisible(false);
       navigate(`/tutorials/${id}`);
    }


    return(
        <>
            {isFormVisible ? (
                <div className="wrapper">
                    <div className="search-bar md-3" style={{display: "flex", marginTop: "8px"}}>
                        <input id="searchInput" type="text"
                               className="form-control"
                               aria-label="Search by title..."
                               placeholder="Search by title..."
                               value={inputValue}
                               onChange={(event => handleSearchInput(event.target.value))}/>
                        <button id="searchButton" type="button"
                                className="btn btn-primary" style={{marginLeft: "10px"}}
                                onClick={() => handleSearchInput(inputValue)}>Search
                        </button>
                    </div>
                    <div style={{marginTop: "30px"}} className="content">
                        <div className="mainContent">
                            <h2>Tutorials List</h2>
                            <table className="table table-hover">
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Title</th>
                                    <th>Description</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    filteredTutorials.map(tutorial => (
                                        <tr key={tutorial.id}
                                            onMouseEnter={() => setHoveredTutorial(tutorial)}
                                        >
                                            <th scope="row"></th>
                                            <td>{tutorial.title}</td>
                                            <td>{tutorial.description}</td>
                                        </tr>))
                                }
                                </tbody>
                            </table>
                            <button type="button" className="btn btn-danger"
                            onClick={handleRemoveAll}>Remove All</button>
                        </div>
                        <div className="contentDetail">
                            <h2>Tutorial</h2>
                            {hoveredTutorial && (
                                <><h6>Title: <span>{hoveredTutorial.title}</span></h6>
                                    <h6>Description: <span>{hoveredTutorial.description}</span></h6>
                                    <h6>Status: <span>{hoveredTutorial.published ? "Published" : "Pending"}</span></h6>
                                    <button
                                        className="btn btn-warning"
                                        style={{fontWeight: "600", width: "80px"}}
                                        onClick={() => handleEditClick(hoveredTutorial.id)}
                                    >
                                        Edit
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <TutorialComponent />
                </>
            )
            }

        </>
    )

}

export default TutorialListComponent;


