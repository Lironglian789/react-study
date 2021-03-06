import React, {Component} from 'react';

export default function createForm(Comp) {
  return class extends Component {
    constructor (props) {
      super(props)
      this.state = {}
      this.options = {}
    }
    handleChange = (e) => {
      const {name, value} = e.target
      this.setState({[name]: value})
    }
    getFieldDecorator = (field, option) => InputComp => {
      this.options[field] = option
      return React.cloneElement(InputComp, {
        name: field,
        value: this.state[field] || '',
        onChange: this.handleChange
      })
    }
    setFieldsValue = (newStore) => {
      this.setState(newStore)
    }
    getFieldsValue = () => {
      return this.state
    }
    validateFields = (callback) => {
      // 校验规则： this.options
      // 校验值： this.state
      let err = []
      for (let field in this.options) {
        if (this.state[field] === undefined) {
          err.push({[field]: 'error'})
        }
      }
      if (err.length === 0) {
        callback(null, this.state)
      } else {
        callback(err, this.state)
      }
    }
    getForm = () => {
      return {
        form: {
          getFieldDecorator: this.getFieldDecorator,
          setFieldsValue: this.setFieldsValue,
          getFieldsValue: this.getFieldsValue,
          validateFields: this.validateFields
        }
      }
    }
    render() {
      return <Comp {...this.props} {...this.getForm()} />
    }
  }
}