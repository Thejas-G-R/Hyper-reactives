import React from 'react';
import "./404Page.scss"


const PageNotFound = () =>{

    return (
        <div className="errorbody">
        <div className="cont">
            <img className="ops" src="/404.svg" />
            <br />
            <h3 >Page not found</h3>
        </div>
        </div>
    )

}


export default PageNotFound;