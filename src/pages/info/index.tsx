import { useState } from 'react'


export default () => {
  const [name, setName] = useState('tom')

  return <div>{name}</div>
}