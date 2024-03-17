import axios from "axios";

export function getProducts(){
    return function(dispatch){
        axios.get(`http://localhost:9090/products`).then((products)=>{
            //console.log(products.data, "AAAAction")
            dispatch({
                type: "GET_PRODUCTS",
                payload: products.data
            })
        })
        .catch((error)=>{
            console.error("ERROR FETCHING PRODUCTS", error)
        })
    }
}

