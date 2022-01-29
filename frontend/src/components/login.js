import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import Form from "../utilities/Form.js";
import 'font-awesome/css/font-awesome.min.css';
import axios from "../http-common.js"

const LOGIN_URL = 'users/auth';

const Login = (props) => {
    const [remember, setRemember] = useState(false);
    const [validate, setValidate] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate()

    const validateLogin = () => {
      let isValid = true;
  
      let validator = Form.validator({
        email: {
          value: email,
          isRequired: true,
          isEmail: true,
        },
        password: {
          value: password,
          isRequired: true,
          minLength: 6,
        },
      });
  
      if (validator !== null) {
        setValidate({
          validate: validator.errors,
        });
  
        isValid = false;
      }
      return isValid;
    };

  
    const authenticate = async (e) => {
      e.preventDefault();
  
      const validate = validateLogin();
      if (validate) {
        try {
          const response = await axios.post(LOGIN_URL,
              JSON.stringify({ email: email})
          );
          if(response?.data?.password === password){
            props.login({email: email});
            
            setValidate({});
            setRemember(false);
            setShowPassword(false);
            setPassword('');
            setEmail('');
            navigate('/party');
          } else{
            alert( "Password is not match!!")
          }
            } catch (err) {
              if (!err?.response) {
                alert('No Server Response');
            } else if (err.response?.status === 404) {
                alert('E-mail is not register');
            } else {
                alert('Login Failed');
            }
            }
        
      }
    };
  
    const togglePassword = (e) => {
      if (showPassword) {
        setShowPassword(false);
      } else {
        setShowPassword(true);
      }
    };
  
    return (
      <div>
  
        <div className="auth-main-col text-center">
          <div className="d-flex flex-column align-content-end">
            <div className="auth-body mx-auto">
              <p>Login to your account</p>
              <div className="auth-form-container text-start">
                <form
                  className="auth-form"
                  method="POST"
                  onSubmit={authenticate}
                  autoComplete={"off"}
                >
                  <div className="email mb-3">
                    <input
                      type="email"
                      className={`form-control ${
                        validate.validate && validate.validate.email
                          ? "is-invalid "
                          : ""
                      }`}
                      id="email"
                      name="email"
                      value={email}
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
  
                    <div
                      className={`invalid-feedback text-start ${
                        validate.validate && validate.validate.email
                          ? "d-block"
                          : "d-none"
                      }`}
                    >
                      {validate.validate && validate.validate.email
                        ? validate.validate.email[0]
                        : ""}
                    </div>
                  </div>
  
                  <div className="password mb-3">
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`form-control ${
                          validate.validate && validate.validate.password
                            ? "is-invalid "
                            : ""
                        }`}
                        name="password"
                        id="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
  
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                        onClick={(e) => togglePassword(e)}
                      >
                        <i
                          className={
                            showPassword ? "fa fa-eye" : "fa fa-eye-slash"
                          }
                        ></i>{" "}
                      </button>
  
                      <div
                        className={`invalid-feedback text-start ${
                          validate.validate && validate.validate.password
                            ? "d-block"
                            : "d-none"
                        }`}
                      >
                        {validate.validate && validate.validate.password
                          ? validate.validate.password[0]
                          : ""}
                      </div>
                    </div>
  
                    <div className="extra mt-3 row justify-content-between">
                      <div className="col-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="remember"
                            checked={remember}
                            onChange={(e) => setRemember(e.currentTarget.checked)}
                          />
                          <label className="form-check-label" htmlFor="remember">
                            Remember me
                          </label>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="forgot-password text-end">
                          <Link to="/forgot-password">Forgot password?</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary w-100 theme-btn mx-auto"
                    >
                      Log In
                    </button>
                  </div>
                </form>
  
                <hr />
                <div className="auth-option text-center pt-2">
                  No Account?{" "}
                  <Link className="text-link" to="/register">
                    Sign up{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Login;