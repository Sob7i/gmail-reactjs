import { useState, useEffect } from 'react'
import GoogleLogin from 'react-google-login'

import Messages from './components/messages'
import './App.css';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  const given_name = localStorage.getItem('given_name')

  const handleLogin = async googleData => {
    if (!googleData) return

    const { code } = googleData

    const res = await fetch("http://localhost:5000/signin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": JSON.stringify({ code })
      }
    })

    const data = await res.json()
    setUser(data)
    localStorage.setItem('given_name', data.given_name)

    const { access_token } = data
    localStorage.setItem('access_token', access_token)

    return setLoggedIn(true)
  }

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) setLoggedIn(true)

    return () => setLoggedIn(false)
  }, [])

  return (
    <div className='App'>
      <div className='login-wrapper'>
        {
          isLoggedIn
            ?
            <>
              <div>welcome {given_name}</div>
              <Messages />
            </>
            :
            <GoogleLogin
              clientId={process.env.REACT_APP_GMAIL_CLIENT_ID}
              buttonText='Log in with Google'
              onSuccess={handleLogin}
              onFailure={handleLogin}
              cookiePolicy='single_host_origin'
              accessType='offline'
              responseType='code'
              prompt='consent'
              scope={'https://www.googleapis.com/auth/gmail.modify'}
            />
        }
      </div>
    </div>
  );
}

export default App;
