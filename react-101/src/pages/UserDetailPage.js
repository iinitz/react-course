import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import PageTitle from '../components/PageTitle'

const UserDetailPage = (props) => {
  console.log(props)
  const { match: { params: { userId } } } = props
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const getUserById = async () => {
      setLoading(true)
      const response = await fetch(`http://localhost:8000/users/${userId}`)
      const data = await response.json()
      setUser(data)
      setLoading(false)
    }
    getUserById()
  }, [userId])
  if (loading) {
    return (
      <h3>Loading ...</h3>
    )
  }
  if (!user) {
    return (
      <h3>User id: {userId} not found</h3>
    )
  }
  return (
    <Fragment>
      <PageTitle title="User detail" />
      <h3>ID: {user.id}</h3>
      <h3>Name: {user.name}</h3>
      <h3>Email: {user.email}</h3>
      <h3>Role: {user.role}</h3>
      <h3>Active: {user.active}</h3>
    </Fragment>
  )
}
UserDetailPage.propTypes = {
  match: PropTypes.shape().isRequired,
}

export default UserDetailPage
