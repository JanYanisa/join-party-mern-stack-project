
import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import Form from "../utilities/Form.js";
import 'font-awesome/css/font-awesome.min.css';
import axios from "../http-common.js"

const CHECK_URL = 'users/auth/reg';
const REG_URL = 'users';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPass, setVerifyPass] = useState("");
  const [validate, setValidate] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [checkTerm, setCheckTerm] = useState(false);

  const navigate = useNavigate()

  const validateRegister = () => {
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
      verifyPass: {
        value: verifyPass,
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
    
    if (password !== verifyPass && isValid){
      setValidate({
        validate: {verifyPass: ['The Comfirm Password is not match with the Password']}
      });
      isValid = false;
    }

    if (!checkTerm && isValid) {
      isValid = false;
    }
    return isValid;
  };

  const registerData = async () =>{
        var data = {
        user_email: email,
        password: password
      };
    try {
      const response = await axios.post(REG_URL,
      JSON.stringify(data)
      );
      setEmail("");
      setPassword("");
      setVerifyPass("");
      setValidate({});
      setShowPassword(false);
      setCheckTerm(false);
      alert('Register success!!/r/n Please sign-in');
      navigate("/login")
        } catch (err) {
          console.log(err)
        }
  }
  const checkRegister = async () =>{
    try {
      const response = await axios.post(CHECK_URL,
      JSON.stringify({email: email})
      );
      // console.log(response?.data);
      (response.data.message? 
         registerData()
        : alert( "This E-mail is already registered"))
        } catch (err) {
          console.log(err)
        }

  }

  const register = async (e) => {
    e.preventDefault();

    const validate = validateRegister();
    if (validate) {
      // console.log( "validate Okay!!")
      checkRegister();
    }
  }
  

  const togglePassword = (e) => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  return (
    <div >

      <div className="auth-main-col text-center">
        <div className="d-flex flex-column align-content-end">
          <div className="auth-body mx-auto">
            <p>Create your Account</p>
            <div className="auth-form-container text-start">
              <form
                className="auth-form"
                method="POST"
                onSubmit={register}
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
                </div>

                <div className="password mb-3">
                  <div className="input-group">
                    <input
                      type={"password"}
                      className={`form-control ${
                        validate.validate && validate.validate.verifyPass
                          ? "is-invalid "
                          : ""
                      }`}
                      name="verifyPass"
                      id="verifyPass"
                      value={verifyPass}
                      placeholder="Recheck - Password"
                      onChange={(e) => setVerifyPass(e.target.value)}
                    />

                    <div
                      className={`invalid-feedback text-start ${
                        validate.validate && validate.validate.verifyPass
                          ? "d-block"
                          : "d-none"
                      }`}
                    >
                      {validate.validate && validate.validate.verifyPass
                        ? validate.validate.verifyPass[0]
                        : ""}
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-check">
                    <input 
                    className= {`form-check-input ${
                      !checkTerm
                        ? "is-invalid "
                        : ""
                    }`} 
                    aria-describedby="checkTermFeedback"
                    type="checkbox"
                    id="checkTerm"
                    checked={checkTerm}
                    onChange={(e) => setCheckTerm(e.currentTarget.checked)}
                    />

                    <label className="form-check-label"
                    
                    >
                      Agree to terms and conditions
                    </label>
                    <div id="checkTerm" className= {`invalid-feedback text-start ${
                        !checkTerm
                          ? "d-block"
                          : "d-none"
                      }`}>
                      { !checkTerm
                        ? "You must agree before submitting."
                        : ""}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 theme-btn mx-auto"
                  >
                    Sign Up
                  </button>
                </div>
              </form>

              <hr />
              <div className="auth-option text-center pt-2">
                Have an account?{" "}
                <Link className="text-link" to="/login">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;