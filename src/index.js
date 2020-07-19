import './index.css';
// import React, {Component, useState} from 'react';
// import ReactDOM from 'react-dom';

import React from './kreact';
import ReactDOM, {useState} from './kreact/kreact-dom';
import Component  from './kreact/Component';

// import UseMemoPage from './pages/UseMemoPage'
// import UseCallbackPage from './pages/UseCallbackPage'

function FunctionComponent (props) {
  const [count, setCount] = useState(1)
  function handleClick() {
    console.log('omg');
    setCount(count + 1)
  }
  return <div className="border">
    FunctionComponent-{props.name}
    <button onClick={handleClick}>{count}</button>
    {count%2? <button>click</button> : <span>omg</span>}
  </div>
}

class ClassComponent extends Component {
  static defaultProps = {
    color: 'green'
  }
  render () {
    return (
      <div className="border">
        ClassComponent-{this.props.name}
        <p className={this.props.color}>color</p>
      </div>
    )
  }
}

const jsx = (
  <div>
    <p>全栈</p>
    <a href="https://www.kaikeba.com/">开课吧</a>
    <FunctionComponent name="function" />
    <ClassComponent name='class' />

    {/* homework */}
    {/* <UseMemoPage /> */}
    {/* <UseCallbackPage /> */}
  </div>
)

ReactDOM.render(
  jsx,
  document.getElementById('root')
)

