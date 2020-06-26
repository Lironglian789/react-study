import React, { Component } from 'react'
import {ThemeContext, UserContext} from '../Context'

class ConsumerPage extends Component {
  render() { 
    return (
      <div>
        <h3>ConsumerPage</h3>
        <ThemeContext.Consumer>
          {context => (
            <div className={context.themeColor}>
              I'm a consumer
              <UserContext.Consumer>
                {user => (
                  <p>{user.name}</p>
                )}
              </UserContext.Consumer>
            </div>
          )}
        </ThemeContext.Consumer>
      </div>
    )
  }
}
 
export default ConsumerPage