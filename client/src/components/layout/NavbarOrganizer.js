import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, getOrganizerProfile } from "../../actions/authActions";

class NavbarOrganizer extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    onProfileClick = e => {
        e.preventDefault();
        this.props.getOrganizerProfile();
        this.props.history.push("/profile");
    };

    render() {
        return (
            <div className="navbar">
                <nav className="z-depth-0">
                    <div className="nav-wrapper">
                        <Link
                            to="/timelineorganizer"
                            style={{
                                fontFamily: "monospace"
                            }}
                            className="brand-logo">
                            <i className="material-icons">event</i>
                            EventsBook        
                        </Link>
                        <ul className="right">
                            <li>
                                <Link
                                    to="/organizerprofile"
                                    style={{
                                        fontFamily: "monospace"
                                    }}
                                    className="right hide-on-med-and-down">
                                    {/* <i className="material-icons">account_box</i> */}
                                    <span onClick={this.onProfileClick}></span>Profile        
                                </Link>        
                            </li>
                            <li>
                                <Link
                                    to="/createPost"
                                    style={{
                                        fontFamily: "monospace"
                                    }}
                                    className="right hide-on-med-and-down">
                                    {/* <i className="material-icons">account_box</i> */}
                                    <span>Post an Event</span>       
                                </Link>        
                            </li>
                            <li>
                                <Link
                                    style={{
                                        fontFamily: "monospace"
                                    }}
                                    className="right hide-on-med-and-down">
                                    {/* <i className="material-icons">account_box</i> */}
                                    <span onClick={this.onLogoutClick}>Logout</span>       
                                </Link>        
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

NavbarOrganizer.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    // getOrganizerProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect (
    mapStateToProps,
    { logoutUser }
)(NavbarOrganizer);