import React from 'react'
import './style.css'
function Catetgory_card({icon , name , onClickHandle}) {
  return (
    <div
    onClick={onClickHandle}
     className='category_card'>
       <img src= {icon} />
       <div className='category_name'>{name}</div>
    </div>
  )
}

export default Catetgory_card
