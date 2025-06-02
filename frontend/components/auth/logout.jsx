import React, { useContext } from 'react'
import { Button } from '../ui/button'
import { UserContext } from '@/providers/user-context'

const Logout = () => {
  const {logout} = useContext(UserContext);
  return (
    <Button variant="outline" onClick={() => logout()}>Logout</Button>
  )
}

export default Logout
