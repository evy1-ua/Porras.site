import React from "react";
import './User_info.css'

function UserInfo({user}){
    return(
        <div className="row user-info">
            <img className="" src="https://thumbs.dreamstime.com/b/vector-de-perfil-avatar-predeterminado-foto-usuario-medios-sociales-icono-183042379.jpg" alt="" />
            <p className="col">Eric Vivancos</p>
            <span className="col">Alumno</span>
            <span className="col-md-3">Curso de Guitarra Española</span>
            <span className="col">27/07/2000</span>
            <span className="col">icono</span>

        </div>
    )
}

export default UserInfo;