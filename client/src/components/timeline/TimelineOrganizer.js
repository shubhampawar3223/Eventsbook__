import React, { useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom"
import NavbarOrganizer from '../layout/NavbarOrganizer'

const TimelineOrganizer = () => {
    const [data, setData] = useState([])
    const username = localStorage.getItem('user_name');
    // console.log(username)
    useEffect(() => {
        fetch("/api/posts/allposts/" + username, {
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
            <NavbarOrganizer />
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
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
    )
}

export default TimelineOrganizer;