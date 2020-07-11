import React, { Component } from 'react'
import {BrowserRouter, Link, Route, Switch, useRouteMatch, useHistory, useLocation, useParams}  from 'react-router-dom'
import HomePage from './HomePage'
import UserPage from './UserPage'
import _404Page  from  './_404Page'

export default class RouterPage extends Component {
  render () {
    return (
      <div>
        <h1>RouterPage</h1>
        <BrowserRouter basename='/kkb'>
          <nav>
            <Link to='/'> 首页 </Link>
            <Link to='/user'> 用户中心 </Link>
            <Link to='/product/123'>商品 </Link>
          </nav>
          {/* 添加Switch表示仅匹配⼀个 */}
          <Switch>
            {/* 根路由要添加exact，实现精确匹配 */}
            <Route exact path='/' component={HomePage} />
            <Route path='/user' component={UserPage} />
            <Route path="/product/:id" render={() => <Product />} />
            {/* <Route path="/product/:id" component={Product} /> */}
            <Route component={_404Page} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

//  函数方式，使用hooks
function Product () {
  const match = useRouteMatch ()
  const history = useHistory()
  const location = useLocation()
  const _param = useParams()
  console.log('match', match)
  console.log('history', history)
  const {params, url} = match
  const {id} = params
  return (
    <div>
      <h3>Ptoduct: {id}</h3>
      <Link to={url + '/detail'}>详情</Link>
      <Route path={url + '/detail'} component={Detail} />
    </div>
  )
}
// component方式可展开属性
function Detail({match}) {
  console.log('match1', match);
  return (
    <div>
      <h1>detail</h1>
    </div>
  )
}