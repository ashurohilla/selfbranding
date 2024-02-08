import React from 'react'
import Navbar from '../navbar/navbar'
import {Input} from "../../components/ui/input"

export default function page() {
  return (
    <div>
        <Navbar/>
        <form action="submit">name
          <label htmlFor="name">
          <Input/>
          </label>
          <label htmlFor="website">webite
          <Input/>
          </label>
          <label htmlFor="youtuber">youtube
          <Input/>
          </label>s
          <label htmlFor="instagram">instagram
          <Input/>
          </label>
          <button className='text-2xl text-blue-400 bg-green-300 rounded mt-2 flex justify-center' type='submit'>create profile </button>
        </form>
         </div>
  )
}
