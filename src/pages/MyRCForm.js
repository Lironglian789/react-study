import React, {Component} from 'react';
// import {createForm} from 'rc-form';
import createForm from '../components/my-rc-form/index';
import Input from '../components/Input';

const nameRules = {required: true, message: '请输入姓名'}
const passwordRules = {required: true, message: '请输入密码'}

@createForm
class MyRCForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }
  componentDidMount() {
    this.props.form.setFieldsValue({username: 'default'})
  }
  submit = () => {
    const {getFieldsValue, validateFields} = this.props.form
    console.log(getFieldsValue())
    validateFields((err, val) => {
      if (err) {
        console.log('err', err)
      } else {
        console.log('校验成功', val)
      }
    })
  }
  render () {
    // const {username, password} = this.state
    // console.log(this.props.form)
    const {getFieldDecorator} = this.props.form
    return (
      <div>
        <h3>MyRCForm</h3>
        {/* <Input value={username} onChange={e => this.setState({username: e.target.value})} />
        <Input value={password} onChange={e => this.setState({password: e.target.value})} /> */}
        {getFieldDecorator('username', {rules: [nameRules]})(<Input  placeholder='Username' />)}
        {getFieldDecorator('password', {rules: [passwordRules]})(<Input placeholder='Password' />)}
        <button onClick={this.submit}>submit</button>
      </div>
    )
  }
}

export default MyRCForm