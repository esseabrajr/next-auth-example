import React, {useState} from 'react'
import { Badge } from 'react-bootstrap'
import apiRequest from '@/app/apiRequest'

const DaySchedule = ({
    day,
    getBrDate,
    events,
    setEvents,
    user,
    over,
    setOver,
    setIsEditing,
    API_URL
}) => {

    const hours = [
        0,
        9,
        13
    ]

    const meals = [
        "Café",
        "Almoço",
        "Janta"
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
        const reqUrl = `${API_URL}/rango/post`;
        const result = await apiRequest(reqUrl,postOptions);
        if (result) console.log(result);
    }
    const createEvent = (start) => {
        const today = new Date()
        const startHour = new Date(day)
        if (today.getDate() === startHour.getDate()){
            alert("Arranchamentos para o mesmo dia devem ser justificados!")
            setIsEditing(true); 
        }
        if (startHour.getDay() === 0 || startHour.getDay() === 6 ){
            alert("Arranchamentos para o final de semana devem ser justificados!")
            setIsEditing(true); 
        }
        if (startHour.getDay() === 5 && start > 0){
            alert("Arranchamentos para almoço e janta de sextas-feiras devem ser justificados!")
            setIsEditing(true); 
        }
        startHour.setHours(start,0,0,0)
        const endHour = new Date(day)
        endHour.setHours(start+1,0,0)
        const eventID = genRandomID()
        setEvents([
            ...events.filter((line) => line.start !== startHour.toString()),
            {
                id: eventID,
                user: user.cpf,
                date: startHour.toISOString(),
            }
        ])
        setOver(startHour);
        dbPostSchedule({
            id: eventID,
            user: user.cpf,
            date: startHour.toISOString(),
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
        const reqUrl = `${API_URL}/rango/${id}/delete`;
        const result = await apiRequest(reqUrl,updateOptions);
        if (result) console.log(result);
    }

    const deleteEvent = (hour) => {
        const eventId = events.find((line) => line.date == hour.toISOString()).id
        setEvents(events.filter((line) => line.date !== hour.toISOString()))
        dbDeleteSchedule(eventId)
    }

  return (
    <div className='day-schedule row'>
        <div className='btn btn-success position-relative col-2 center-content'>{getBrDate(day)}</div>
        {
            hours.map(
                (hour) => {
                    const eventHour = new Date(day)
                    eventHour.setHours(hour,0,0)
                    const isSet = events.filter((line) => line.date === eventHour.toISOString()).length > 0
                    const styleClass = eventHour > Date.now() ? isSet ? 'day-hour btn btn-primary position-relative col-2' : 'day-hour btn btn-light position-relative col-2' : 'day-hour btn btn-light position-relative disabled col-2'
                    const handleOnclick = !isSet ? createEvent : () => {setOver(eventHour)}
                    const handleMouseOver = (eventHour) => {
                        if (over.toString() !== eventHour.toString()){
                            setOver(eventHour)
                        }
                    }

                    return(<div 
                            onClick={() => handleOnclick(hour)}
                            //onMouseOver={() => handleMouseOver(eventHour)}
                            key={genRandomID()} 
                            className={styleClass}
                            >
                                <div>{meals[hours.indexOf(hour)]}</div>
                                <div className="center-content" style={{fontSize: "9px", minWidth: "60px", minHeight: "15px"}}>{isSet ? "Selecionado" : ""}</div>
                                { isSet ? 
                                    <Badge 
                                        bg="danger"
                                        className='position-absolute top-0 start-100 translate-middle close-badge'
                                        onClick={() => deleteEvent(eventHour)}
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