import axios from 'axios'
import history from '../history'

const GET_USER_TRAITS = 'GET_USER_TRAITS'

const getTraitValues = userTraits => ({
  type: GET_USER_TRAITS,
  userTraits,
})

export const setTraitValues = userTraitValues => async dispatch => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}api/user/traits`, {
      userTraitValues,
    })
    dispatch(getTraitValues(data))
    history.push('/options')
  } catch (err) {
    console.error(err)
  }
}

let initialState = []
const userTraits = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_TRAITS: {
      return action.userTraits
    }
    default: {
      return state
    }
  }
}

export default userTraits
