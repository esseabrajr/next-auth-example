import React, {useEffect, useState} from 'react'
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import EventBadge from './EventBadge';
import { IoMdCalendar } from "react-icons/io";
import EventDot from './EventDot';

const EditCalendar = ({
  className,
  dateValue,
  setDateValue,
  getBrDate,
  events
}) => {

  function sameDay(data1, data2) {
    const d1 = new Date(data1)
    const d2 = new Date(data2)
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }

  useEffect (
    () => {
      //console.log(getBrDate(dateValue))
    }
    , [dateValue])

  const getEventBadge = (date, view) => {
    const hours = events.filter((line) => sameDay(line.date,date)).map((line) => new Date(line.start).getHours())
    return (view === 'month' && hours.length > 0 ? <EventDot hours={hours}/> : <div style={{width: "3px", height: "3px", backgroundColor: "transparent"}}></div>)
  }

  const getValidDate = (date) => {
    const today = new Date()
    today.setHours(0,0,0,0)
    const isValid = date >= today
    return (
      isValid ? 'btn btn-light position-relative overflow-visible' : 'btn btn-light position-relative overflow-visible disabled'
    )
  }
  
  return (
    <div className={className}>
      <Calendar calendarType='gregory' className='calendar' onChange={setDateValue} value={dateValue} tileClassName={({date}) => getValidDate(date)} tileContent={({ date, view }) => getEventBadge(date,view)}/>
    </div>
  )
}

export default EditCalendar