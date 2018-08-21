import axios from 'axios'

export const GET_MATCHES = 'GET_MATCHES',
  ADD_MATCH = 'ADD_MATCH'

const getMatches = matches => ({ type: GET_MATCHES, matches }),
  addMatch = match => ({ type: ADD_MATCH, match })

export const fetchMatches = () => async dispatch => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}api/matches`
    )
    dispatch(getMatches(data))
  } catch (e) {
    console.error(e)
  }
}

export const matchWith = id => async dispatch => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}api/matches/${id}`
    )
    if (data !== 'OK') {
      dispatch(addMatch(data))
    } else {
      dispatch(getMatches(data))
    }
  } catch (e) {
    console.error(e)
  }
}
const initialState = []
const matches = (state = initialState, action) => {
  switch (action.type) {
    case GET_MATCHES: {
      return action.matches
    }
    case ADD_MATCH: {
      return [...state, action.match]
    }
    default: {
      return state
    }
  }
}

export default matches
