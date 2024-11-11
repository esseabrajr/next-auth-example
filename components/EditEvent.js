import React, {useState} from 'react'
import apiRequest from '../app/apiRequest';

const EditEvent = ({
  event,
  events,
  setEvents,
  API_URL
}) => {

  const [isEditing, setIsEditing] = useState(false);

  const [value, setValue] = useState(event.desc ? event.desc : "");

  const handleOnChange = (e) => {
      e.preventDefault();
      setValue(e.target.value);
  }

  const dbUpdateEvent = async (data) => {
    const updateOptions = {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    const reqUrl = `${API_URL}/agenda/${event.id}/patch`;
    const result = await apiRequest(reqUrl,updateOptions);
    if (result) console.log(result);
  }

  const onSave = () => {
      setEvents(
        events.map((line) => line.start === event.start ? {...line, desc: value} : line)
      )
      dbUpdateEvent({
        desc: value
      })
      setIsEditing(false);
  }

  return (
    <>
      <div>{event.user}</div>
      {isEditing ? 
        <textarea
        className='m-2 w-75'
        value={value} 
        placeholder='descrição da atividade' 
        onChange={(e) => handleOnChange(e)}
        onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === "Escape") {
            onSave(value);
            event.preventDefault();
            event.stopPropagation();
            }
        }}
        onBlur={() => onSave(value)}
      /> : <div className='m-2' onDoubleClick={() => setIsEditing(true)}>{event.desc ? event.desc : "Atividade sem descrição (clique duplo para editar)"}</div>}
    </>
  )
}

export default EditEvent