'use client'
import React from 'react'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css'
import { 
        Card, 
        CardTitle, 
        CardBody, 
        CardText, 
        CardImg, 
        CardLink 
      } from 'react-bootstrap'


const Agendamento = () => {
    return (
        <Card style={{ width: '18rem', padding: "0px", margin: "3px" }} role='button' onClick={() => window.open("/agenda/1")}>
          <CardImg style={{ height: '16rem', objectFit: "cover" }} variant="top" src="/instalacao_1.png" />
          <CardBody>
            <CardTitle>Agendamento de Instalações</CardTitle>
          </CardBody>
        </Card>
      )
}

export default Agendamento