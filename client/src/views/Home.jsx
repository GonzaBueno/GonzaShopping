import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/actions";
import ProductCard from "../components/ProductCard";
import Banner from "../components/Banner";

import Banner1 from "../images/Banners/banner1.jpg"

export default function Home() {
  const dispatch = useDispatch()
  let allProducts = useSelector((state) => state.products)
  
  //console.log(allProducts,"PRODUCTOSSS")

  useEffect(()=>{
    if(!allProducts.length){
      dispatch(getProducts())
    }
  },[dispatch])

  return (
    <>
  
      <Banner
      title='JO JO JO JE JE JE'
      text= 'ASDASDASDASD ASDASDa dasdasdasdasafklmorfrf rgtrghrththrthrty'
      img={Banner1}
      />
      
      
      <div>
        {allProducts && allProducts.length ? allProducts.map((el)=>{
          return(
            <ProductCard
              key={el.id}
              id={el.id}
              title={el.title}
              price={el.price}
              description={el.description}
              category={el.category}
              image={el.image}
            />
          )
        })
        : null}
      </div>
    </>
  );
}
