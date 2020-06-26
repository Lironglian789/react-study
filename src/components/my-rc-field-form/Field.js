import React, {Component} from 'react'
import FieldContext from './FieldContext'

export default class Field extends Component {
  static contextType = FieldContext
  componentDidMount() {
    const {registerField} = this.context
    this.cancelRegisterField = registerField(this)
  }
  // 取消注册
  componentWillUnmount() {
    if (this.cancelRegisterField) {
      this.cancelRegisterField()
    }
  }
  onStoreChange () {
    this.forceUpdate()
  }
  getControled = () => {
    const {name} = this.props
    const {getFieldValue, setFieldValue} = this.context
    return {
      value: getFieldValue(name),
      onChange: event => {
        const newValue = event.target.value
        setFieldValue({[name]: newValue})
      }
    }
  }
  render () {
    const {children} = this.props
    const childrenNode = React.cloneElement(children, this.getControled())
    return childrenNode
  }
}