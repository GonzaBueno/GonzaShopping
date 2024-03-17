import React from "react";

export default function ProductCard(props){
    return(
        <>
        <p>{props.title}</p>
        <img 
        src={props.image}
        alt= "img"
        width= "150px"
        height= "150px"
         />
        </>
    )
}