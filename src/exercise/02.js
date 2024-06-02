// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {useEffect, useRef, useState} from 'react'

// const getItem = key => window.localStorage.getItem(key)
// const setItem = (key, value) => window.localStorage.setItem(key, value)
// const useLocalStorageState = (key, getItem, setItem) => {
//   const [value, setValue] = useState(() => getItem(key))
//   useEffect(() => {
//     setItem(key, value)
//   }, [key, value])
//   return [value, setValue]
// }
const useLocalStorageState = (
  key,
  defaultValue = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) => {
  const [value, setValue] = useState(() => {
    const localStorageValue = window.localStorage.getItem(key)
    if (localStorageValue) return deserialize(localStorageValue)
    if (typeof defaultValue === 'function') defaultValue()
    return defaultValue
  })

  const previousKey = useRef(key)

  useEffect(() => {
    if (previousKey.current !== key)
      window.localStorage.removeItem(previousKey.current)
    previousKey.current = key
    window.localStorage.setItem(key, serialize(value))
  }, [key, value, serialize])

  return [value, setValue]
}

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  // const [name, setName] = React.useState(
  //   () => window.localStorage.getItem('name') ?? initialName,
  // )

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  // useEffect(() => {
  //   window.localStorage.setItem('name', name)
  // }, [name])

  // const useLocalStorageState = key => {
  //   const [value, setValue] = useState(() => window.localStorage.getItem(key))
  //   useEffect(() => {
  //     window.localStorage.setItem(key, value)
  //   }, [value])
  //   return [value, setValue]
  // }
  // const [name, setName] = useLocalStorageState('name', getItem, setItem)
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
