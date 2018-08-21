import React from 'react'

const UserProfileForm = props => {
  const { handleSubmit, user, handleFileUpload } = props

  return (
    <form
      className="justify-content-center"
      onSubmit={function(evt) {
        handleSubmit(evt, user)
      }}
    >
      <div className="form-row w-auto">
        <div className="form-group col-sm-12 text-left mb-0">
          <div className="">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              defaultValue={user.firstName}
            />
          </div>
          <div className="control">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              defaultValue={user.lastName}
            />
          </div>
          <div className="control">
            <label htmlFor="age">Age</label>
            <input
              type="text"
              name="age"
              className="form-control"
              defaultValue={user.age}
            />
          </div>
          <div className="control">
            <label htmlFor="imageUrl">Profile Picture URL</label>
            <input
              type="text"
              name="imageUrl"
              className="form-control"
              defaultValue={user.imageUrl}
            />
            <input
              label="upload file"
              name="uploadFile"
              type="file"
              onChange={handleFileUpload}
            />
          </div>
          <div className="control">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              rows="3"
              name="description"
              className="form-control"
              defaultValue={user.description}
            />
          </div>
          <div className="form-button row marginRight ">
            <button className="mb-1 mt-2 btnfontsize" type="submit">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default UserProfileForm
