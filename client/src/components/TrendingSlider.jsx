import "./TrendingSlider.css";
import TrendingItem from "./TrendingItem";
import { BiSolidLeftArrowAlt, BiSolidRightArrowAlt } from "react-icons/bi"


function TrendingSlider() {
  const slideLeft = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 235;
  };

  const slideRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 235;
  };

  return (
    <div className="trending">
      <div className="container">
        <div className="title-btns">
          <h3>Trending Now</h3>
          <div className="btns">
            <button title="scroll left" onClick={slideLeft}>
              <BiSolidLeftArrowAlt />
            </button>
            <button title="scroll right" onClick={slideRight}>
              <BiSolidRightArrowAlt />
            </button>
          </div>
        </div>
        <div className="row-container" id="slider">
          <TrendingItem />
        </div>
      </div>
    </div>
  );
}

export default TrendingSlider;
