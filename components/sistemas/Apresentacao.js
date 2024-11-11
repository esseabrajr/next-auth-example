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

const Apresentacao = () => {
  return (
    <Card style={{ width: '18rem', padding: "0px", margin: "3px" }} role='button' onClick={() => window.open("http://10.41.57.44/sistemas/apresentacao/inicial.php")}>
      <CardImg style={{ height: '16rem', objectFit: "cover" }} variant="top" src="/continencia.webp" />
      <CardBody>
        <CardTitle>Apresentação</CardTitle>
      </CardBody>
    </Card>
  )
}

export default Apresentacao