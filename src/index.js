import './index.css';
// import React, {Component} from 'react';
// import ReactDOM from 'react-dom';

import React from './kreact';
import ReactDOM from './kreact/kreact-dom';
import Component  from './kreact/Component';

function FunctionComponent (props) {
  function handleClick() {
    console.log(11)
  }
  return <div className="border">
    FunctionComponent-{props.name}
    <button onClick={handleClick}>点击</button>
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
    {/* Fragment 的两种写法*/}
    {/* 1. <></> 无法传参 */}
    {/* 2.  <React.Fragment></React.Fragment> 可以传参 */} 
    {/* {
      [1,2].map(item => (
        <React.Fragment key={item}>
           {item}
        </React.Fragment>
      ))
    } */}
    <> 
      <h1>1</h1>
      <h2>2</h2>
    </>
  </div>
)

ReactDOM.render(
  jsx,
  document.getElementById('root')
)

