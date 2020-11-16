import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { organizerProfile, getOrganizerProfile } from "../../actions/authActions";
import NavbarOrganizer from '../layout/NavbarOrganizer'

class OrganizerProfile extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            mobileNo: "",
            address: "",
            pincode: "",
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
            mobileNo: this.state.mobileNo,
            address: this.state.address,
            pincode: this.state.pincode,
        };
        this.props.organizerProfile(newProfile, this.props.history);
        this.props.history.push("/timelineorganizer");
        var ema= localStorage.getItem('email');
        fetch("/api/organizer/profile/"+ ema,{
            method: 'put',
            headers:{"Content-type":"application/json"},
            body:JSON.stringify({
                name: newProfile.name,
                email: newProfile.email,
                password: newProfile.password,
                mobileNo: newProfile.mobileNo,
                address: newProfile.address,
                pincode: newProfile.pincode,
            })
        })
    };
    
    componentDidMount () {
        //If logged in and user navigates to register page, should redirect them to 
        var em= localStorage.getItem('email');
        fetch("/api/organizer/profile/"+em)
        .then(res => res.json())
        .then(data=>{
            // localStorage.setItem('user_name',data.data.userdata.name)
           this.setState({
            name: data.data.userdata.name,
            email: data.data.userdata.email,
            password: data.data.userdata.password,
            mobileNo: data.data.userdata.mobileNo,
            address: data.data.userdata.address,
            pincode: data.data.userdata.pincode,
            errors: {}
           })
       })
    }
    

    render() {
        const { errors } = this.state;
        var user= localStorage.getItem('user_name');
        return(
            <div>
                <NavbarOrganizer />
                <div className="container">
                <div className="row">
                    <form noValidate onSubmit={this.onSubmit}>
                        <div className="col s12 m6">
                            <label htmlFor="name" style={{fontSize:"20px"}}>Name of Organizer</label>
                            <input
                                onChange={this.onChange}
                                value={this.state.name}
                                error={this.state.name} 
                                id="name" 
                                type="text"
                            />  
                        </div>
                        <div className="col s12 m6">
                            <label htmlFor="address" style={{fontSize:"20px"}}>Address</label>
                            <input
                                onChange={this.onChange}
                                value={this.state.address}
                                error={this.state.address} 
                                id="address"
                                type="text"
                            />
                        </div>
                        <div className="col s12">
                            <label htmlFor="mobileNo" style={{fontSize:"20px"}}>Contact Number</label>
                            <input
                                onChange={this.onChange}
                                value={this.state.mobileNo}
                                error={this.state.mobileNo} 
                                id="mobileNo"
                                type="text"
                            />
                        </div>
                        <div className="col s12 m6">
                        <label htmlFor="pincode" style={{fontSize:"20px"}}>Pincode</label>
                            <input
                                onChange={this.onChange}
                                value={this.state.pincode}
                                error={this.state.pincode} 
                                id="pincode"
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

OrganizerProfile.propTypes = {
    organizerProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect (
    mapStateToProps,
    { organizerProfile }
)(OrganizerProfile);