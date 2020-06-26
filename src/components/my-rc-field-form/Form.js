import React from 'react'
import useForm from './useForm'
import FieldContext from './FieldContext'

export default function Form ({form, children, onFinish, onFailed}) {
  const [formInstance] = useForm(form)
  formInstance.setCallback ({
    onFinish,
    onFailed
  })
  return (
    <form
      onSubmit = {event => {
        event.preventDefault()
        event.stopPropagation()
        formInstance.submit()
      }}>
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  )
} 