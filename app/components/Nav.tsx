'use client'
import React from 'react'


export default function Nav(){

    return (
        <div className="mb-14">
        <div className="header fixed top-0 left-0 right-0 h-16 bg-gray-900 flex justify-between items-center px-4 ">
            <div className="logo pl-8">
                <img src="/logo.png" alt="Logo" className=" h-10" /> 
            </div>
            <div className="header-container flex justify-end items-center space-x-4 max-w-screen-lg text-14px pr-4 text-white font-termina  font-normal">
                <a href="#">Trascendencias</a>
                <a href="#">Horario</a>
                <a href="#">Ubicacion</a>
                <a href="#">Historia</a>
                <a href="#">Vacantes</a>
                <a href="#">Patrocinadores</a>
            </div>
        </div>
    </div>
    )
}