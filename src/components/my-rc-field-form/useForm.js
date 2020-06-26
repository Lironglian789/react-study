import {useRef} from 'react'

class FormStore {
  constructor (props) {
    this.store = {}
    this.fieldEntities = []
    this.callbacks = {}
    this.getFieldValue = this.getFieldValue.bind(this)
  }
  registerField = (field) => {
    this.fieldEntities.push(field)
    return () => {
      this.fieldEntities = this.fieldEntities.filter(item => item !== field)
      delete this.store[this.field.props.name]
    }
  }
  getFieldValue (name) {
    return this.store[name]
  }
  getFieldsValue = () => {
    return this.store
  }
  // 更新store，更新组件
  setFieldValue = (newStore) => {
    this.store = {...this.store, ...newStore}
    this.fieldEntities.forEach(entities => {
      const {name} = entities.props
      Object.keys(newStore).forEach(key => {
        if (key === name) {
          entities.onStoreChange()
        }
      })
    })
  }
  validate = () => {
    let err = []
    this.fieldEntities.forEach(entities => {
      const {name, rules} = entities.props
      let value = this.store[name]
      let rule = rules && rules[0]
      if (rule && rule.required && (name === undefined || value === '' || value === undefined)) {
        err.push({
          [name]: rule.message,
          value
        })
      }
    })
    return err
  }
  setCallback = (callback) => {
    this.callbacks = {
      ...this.callbacks,
      ...callback
    }
  }
  submit = () => {
    let err = this.validate()
    if (err.length === 0) {
      this.callbacks.onFinish(this.store)
    } else if (err.length > 0) {
      this.callbacks.onFailed() 
    }
  }
  getForm = () => {
    return {
      setCallback: this.setCallback,
      submit: this.submit,
      registerField: this.registerField,
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldValue: this.setFieldValue
    }
  }
}

export default function useForm (form) {
  const formRef = useRef()
  if (!formRef.current) {
    if (form) {
      formRef.current = form
    } else {
      const formStore = new FormStore()
      formRef.current = formStore.getForm()
    }
  }
  return [formRef.current]
}