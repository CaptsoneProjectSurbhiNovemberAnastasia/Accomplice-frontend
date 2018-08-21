import axios from 'axios'

export const GET_S3_IMAGE_URL = 'GET_S3_IMAGE_URL'

const getS3ImageUrl = s3ImageUrl => ({
  type: GET_S3_IMAGE_URL,
  s3ImageUrl
})

export const uploadS3Image = formData => async dispatch => {

  await axios
    .post(`${process.env.REACT_APP_API_URL}api/awsupload/s3-upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      let imageUrl = response.data.Location
      dispatch(getS3ImageUrl(imageUrl))
    })
    .catch(error => {
      console.error(error)
    })
}

const s3ImageUrl = (state = [], action) => {
  switch (action.type) {
    case GET_S3_IMAGE_URL: {
      return action.s3ImageUrl
    }
    default: {
      return state
    }
  }
}

export default s3ImageUrl
