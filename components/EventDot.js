import React from 'react'

const EventDot = ({
    hours
}) => {
  return (
    <div className="d-flex flex-row justify-content-center" style={{width: "100%", height: "3px"}}>
        {hours.map((line) => <div key={line} className="p-0" style={{width: "3px", height: "3px", backgroundColor: "blue", margin: "2px"}}></div>)}
    </div>
  )
}

export default EventDot