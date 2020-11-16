import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions"
import classnames from "classnames";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentDidMount () {
        //If logged in and user navigates to login page, should redirect them to Dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/timeline");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/timeline") //Push user to dashboard when they login
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });

        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password,
        };
        
        this.props.loginUser(userData);
        const email_= this.state.email;
        localStorage.setItem('email',email_);
    };

    render() {
        const { errors } = this.state;

        return (
            <div className="container" style={{height:"85vh"}}>
                <div style={{ marginTop: "4rem" }} className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i>
                            Back to home
                        </Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px"}}>
                            <h4><b>Login</b> as a Student below</h4>
                            <p className="grey-text text-darken-1">
                                Don't have an account? <Link to="/register">Register</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    required
                                    className= {classnames("", {
                                        invalid: errors.email || errors.emailnotfound
                                    })}
                                />
                                <label htmlFor="email">Email</label>
                                <span className="error">
                                    {errors.email} 
                                    {errors.emailnotfound}
                                </span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    required
                                    className={classnames("",{
                                        invalid:errors.password || errors.passwordincorrect
                                    })}
                                />
                                <label htmlFor="password">Password</label>
                                <span className="error">
                                    {errors.password}
                                    {errors.passwordincorrect}
                                </span>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button 
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }} 
                                    type="submit"
                                    className= "btn btn-large waves-effect waves-light hoverable blue accent-3">
                                    Log In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
) (Login);