import React from 'react'
import { GiCoffeeCup } from "react-icons/gi";
import { IoSunny } from "react-icons/io5";
import { IoIosMoon } from "react-icons/io";


const EventDot = ({
    selected
}) => {

  return (
    <div className="d-flex flex-row justify-content-center" style={{width: "100%", height: "3px"}}>
        <GiCoffeeCup style={{display: selected.includes(0) ? "block" : "none"}}/>
        <IoSunny style={{display: selected.includes(9) ? "block" : "none"}}/>
        <IoIosMoon style={{display: selected.includes(13) ? "block" : "none"}}/>
    </div>
  )
}

export default EventDot