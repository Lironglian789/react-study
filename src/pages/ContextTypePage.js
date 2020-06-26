import React, { Component } from 'react'
import {ThemeContext} from '../Context'

class ContextType extends Component {
  static contextType = ThemeContext
  componentDidMount() {
    console.log(this.context)
  }
  render() { 
    const {themeColor} = this.context
    return (
      <div className='border'>
        <h3 className={themeColor}> ContextTypePage</h3>
      </div>
    )
  }
}
 
export default ContextType;