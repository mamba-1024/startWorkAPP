import { useState } from 'react'


export default () => {
  const [name, setName] = useState('公司')

  return <div>{name}</div>
}