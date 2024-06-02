// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonDataView,
  PokemonForm,
  PokemonInfoFallback,
} from '../pokemon'
import {useEffect, useState} from 'react'
import {ErrorBoundary} from 'react-error-boundary'

// class ErrorBoundary extends React.Component {
//   state = {error: null}
//
//   static getDerivedStateFromError(error) {
//     return {error}
//   }
//
//   render() {
//     const {error} = this.state
//     if (error) return <this.props.FallbackComponent error={error} />
//     return this.props.children
//   }
// }

const ErrorFallback = ({error, resetErrorBoundary}) => (
  <div role="alert">
    There was an error:{' '}
    <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    <button type="button" onClick={resetErrorBoundary}>
      Try again
    </button>
  </div>
)

function PokemonInfo({pokemonName}) {
  // const [status, setStatus] = useState('idle')
  // const [pokemon, setPokemon] = useState(null)
  // const [error, setError] = useState(null)
  const [state, setState] = useState({
    status: pokemonName ? 'pending' : 'idle',
  })
  const {status, error, pokemon} = state

  useEffect(() => {
    if (!pokemonName) return
    setState({status: 'pending'})
    fetchPokemon(pokemonName).then(
      pokemon => {
        setState({status: 'resolved', pokemon})
      },
      error => {
        setState({status: 'rejected', error})
      },
    )
  }, [pokemonName])

  if (status === 'idle') return 'Submit a pokemon'
  else if (status === 'pending')
    return <PokemonInfoFallback name={pokemonName} />
  else if (status === 'rejected') throw error
  else if (status === 'resolved') return <PokemonDataView pokemon={pokemon} />

  throw new Error('This should be impossible')
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => setPokemonName('')}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
