import React, {useState} from 'react'

const EditEvent = ({
  event,
  events,
  setEvents,
  isEditing,
  setIsEditing
}) => {

  const [value, setValue] = useState(event.desc ? event.desc : "");

  const handleOnChange = (e) => {
      e.preventDefault();
      setValue(e.target.value);
  }

  const onSave = () => {
      setEvents(
        events.map((line) => line.start === event.start ? {...line, desc: value} : line)
      )
      setIsEditing(false);
  }

  return (
    <>
      {isEditing ? <textarea
        className='m-2 w-75'
        value={value} 
        placeholder='justificativa' 
        onChange={(e) => handleOnChange(e)}
        onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === "Escape") {
            onSave(value);
            event.preventDefault();
            event.stopPropagation();
            }
        }}
        onBlur={() => onSave(value)}
      /> : <div className='m-2' onDoubleClick={() => setIsEditing(true)}>{event.desc ? event.desc : "Justificativa [se for o caso] (clique duplo para adicionar)"}</div>}
    </>
  )
}

export default EditEvent