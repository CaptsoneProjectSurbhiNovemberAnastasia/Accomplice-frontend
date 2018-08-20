import axios from 'axios'
import history from '../history'
axios.defaults.withCredentials = true

// ACTION TYPES
const GET_USER = 'GET_USER'
const LOGOUT_USER = 'LOGOUT_USER'

// INITIAL STATE
const defaultUser = {}

// ACTION CREATORS
const getUser = user => ({
    type: GET_USER,
    user
  }),
  logOutUser = () => ({
    type: LOGOUT_USER
  })

// THUNK CREATORS

export const me = () => async dispatch => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}auth/me`)
    const {
      activity,
      age,
      description,
      email,
      facebookId,
      firstName,
      lastName,
      id,
      latitude,
      longitude
    } = data
    const user = {
      activity,
      age,
      description,
      email,
      facebookId,
      firstName,
      lastName,
      id,
      latitude,
      longitude
    }
    dispatch(getUser(user || defaultUser))
  } catch (e) {
    console.error(e)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`${process.env.REACT_APP_API_URL}auth/${method}`, {
      email,
      password
    })
  } catch (authError) {
    return dispatch(getUser({ error: authError }))
  }
  try {
    dispatch(getUser(res.data))
    if (res.data.firstName === null) {
      history.push('/profile')
    } else {
      history.push('/question')
    }
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}
export const facebookauth = (
  email,
  firstName,
  imageUrl,
  method
) => async dispatch => {
  let res
  try {
    res = await axios.post(`${process.env.REACT_APP_API_URL}auth/${method}`, {
      email,
      firstName,
      imageUrl
    })
    console.log('Response from facebook calle is ', res)
  } catch (authError) {
    return dispatch(getUser({ error: authError }))
  }
  try {
    console.log('passing data  ', res.data)
    dispatch(getUser(res.data))
    if (res.data.firstName === null) {
      history.push('/profile')
    } else {
      history.push('/question')
    }
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}
export const logout = () => async dispatch => {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}auth/logout`)
    dispatch(logOutUser())
    localStorage.clear()
    history.push('/')
  } catch (err) {
    console.log(err)
  }
}
// editUser expects the state's currentUser.id, and updated info to be prepackaged into a single, nested object
export const updateUser = updateInfo => async dispatch => {
  try {
    console.log(updateInfo)
    const id = updateInfo.id
    const { data } = await axios.put(
      `${process.env.REACT_APP_API_URL}api/user/${id}`,
      updateInfo
    )
    dispatch(getUser(data))
  } catch (err) {
    console.log(err)
  }
}

export const deleteAccount = userId => dispatch => {
  dispatch(logOutUser())
  axios
    .delete(`${process.env.REACT_APP_API_URL}api/userAccount/${userId}`)
    .catch(err => console.log(err))
}

// REDUCER

export default function currentUser(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case LOGOUT_USER:
      return defaultUser
    default:
      return state
  }
}
