import React from "react";

export const Modal = ({ icon, title, body, type=null}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close">&times;</span>
        <h2>Modal Title</h2>
        <p>This is a modal window.</p>
      </div>
      <div className="modal-body">
        <img src={icon} alt="Icon" />
        <h2>{title}</h2>
        <p>{body}</p>
        {type == "info" ? (
          <button className="btn btn-primary">Aceptar</button>
        ) : (
          <div className="modal-footer">
            <button className="btn btn-secondary">Cancelar</button>
            <button className="btn btn-primary">Aceptar</button>
          </div>
        )}
      </div>
    </div>
  );
};
