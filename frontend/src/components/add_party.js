import { useState } from "react";
import { Navigate} from 'react-router-dom';
import { useLocation } from "react-router";
import Form from "../utilities/Form.js";
import axios from "../http-common.js"

const ADD_URL = 'parties';

const AddParty = (props) => {
    const location = useLocation();

    const [partyName, setPartyName] = useState("");
    const [cap, setCap] = useState(5);
    const [validate, setValidate] = useState({});

    const validateParty = () => {
        let isValid = true;
    
        let validator = Form.validator({
          partyName: {
            value: partyName,
            isRequired: true,
            minLength: 6,
          },
          cap: {
            value: cap,
            isRequired: true,
          },
        });
    
        if (validator !== null) {
          setValidate({
            validate: validator.errors,
          });
          isValid = false;
        }

        if (isValid && isNaN(cap)) {
            setValidate({
              validate: {cap: ['Please insert number']},
            });
            isValid = false;
          }
        
        return isValid;
      };

    const registerData = async () =>{
        var data = {
            party_name: partyName, 
            user_email: props.user.email,
            cap: cap
      };
    try {
      const response = await axios.post(ADD_URL,
      JSON.stringify(data)
      );
      console.log(response?.data);
      setPartyName("");
      setCap(5);
      setValidate({});
      alert('Add party success \r\nClick Party Lists to go back Or add another');
        } catch (err) {
          console.log(err)
        }
  }

    const addParty = async (e) => {
        e.preventDefault();

        const validate = validateParty();
        if (validate) {
            registerData()
            // console.log( "validate Okay!!")
            // console.log(`cap: ${cap}`)
            // console.log(`isNaNcap: ${isNaN(cap)}`)
            // setValidate({});
        }
    }
    return ( <div>
        {props.user ? (
      <div >
        <div className="auth-main-col text-center">
        <div className="d-flex flex-column align-content-end">
          <div className="auth-body mx-auto">
            <h3>Add your new party</h3>
            <div> </div>
            <div className="auth-form-container text-start">
              <form
                className="auth-form"
                method="POST"
                onSubmit={addParty}
                autoComplete={"off"}
              >
                <div className="partyName mb-3">
                  <h5>Party Name:</h5>
                  <input
                    type="partyName"
                    className={`form-control ${
                      validate.validate && validate.validate.partyName
                        ? "is-invalid "
                        : ""
                    }`}
                    id="partyName"
                    name="partyName"
                    value={partyName}
                    placeholder="Please insert party name"
                    onChange={(e) => setPartyName(e.target.value)}
                  />
                  <div
                    className={`invalid-feedback text-start ${
                      validate.validate && validate.validate.partyName
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {validate.validate && validate.validate.partyName
                      ? validate.validate.partyName[0]
                      : ""}
                  </div>
                </div>


                <div className="cap mb-3">
                    <div><h5>Max members:</h5></div>
                    <input
                      type="number"
                      className={`form-control ${
                        validate.validate && validate.validate.cap
                          ? "is-invalid "
                          : ""
                      }`}
                      step={1}
                      name="cap"
                      id="cap"
                      value={cap}
                      placeholder="Please insert Max capacity"
                      onChange={(e) => setCap(parseInt(e.target.value, 10))}
                    />
                    <div
                    className={`invalid-feedback text-start ${
                      validate.validate && validate.validate.cap
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {validate.validate && validate.validate.cap
                      ? validate.validate.cap[0]
                      : ""}
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-success w-100 theme-btn mx-auto"
                  >
                    Add Party
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
      </div>
      ) : (
      <div>
        <Navigate to="/" replace state={{ from: location }}/>
      </div>
      )}

    </div> );
}
 
export default AddParty;