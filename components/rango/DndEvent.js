import React from 'react'
import Button from 'react-bootstrap/Button';

const DndEvent = () => {
  const timeRanges = ['07:00','08:00','09:00','10:00','13:00','14:00','15:00','16:00']
  return (
    <div>
        <div>
            {timeRanges.map(
                (time) => <Button variant="primary">{time}</Button>
            )}
        </div>
    </div>
  )
}

export default DndEvent