import SignIn from '../components/Signin'
import Router from 'next/router'
import { useEffect } from 'react'


const Login = () => {

    useEffect(() => {

        if(localStorage.getItem('token')){
            Router.push('/feeds')
        }

    },[])
    return ( 
        <SignIn/>
     );
}
 
export default Login;