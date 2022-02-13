import SignUp from '../components/Signup'
import Router from 'next/router'
import { useEffect } from 'react'

export default function Home() {

  useEffect(() => {

    if(localStorage.getItem('token')){
        Router.push('/feeds')
    }

},[])

  return (
    <SignUp/>
  )
}
