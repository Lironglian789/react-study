import {TEXT} from './const';

// vnode 虚拟dom node 真实dom
// 把vnode变成node，然后把node插入到父容器中
function render (vnode, container) {
  // console.log('vnode', vnode)
  // vnode -> node
  const node = createNode(vnode)
  container.appendChild(node)
}

// 根据传入的vnode，返回node
function createNode (vnode) {
  const {type, props} = vnode
  let node
  if (type === TEXT) {
    node = document.createTextNode('')
  } else if (typeof type === 'string') {
    node = document.createElement(type)
  } else if (typeof type === 'function') {
    //  函数组件，类组件都走到这里
    node = type.isReactComponent
    ? updateClassComponent(vnode)
    : updateFunctionCpmponent(vnode)
  } else {
    // console.log(node);
    node = document.createDocumentFragment()
  }
  reconcilerChildren (props.children, node)
  updateNode(node, props)
  return node
}

// 遍历子节点
function reconcilerChildren (children, node) {
  for (let i = 0; i < children.length; i++) {
    let child = children[i]
    // childe 是node
    // vnode => 真实dom节点， 再把真实dom节点插入到父节点当中
    render (child, node)
  }
}

// 处理文本节点
function updateNode (node, nextValue) {
  Object.keys(nextValue).filter(k => k !== 'children').forEach(k => {
    if (k.slice(0, 2) === 'on') {
      let eventName = k.slice(2).toLowerCase()
      node.addEventListener(eventName, nextValue[k])
    } else {
      node[k] = nextValue[k]
    }
  })
}

// 处理函数式组件
function updateFunctionCpmponent (vnode) {
  const {type, props} = vnode
  const vvnode = type(props)
  const node = createNode(vvnode)
  return node
}

// 类组件
function updateClassComponent (vnode) {
  const {type, props} = vnode
  const copm = new type(props)
  const vvnode = copm.render()
  const node = createNode(vvnode)
  return node
}

// function updateClassComponent(vnode) {
//   const {type, props} = vnode;
//   const cmp = new type(props);
//   const vvnode = cmp.render();
//   const node = createNode(vvnode);
//   return node;
// }

export default {render}