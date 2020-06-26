import React, {Component} from 'react'
import {ThemeContext, UserContext} from '../Context'
import ConsumerPage from './ConsumerPage'
import ContextTypePage from './ContextTypePage'


class ContextPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      theme: {
        themeColor: 'red'
      },
      user: {
        name: '小明'
      }
    }
  }
  changeColor = () => {
    const {themeColor} = this.state.theme
    this.setState ({
      theme: {themeColor: themeColor ==='red'? 'green' : 'red'}
    })
  }
  render() { 
    const {theme, user} = this.state
    return (
      <div>
        <h3>ContextPage</h3>
        <ThemeContext.Provider value={theme}>
          <UserContext.Provider value={user}>
            <ConsumerPage/>
          </UserContext.Provider>
          <ContextTypePage/>
        </ThemeContext.Provider>
        <button onClick={this.changeColor}>change color</button>
      </div>
    )
  }
}
 
export default ContextPage;