import React from 'react'
import { HOC } from './HOC'

const HomePage = () => {
  return (
    <>
      <div className='mt-5 ms-2' >
        <h1>Home Page</h1>
      </div>
    </>
  )
}

export default HOC(HomePage)
