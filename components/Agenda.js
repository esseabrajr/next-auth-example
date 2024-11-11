'use client'
import './App.css';
import React, {useState, useEffect} from 'react';
import EditCalendar from './EditCalendar';
import SchedulePanel from './SchedulePanel';
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import apiRequest from '@/app/apiRequest';

function Agenda({
    user,
    local,
    users,
    API_URL
}) {
  const schedule = local.agenda_instalacoes
  const today = new Date()
  const [dateValue, setDateValue] = useState(today)
  const name = `${user.pgrad.abreviatura} ${user.nome_guerra}`

  const getBrDate = (inputDate) => {
    const date = new Date(inputDate)
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();
    return (`${dd}/${mm}/${yyyy}`)
  }
  const [events, setEvents] = useState(schedule)

  return (
    <div className="App p-4 container-fluid">
      <h2 className='m-3'> Sistema de Agendamento do {local.name} </h2>
      <h3> Bem vindo {user.posto_grad.abreviatura} {user.nome_guerra} </h3>
      <div className='row'>
        <EditCalendar 
          className='col-6'
          dateValue={dateValue}
          setDateValue={setDateValue}
          getBrDate={getBrDate}
          events={events}
        />
        <SchedulePanel  
          className='col-6 container-fluid'
          dateValue={dateValue}
          getBrDate={getBrDate}
          events={events}
          setEvents={setEvents}
          user={user}
          users={users}
          API_URL={API_URL}
        />
      </div>
    </div>
  );
}

export default Agenda;
