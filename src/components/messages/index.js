import React from 'react'

import useFetch from '../../lib/useFetch'

const Messages = () => {
  const { data } = useFetch('http://localhost:5000/messages')

  return (
    <div>
      {!!data && <div>{ data }</div>}
    </div>
  )
}

export default Messages