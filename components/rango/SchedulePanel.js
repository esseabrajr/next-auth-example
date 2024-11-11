import React, {useState} from 'react'
import EditEvent from './EditEvent';
import DaySchedule from './DaySchedule';
import { Card } from 'react-bootstrap'

const SchedulePanel = ({
    className,
    dateValue,
    getBrDate,
    events,
    setEvents,
    user
}) => {
    
    const [over, setOver] = useState("")
    const [isEditing, setIsEditing] = useState(false);

    const scheduledEvent = events.find((line) => line.start === over.toString())

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
                />)
            }
        )}
    <Card className='m-2'>
        <Card.Title>
            {over.toString()}
        </Card.Title>
        <Card.Body>
            {scheduledEvent ? 
            <EditEvent 
                event={scheduledEvent}
                events={events}
                setEvents={setEvents}
                isEditing={isEditing} 
                setIsEditing={setIsEditing}
            /> : "Nenhuma atividade prevista"}
        </Card.Body>
    </Card>
    </div>
  )
}

export default SchedulePanel