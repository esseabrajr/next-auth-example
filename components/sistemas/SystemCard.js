'use client'
import React from 'react'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css'
import { 
        Card, 
        CardTitle, 
        CardBody, 
        CardImg, 
      } from 'react-bootstrap'

const SystemCard = ({
    title,
    img,
    link
}) => {
    return (
        <Card style={{ width: '18rem', padding: "0px", margin: "3px" }} role='button' onClick={() => window.open(link,"_self")}>
          <CardImg style={{ height: '16rem', objectFit: "cover" }} variant="top" src={img} />
          <CardBody>
            <CardTitle>{title}</CardTitle>
          </CardBody>
        </Card>
      )
}

export default SystemCard