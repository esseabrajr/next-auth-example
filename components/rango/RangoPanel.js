import React, {useState} from 'react'
import EditEvent from './RangoEvent';
import DaySchedule from './DaySchedule';
import { Card } from 'react-bootstrap'

const RangoPanel = ({
    className,
    dateValue,
    getBrDate,
    events,
    setEvents,
    user,
    API_URL
}) => {
    const today = new Date()
    today.setHours(6,0,0,0)
    const [over, setOver] = useState(today)
    const [isEditing, setIsEditing] = useState(false);

    const scheduledEvent = events.find((line) => line.date === over.toISOString())

    const getWeek = (date) => {
        const selectDate = new Date(date)
        const today = new Date().setHours(0,0,0,0)
        
        // Move to first day of the week
        selectDate.setDate(selectDate.getDate() - selectDate.getDay())

        const week = []
        for (let index = 0; index < 7; index++) {
            if (selectDate >= today){
                // Return day
                week.push(selectDate.toString())               
            }
            // Add a day
            selectDate.setDate(selectDate.getDate() + 1)
        }
        return(week)
    }

  return (
    <div className={className}>
        {getWeek(dateValue).map(
            (day) => {
                return (
                <DaySchedule 
                    key={day} 
                    day={day}
                    getBrDate={getBrDate}
                    user={user}
                    events={events}
                    setEvents={setEvents}
                    over={over}
                    setOver={setOver}
                    setIsEditing={setIsEditing}
                    API_URL={API_URL}
                />)
            }
        )}
    <Card className='m-2'>
        <Card.Title>
            {over.toISOString()}
        </Card.Title>
        <Card.Body>
            {scheduledEvent ? 
            <EditEvent 
                event={scheduledEvent}
                events={events}
                setEvents={setEvents}
                isEditing={isEditing} 
                setIsEditing={setIsEditing}
            /> : "Justificativa [se for o caso]"}
        </Card.Body>
    </Card>
    </div>
  )
}

export default RangoPanel