import React, { useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom"
import Navbar from '../layout/Navbar'

const Timeline = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch("/api/posts/allpost", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result=>{
            setData(result.posts)
        })
    }, [])

    return (
        <div>
            <Navbar />
                <div className="home" style={{margin:"auto", width:"50%"}}>
                
                {
                    data.map(item => {
                        return (
                            <div className="card home-card" key={item._id} style={{paddingLeft: "50px"}}>
                                <div className="row">
                                    <b style={{maxWidth: "750px"}}>
                                        {item.title}
                                    </b>
                                    <p style={{maxWidth: "750px"}}>
                                        {item.caption}
                                    </p>
                                    <div className="card-image">
                                        <img src={item.photo} style={{maxWidth: "500px"}}/>
                                    </div>
                                    <a href={item.event_url} target="_blank">
                                    <button 
                                        className="btn"
                                        style={{backgroundColor:"DodgerBlue",
                                                border: "None",
                                                color: "white",
                                                width:"500px",
                                                fontSize:"12px"}}
                                        ><i className="fa info-circle"></i>Interested? Click to know more!</button>
                                    </a>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Timeline;