import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userProfile,getProfile } from "../../actions/authActions";
import Navbar from '../layout/Navbar';
class Profile extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            collageName: "",
            gradYear: "",
            gender: "",
            dob: "",
            mobileNo: "",
            profilePic: "",
            interest1: "",
            interest2: "",
            interest3: "",         
            // value: '',
            errors: {}
        }; 
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value});
    };

    onSubmit = e => {
        e.preventDefault();

        const newProfile = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            collageName: this.state.collageName,
            gradYear: this.state.gradYear,
            gender: this.state.gender,
            dob: this.state.dob,
            mobileNo: this.state.mobileNo,
            profilePic: this.state.profilePic,
            interest1: this.state.interest1,
            interest2: this.state.interest2,
            interest3: this.state.interest3
        };
        this.props.userProfile(newProfile, this.props.history);
        this.props.history.push("/timeline");
        var ema= localStorage.getItem('email');
        fetch("/api/users/profile/"+ ema,{
            method: 'put',
            headers:{"Content-type":"application/json"},
            body:JSON.stringify({
                name: newProfile.name,
                email: newProfile.email,
                password: newProfile.password,
                firstName: newProfile.firstName,
                lastName: newProfile.lastName,
                collageName: newProfile.collageName,
                gradYear: newProfile.gradYear,
                gender: newProfile.gender,
                dob: newProfile.dob,
                mobileNo: newProfile.mobileNo,
                profilePic: newProfile.profilePic,
                interest1: newProfile.interest1,
                interest2: newProfile.interest2,
                interest3: newProfile.interest3
     
            })
        })
    };
    
    componentDidMount () {
        //If logged in and user navigates to register page, should redirect them to 
        var em= localStorage.getItem('email');
        fetch("/api/users/profile/"+em)
        .then(res => res.json())
        .then(data=>{
            // localStorage.setItem('user_name',data.data.userdata.name)
           this.setState({
            name: data.data.userdata.name,
            email: data.data.userdata.email,
            password: data.data.userdata.password,
            firstName: data.data.userdata.firstName,
            lastName: data.data.userdata.lastName,
            collageName: data.data.userdata.collageName,
            gradYear: data.data.userdata.gradYear,
            gender: data.data.userdata.gender,
            dob: data.data.userdata.dob,
            mobileNo: data.data.userdata.mobileNo,
            profilePic: data.data.userdata.profilePic,
            interest1: data.data.userdata.interest1,
            interest2: data.data.userdata.interest2,
            interest3: data.data.userdata.interest3,         
            errors: {}
           })
       })
    }
    

    render() {
        const { errors } = this.state;
        var user= localStorage.getItem('user_name');
        return(
            <div>
                <Navbar />
                    <div className="container">
                    <div className="row">
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="col s12 m6">
                                <label htmlFor="firstName" style={{fontSize:"20px"}}>First Name</label>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.firstName}
                                    error={this.state.firstName} 
                                    id="firstName" 
                                    type="text"
                                />  
                            </div>
                            <div className="col s12 m6">
                                <label htmlFor="lastName" style={{fontSize:"20px"}}>Last Name</label>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.lastName}
                                    error={this.state.lastName} 
                                    id="lastName"
                                    type="text"
                                />
                            </div>
                            <div className="col s12">
                                <label htmlFor="collageName" style={{fontSize:"20px"}}>College Name</label>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.collageName}
                                    error={this.state.collageName} 
                                    id="collageName"
                                    type="text"
                                />
                            </div>
                            <div className="col s12 m6">
                            <label htmlFor="gradYear" style={{fontSize:"20px"}}>Graduation Year</label>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.gradYear}
                                    error={this.state.gradYear} 
                                    id="gradYear"
                                    type="text"
                                />
                            </div>
                            <div className="col s12 m6">
                                <label htmlFor="dob" style={{fontSize:"20px"}}>Date of birth (dd-mm-yyyy)</label>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.dob}
                                    error={this.state.dob}
                                    id="dob"
                                    type="text"
                                />
                            </div>
                            <div className="col s12 m6">
                                <label htmlFor="gender" style={{fontSize:"20px"}}>Gender</label>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.gender}
                                    error={this.state.gender} 
                                    id="gender"
                                    type="text"
                                />
                            </div>
                            <div className="col s12 m6">
                                <label htmlFor="mobileNo" style={{fontSize:"20px"}}>Mobile No.</label>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.mobileNo}
                                    error={this.state.mobileNo}
                                    id="mobileNo"
                                    type="text"
                                />
                            </div>
                            <div className="col s4">
                                <label htmlFor="interest1" style={{fontSize:"20px"}}>Interest 1:</label>
                                <input 
                                    onChange={this.onChange}
                                    value={this.state.interest1}
                                    error={this.state.interest1}
                                    id="interest1"
                                    type="text"
                                />
                            </div>
                            <div className="col s4">
                                <label htmlFor="interest2" style={{fontSize:"20px"}}>Interest 2:</label>
                                <input 
                                    onChange={this.onChange}
                                    value={this.state.interest2}
                                    error={this.state.interest2}
                                    id="interest2"
                                    type="text"
                                />
                            </div>
                            <div className="col s4">
                                <label htmlFor="interest3" style={{fontSize:"20px"}}>Interest 3:</label>
                                <input 
                                    onChange={this.onChange}
                                    value={this.state.interest3}
                                    error={this.state.interest3}
                                    id="interest3"
                                    type="text"
                                />
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button
                                    style={{
                                        width: "250px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type= "submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                    >
                                    Save your profile
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};

Profile.propTypes = {
    userProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect (
    mapStateToProps,
    { userProfile }
)(Profile);
