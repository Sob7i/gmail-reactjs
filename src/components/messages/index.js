import React from 'react'

import useFetch from '../../lib/useFetch'

const Messages = () => {
  const { data, error } = useFetch('http://localhost:5000/messages')
  if (error) console.error(error)
  const { messages } = data

  return (
    <div>
      <ul>
        {(messages || []).map(msg => (
          <li key={msg.id}>
            {msg.snippet}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Messages