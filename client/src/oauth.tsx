import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

function Oauth({ onLogin }: { onLogin: () => void }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    onLogin?.()
    navigate("/courses")
  }, [searchParams])

  return(<></>)
}

export default Oauth
