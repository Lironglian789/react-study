import {TEXT} from './const';

function createElement (type, config, ...children) {
  // 删除自带的多余属性
  if (config) {
    delete config.__self
    delete config.__source
  }
  const props = {
    ...config,
    children: children.map(child => typeof child === 'object'? child : createTextNode(child))
  }
  // 处理defaultProps
  // console.log(type)
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps
    for (let propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName]
      }
    }
  }
  return {type, props}
}

// 为方便，处理成一样的格式
function createTextNode (text) {
  return {
    type: TEXT,
    props: {
      children: [],
      nodeValue: text
    }
  }
}

export default { createElement } 