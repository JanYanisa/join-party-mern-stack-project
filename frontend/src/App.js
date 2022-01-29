import React from "react";
import {Routes, Route, Link , Navigate} from "react-router-dom";
import { useLocation } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Login from "./components/login.js";
import Register from "./components/register.js";
import Forgot from "./components/forgot.js";
import Parties from "./components/party-lists.js";
import Party from "./components/party.js";
import AddParty from "./components/add_party.js";

function App() {
  const [user, setUser] = React.useState(null);
  const location = useLocation();

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null)
  }

  return (
    <div >
      { user ? (
      <nav className="navbar navbar-expand navbar-dark bg-primary">
        <div className="navbar-brand">
        <Link to={"/party"} className="nav-link text-light">
              Party Lists
            </Link>
        </div>
        <div className="navbar-nav mr-auto">
          <li className="nav-item" >
              <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                Logout {user.email} {user.id}
              </a>
          </li>
        </div>
      </nav>
      ):(
      <div></div>
      )}

      <div className="container mt-3">
         <Routes>
          <Route 
            path="/"
            element={<Login
              login={login}
            />}
          />
          <Route 
            path="/login"
            element={<Login
              login={login}
            />}
          />
          <Route 
            path="/register"
            element={<Register
              />}
          />
          <Route 
            path="/forgot-password"
            element={<Forgot
              />}
          />
          <Route 
            path="/party"
            element={<Parties
              user={user}
            />}
          />
          <Route 
            path="/party/:id"
            element={<Party
              user={user}
            />}
          />
          <Route 
            path="/party/add-party"
            element={<AddParty
              user={user}
            />}
          />
        <Route 
            path="*"
            element={<Party
              user={user}
            />}
          />
        </Routes>
      </div>

    </div>
  );
}

export default App;
