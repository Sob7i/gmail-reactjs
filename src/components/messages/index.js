import React from 'react'

import useFetch from '../../lib/useFetch'

const Messages = () => {
  const { data } = useFetch('http://localhost:5000/messages')
  console.log(`data`, data)
  return (
    <div>
      {/* {!!data && <div>{ data.messages }</div>} */}
      there're messages
    </div>
  )
}

export default Messages