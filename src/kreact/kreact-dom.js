import {TEXT, PLACEMENT} from './const';
// 下一个单元任务
let nextUnitOfWork = null
// work in progress fiber root
let wipRoot = null
// fiber 的结构：
// {
//   type, // 标记类型
//   props, // 属性值
//   child, // 第一个子元素
//   sibling, // 下一个兄弟元素
//   return, // 父节点
//   node, // 当前节点的真实dome对象
//   base // 存储旧的fiber
// }

// vnode 虚拟dom node 真实dom
// 把vnode变成node，然后把node插入到父容器中
function render (vnode, container) {
  // console.log('vnode', vnode)
  // vnode -> node
  // const node = createNode(vnode)
  // container.appendChild(node)
  wipRoot = {
    node: container,
    props: {
      children: [vnode]
    }
  }
  nextUnitOfWork = wipRoot
}

// 根据传入的vnode，返回node
function createNode (vnode) {
  const {type, props} = vnode
  let node
  if (type === TEXT) {
    node = document.createTextNode('')
  } else if (typeof type === 'string') {
    node = document.createElement(type)
  }
  // else if (typeof type === 'function') {
  //   //  函数组件，类组件都走到这里
  //   node = type.isReactComponent
  //   ? updateClassComponent(vnode)
  //   : updateFunctionComponent(vnode)
  // }
  else {
    // console.log(node);
    // 源码当中没有创建节点，我这里简单处理了
    node = document.createDocumentFragment()
  }
  // reconcileChildren (props.children, node)
  updateNode(node, props)
  return node
}

// 函数式组件
function updateFunctionComponent (fiber) {
  const {type, props} = fiber
  const children = [type(props)]
  reconcileChildren(fiber, children)
}

// 类组件
function updateClassComponent (fiber) {
  const {type, props} = fiber
  const copm = new type(props)
  const children = [copm.render()]
  reconcileChildren(fiber, children)
}

// 协调子节点
function reconcileChildren (workInProgressFiber,children) {
  // for (let i = 0; i < children.length; i++) {
  //   let child = children[i]
  //   // childe 是node
  //   // vnode => 真实dom节点， 再把真实dom节点插入到父节点当中
  //   if (Array.isArray(child)) {
  //     for(let j = 0; j < child.length; j++) {
  //       render (child[j], node)
  //     }
  //   } else {
  //     render (child, node)
  //   }
  // }
  // 记录上一个兄弟元素
  let prevSibling = null
  for (let i = 0; i < children.length; i++) {
    let child = children[i]
    let newFiber = {
      type: child.type,
      props: child.props,
      node: null, // 初次渲染为空
      base: null, // 初次渲染为空
      return: workInProgressFiber,
      effectTag: PLACEMENT
    }
    // 形成链表结构
    if (i === 0) { // 第一个子节点
      workInProgressFiber.child = newFiber
    } else {
      // 上一次的fiber的sibiling指向这一个的fiber
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
  }
}

// 处理文本节点
function updateNode (node, nextValue) {
  Object.keys(nextValue)
  .filter(k => k !== 'children')
  .forEach(k => {
    if (k.slice(0, 2) === 'on') {
      let eventName = k.slice(2).toLowerCase()
      node.addEventListener(eventName, nextValue[k])
    } else {
      node[k] = nextValue[k]
    }
  })
}
// 这里只实现了初次渲染
function updateHostComponent (fiber) {
  if (!fiber.node) {
    fiber.node = createNode(fiber)
  }
  // 协调子节点
  const {children} = fiber.props
  reconcileChildren(fiber, children)
  console.log('fiber', fiber)
}

function performUnitOfWork (fiber) {
  // 1. 执行当前任务
  const {type} = fiber
  if (typeof type === 'function') {
    type.isReactComponent
    ? updateClassComponent(fiber)
    : updateFunctionComponent(fiber)
  } else {
    updateHostComponent(fiber)
  }
  // 2. 返回下一个任务，按照深度优先，返回子元素
  if (fiber.child) {
    return fiber.child
  }
  // 没有子元素，寻找兄弟
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    // 没有兄弟元素，返回父节点
    nextFiber = nextFiber.return;
  }
}

function workLoop (deadline) {
  // 有下一个任务，并且当前帧还没有结束
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork (nextUnitOfWork)
  }
  if (!nextUnitOfWork && wipRoot)  {
    // commit 提交操作，更新到dom节点
    commitRoot()
  }
  requestIdleCallback(workLoop)
}
requestIdleCallback(workLoop)

function commitRoot () {
  commitWorker(wipRoot.child)
  wipRoot = null // 处于循环，提交完之后置成null，防止多次提交
}
function commitWorker (fiber) {
  if(!fiber) {
    return
  }
  let parentNodeFiber = fiber.return
  // 往上查找，直到有真实的node节点（fiber不一定有真实的node节点，如：Fragment，Provider，Consumer）
  while (!parentNodeFiber.node) {
    parentNodeFiber = parentNodeFiber.return 
  }
  const parentNode = parentNodeFiber.node
  if (fiber.effectTag === PLACEMENT && fiber.node !== null) {
    parentNode.appendChild(fiber.node)
  }
  commitWorker(fiber.child)
  commitWorker(fiber.sibling)
}

export default {render}