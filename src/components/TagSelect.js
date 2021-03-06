import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { fetchTags } from '../store'

class TagSelect extends Component {
  state = {
    selectedOptions: [],
  }

  componentDidMount() {
    this.setState({
      selectedOptions: this.props.tags
        .filter(tag => (this.props.activity ? tag.activity : tag.selected))
        .map(tag => this.mapTagToSelectElement(tag)),
    })
  }

  handleChange = selectedOptions => {
    this.setState({ selectedOptions })
    this.props.tagMethod(selectedOptions)
  }

  mapTagToSelectElement = tag => ({
    value: tag.name.toLowerCase(),
    label: tag.name,
    id: tag.id,
    key: tag.id,
  })

  render() {
    const { tags, text } = this.props
    let { selectedOptions } = this.state
    let options

    if (tags) {
      options = tags.map(tag => this.mapTagToSelectElement(tag))
    }
    return (
      <div className="group row selectInline">
        <div htmlFor="question col-6">{text}</div>
        <div className="inlineBtn">
          <Select
            className="mb-2 mt-2 mr-5 ml-5"
            value={selectedOptions}
            onChange={this.handleChange}
            options={options}
            isMulti
          />
        </div>
      </div>
    )
  }
}
const mapDispatch = dispatch => ({
  loadTags: () => dispatch(fetchTags()),
})
const mapState = state => ({
  tags: state.tags,
})
export default connect(
  mapState,
  mapDispatch
)(TagSelect)
