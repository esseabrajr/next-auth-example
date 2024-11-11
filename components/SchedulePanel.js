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
    user,
    users,
    API_URL
}) => {
    const now = new Date();
    const [over, setOver] = useState(now)

    const scheduledEvent = events.find((line) => line.start === over.toISOString())
    const eventUserData = scheduledEvent ? users.find((line) => scheduledEvent.userId === line.cpf) : ""

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
                    users={users}
                    events={events}
                    setEvents={setEvents}
                    over={over}
                    setOver={setOver}
                    API_URL={API_URL}
                />)
            }
        )}
    <Card className='m-2'>
        <Card.Title>
            {over.toString()}
        </Card.Title>
        <Card.Body>
            {scheduledEvent ? <p>Agendado por {eventUserData.posto_grad.abreviatura} {eventUserData.nome_guerra} <a target="_blank" href={"https://wa.me/55"+eventUserData.celular.match(/\d/g).join("")}>{eventUserData.celular}</a></p> : ""}
            {scheduledEvent ?
                user.cpf === eventUserData.cpf ? 
                <EditEvent 
                    event={scheduledEvent}
                    events={events}
                    setEvents={setEvents}
                    API_URL={API_URL}
                />  : <p>{scheduledEvent.desc}</p>
            : "Nenhuma atividade prevista"}
        </Card.Body>
    </Card>
    </div>
  )
}

export default SchedulePanel