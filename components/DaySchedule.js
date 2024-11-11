import React, {useState} from 'react'
import { Badge } from 'react-bootstrap'
import apiRequest from '@/app/apiRequest';

const DaySchedule = ({
    day,
    getBrDate,
    events,
    setEvents,
    user,
    users,
    over,
    setOver,
    API_URL
}) => {

    const hours = [
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16
    ]

    function genRandomID (){
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$-_.!*()';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 12) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
      }

    const dbPostSchedule = async (data) => {
        const postOptions = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        };
        const reqUrl = `${API_URL}/agenda/post`;
        const result = await apiRequest(reqUrl,postOptions);
        if (result) console.log(result);
    }

    const createEvent = (start) => {
        const startHour = new Date(day)
        startHour.setHours(start,0,0,0)
        const endHour = new Date(day)
        endHour.setHours(start+1,0,0,0)
        const id = genRandomID()
        setEvents([
            ...events.filter((line) => line.start !== startHour.toString()),
            {
                id: id,
                userId: user.cpf,
                date: day,
                start: startHour.toISOString(),
                end: endHour.toISOString()
            }
        ])
        setOver(startHour);
        dbPostSchedule({
            id: id,
            user: user.cpf, 
            local: 1,
            date: day,
            start: startHour.toISOString(),
            end: endHour.toISOString(),
            desc: ""
        })
    }

    const dbDeleteSchedule = async (id) => {
        const updateOptions = {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const reqUrl = `${API_URL}/agenda/${id}/delete`;
        const result = await apiRequest(reqUrl,updateOptions);
        if (result) console.log(result);
      }

    const deleteEvent = async (hour) => {
        const eventId = events.find((line) => line.start == hour).id
        setEvents(events.filter((line) => line.start !== hour))
        dbDeleteSchedule(eventId)
    }

  return (
    <div className='day-schedule row'>
        <div className='btn btn-secondary position-relative col-2'>{getBrDate(day)}</div>
        {
            hours.map(
                (hour) => {
                    const eventHour = new Date(day)
                    eventHour.setHours(hour,0,0,0)
                    const setEvent = events.find((line) => line.start === eventHour.toISOString())
                    const isSet = events.filter((line) => line.start === eventHour.toISOString()).length > 0
                    const styleClass = 
                      eventHour > Date.now() ? 
                        setEvent ? 
                          setEvent.userId === user.cpf ? 'day-hour btn btn-primary position-relative col-1' : 'day-hour btn btn-success position-relative col-1'
                        : 'day-hour btn btn-light position-relative col-1' 
                      : 'day-hour btn btn-light position-relative disabled col-1'
                    const eventUser = setEvent ? users.find( (line) => line.cpf === setEvent.userId ) : {}
                    const handleOnclick = !setEvent ? createEvent : () => {setOver(eventHour)}

                    return(<div 
                            onClick={() => handleOnclick(hour)}
                            //onMouseOver={() => handleMouseOver(eventHour)}
                            key={genRandomID()} 
                            className={styleClass}
                            >
                                <div>{`${hour}:00`}</div>
                                <div style={{fontSize: "0.8vw", minHeight: "1.2vw"}}>{setEvent ? `${eventUser.posto_grad.abreviatura} ${eventUser.nome_guerra}` : ""}</div>
                                { setEvent && setEvent.userId === user.cpf && eventHour > Date.now() ? 
                                    <Badge 
                                        bg="danger"
                                        className='position-absolute top-0 start-100 translate-middle close-badge'
                                        onClick={() => deleteEvent(eventHour.toISOString())}
                                    >x</Badge>
                                : ""}
                            </div>)
                }
            )
        }
    </div>
  )
}

export default DaySchedule