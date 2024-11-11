import React from 'react'
import { Badge } from 'react-bootstrap'

const EventBadge = ({
    number
}) => {
  return (
    <Badge bg="danger" className='position-absolute top-0 start-100 translate-middle'>{number}</Badge>
  )
}

export default EventBadge