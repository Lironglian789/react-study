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
  // 第二个参数不传时，每次更新都会重新渲染，有参数则根据参数判断，发生改变则渲染，传空数组则只渲染一次
  useEffect(() => {
    console.log('form',  form)
  }, [form])
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