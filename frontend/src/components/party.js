import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useLocation } from "react-router";

const Party = (props) => {
    const location = useLocation();
    let {id} = useParams();

    return ( <div>
        {props.user ? (
      <div >
        Hello party!! {id}
      </div>
      ) : (
      <div>
        <Navigate to="/" replace state={{ from: location }}/>
      </div>
      )}

    </div> );
}
 
export default Party;