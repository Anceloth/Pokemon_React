import React from "react";

import lord_vader from "../assets/static/img/darki.jpg";

const NotFound = (props) => {
  return (
    <div className="container">
      <div className="row main__orders d-flex align-items-center">
        <div className="col-12 col-md-6 text-center text-md-right">
          <img src={lord_vader} alt="master" />
        </div>
        <div className="col-12 col-md-6 text-center text-md-left">
          <span className="e404">404</span> <br />
          <h2 className="text-danger">Página no encontrada</h2>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
