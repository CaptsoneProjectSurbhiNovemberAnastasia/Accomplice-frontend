import React from 'react'

const RadioForm = props => {
  const { values, question, handleChange, handleClick, answer } = props

  return (
    <div>
      <div>{question.question}</div>
      <br />
      <form>
        <div>
          {values.map(value => (
            <input
              className="radio-buttons"
              type="radio"
              key={value}
              value={value}
              onChange={handleChange}
              checked={+answer === value}
            />
          ))}
        </div>
        <div className="scale ">
          <p className="mr-4">Disagree</p>
          <p className="mr-4">Neutral</p>
          <p className="ml-2"> Agree</p>
        </div>
        <div>
          <button
            type="button"
            onClick={function(evt) {
              handleClick(evt, question.id)
            }}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  )
}

export default RadioForm
