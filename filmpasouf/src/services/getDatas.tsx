import axios from 'axios';
import { useState, useEffect } from 'react'

const useGetDatas = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()
  const [response, setResponse] = useState() as any

  useEffect(() => {
    fetch("https://imr3-react.herokuapp.com/backend")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoading(false)
          setResponse(result)
        },
        (error) => {
          setIsLoading(false)
          setError(error)
        }
      )
  }, [])

  return { isLoading, error, response }
}

export default useGetDatas

