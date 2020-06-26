import React, { useEffect } from 'react'
import Form, {Field} from '../components/my-rc-field-form'
import Input from '../components/Input'

const nameRules = {required: true, message: '请输入姓名'}
const passwordRules = {required: true, message: '请输入密码'}

export default function RCFieldForm () {
  const [form] = Form.useForm()
  const onFinish = val => {
    console.log('onFinish:', val)
  }
  const onFailed = val => {
    console.log('onFailed:', val)
  }
  useEffect(() => {
    console.log('form',  form)
  }, [])
  return (
    <div>
      <h3>MyRCFieldForm</h3>
      <Form form={form} onFinish={onFinish} onFailed={onFailed}>
        <Field name='userName' rules={[nameRules]}>
          <Input />
        </Field>
         <Field name='password' rules={[passwordRules]}>
          <Input />
        </Field>
        <button type='submit'>Submit</button>
      </Form>
    </div>
  )
}