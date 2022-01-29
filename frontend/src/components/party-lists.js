import { useState, useEffect } from "react";
import { Navigate, Link } from 'react-router-dom';
import { useLocation } from "react-router";
import axios from "../http-common.js"

const PARTIES_URL = 'parties';
const JOIN_URL = 'parties/join';

const Parties = (props) => {
    const location = useLocation();

    const [parties, setParties] = useState([]);
    // const [partyMember, setPartyMember] = useState([]);

    useEffect(() => {
      retrieveParties();
    }, []);

    const retrieveParties = async () => {
      try {
        const response = await axios.get(PARTIES_URL);
        // console.log(response?.data[1].members);
        setParties(response.data);
      } catch (err) {
        console.log(err)
      }
    };

    const joinParty = async (party_id, user_email, party_name) => {
      try {
        const response = await axios.post(JOIN_URL, JSON.stringify({party_id: party_id, user_email: user_email}));
        // console.log(response?.data);
        alert(`Join party: ${party_name}`)
        retrieveParties()
      } catch (err) {
        console.log(err)
      }
    };

    const leaveParty = async (party_id, user_email, party_name) => {
      try {
        const response = await axios.delete(`${JOIN_URL}?party_id=${party_id}`,
          { data: {user_email: user_email} });
        // console.log(response);
        // console.log(party_id);
        // console.log(user_email);
        alert(`Leave party: ${party_name}`)
        retrieveParties()
      } catch (err) {
        console.log(err)
      }
    };

    const deleteParty = async (party_id, user_email, party_name) => {
      try {
        const response = await axios.delete(`${PARTIES_URL}?party_id=${party_id}`,
          { data: {user_email: user_email} });
        // console.log(response);
        // console.log(party_id);
        // console.log(user_email);
        alert(`Delete party: ${party_name}`)
        retrieveParties()
      } catch (err) {
        console.log(err)
      }
    };


    return ( <div>
        {props.user ? (
          <div>
            <div>
            <Link to={"/party/add-party"} className="btn btn-success btn-lg p-3">
                Add Party
                </Link>
            </div>
            <div>
            <div className="row p-3">
            {parties.map((party) => {
              let membersArr = party.members.map((member) => {
                return member?.user_email
              })
              // console.log(membersArr)
              return (
                <div className="col-lg-4 pb-1">
                  <div className="card">
                    {props.user.email === party.createdBy ?
                    <button 
                    onClick={() => deleteParty(party._id, props.user.email, party.name)} 
                    className='btn btn-secondary btn-sm position-absolute end-0'>Delete</button>
                     : 
                     <div></div>}
                    <div className="card-body">
                      <h5 className="card-title">{party.name}</h5>
                      <p className="card-text">
                        <strong>Create by: </strong>{party.createdBy}<br/>
                        <strong>Capacity: </strong> {party.members.length}/{party.maxCap}
                      </p>
                     
                        {membersArr.indexOf(props.user.email) !== -1 ? 
                        <div className="row">
                        <button 
                        className='btn btn-primary col-lg-5 mx-1 mb-1' disabled >Join</button>
                        <button 
                        onClick={() => leaveParty(party._id, props.user.email, party.name)} 
                        className='btn btn-secondary col-lg-5 mx-1 mb-1'>Leave</button>
                        </div>
                        :
                        <div className="row">
                          {party.members.length<party.maxCap? 
                          <button 
                          onClick={() => joinParty(party._id, props.user.email, party.name)} 
                          className='btn btn-primary col-lg-5 mx-1 mb-1'>Join</button>
                          :
                          <button 
                        className='btn btn-primary col-lg-5 mx-1 mb-1' disabled >Join</button>
                          }
                        
                        <button 
                        className='btn btn-secondary col-lg-5 mx-1 mb-1' disabled>Leave</button>
                        </div>
                        }
                      {/* <Link to={"/restaurants/"+restaurant._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                        View Reviews
                      </Link>
                      <a target="_blank" href={"https://www.google.com/maps/place/" + address} className="btn btn-primary col-lg-5 mx-1 mb-1">View Map</a> */}
                      
                    </div>
                  </div>
                </div>
              );
              })}
          </div>
          {/* <h2>TEST</h2> */}
            </div>
          </div>
      ) : (
      <div>
        <Navigate to="/" replace state={{ from: location }}/>
      </div>
      )}
    </div> );
}
 
export default Parties;