import React, {useState, useCallback, PureComponent} from 'react'

export default function UseCallbackPage (props) {
  const [count, setCount] = useState(0)
  const [value, setValue] = useState('')
  const addClick = useCallback(() => {
    let sum = 0
    for (let i = 0; i < count; i++) {
      sum += 1
    }
    return sum
  }, [count])
  
  return (
    <div>
      <h3>UseCallbackPage</h3>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>add</button>
      <input value={value} onChange={event => setValue(event.target.value)} />
      <Child addClick={addClick} />
    </div>
  )
}

class Child extends PureComponent {
  render () {
    console.log("child render");
    const {addClick} = this.props;
    return (
      <div>
        <h3>Child</h3>
        <button onClick={() => console.log(addClick())}>add</button>
      </div>
    )
  }
}
