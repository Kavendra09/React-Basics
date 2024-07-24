import React from 'react'
import '../App.css'

const Username = ({name,content}) => {
  return (
    <>
    <div className='card'>
    <div className='card h2'>{name}</div>
    <div className='card p'>{content}</div>
    </div>
    </>
  )
}

export default Username