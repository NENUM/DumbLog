import React from 'react'
import useStateContext from '../hooks/useStateContext'
import Center from './Center'

export default function Home() {
  const {context, setContext} = useStateContext()

  return (
    <Center>
      {context.email}
    </Center>
  )
}
