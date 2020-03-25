import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';

import Graphical from './pages/Root of Equation/Graphical'
import Bisection from './pages/Root of Equation/Bisection'
import False from './pages/Root of Equation/False'
import Newtonraphson from './pages/Root of Equation/Newton-raphson'
import Onepoint from './pages/Root of Equation/Onepoint';
import Secant from './pages/Root of Equation/Secant'

import Eilimination from './pages/Linear Algebra/Elimination'
import Cramer from './pages/Linear Algebra/Cramer'
import Jacobi from './pages/Linear Algebra/Jacobi'
import LU from './pages/Linear Algebra/LU'
import Jordan from './pages/Linear Algebra/Jordan'
import Cholesky from './pages/Linear Algebra/Chojesky'

import Trapezoidal from './pages//Integration/Trapezoidal'
import Simpson from './pages/Integration/Simpson'

import Linear from './pages/Least Square Error/Linear'
import Polynomial from './pages/Least Square Error/Polynomial'

import Forward from './pages/Differentiation/forwardOh'
import Backward from './pages/Differentiation/backwardOh'
import Central from './pages/Differentiation/centralOh2'

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;
class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Header className="header" style={{ height: "80px" }}>
            <div className="headertext">
              <p style={{ fontSize: "40px", fontWeight: "bold", color: "white" }}>
                <a> &nbsp;
                  Numerical Method
                  </a>
              </p>
            </div>
          </Header>
          <Layout>
            <Sider width={335} style={{ background: "#fff" }}>
              <Menu
                mode="inline"
                style={{ height: '100vh', borderRight: 0, backgroundColor: "#363636", overflowY: "scroll" }}
                theme="dark"
              >
                <SubMenu key="root_submenu" title={<span>Root of Equation</span>}>
                  <Menu.Item key="menu_graphical" >Graphical<Link to="/graphical" /></Menu.Item>
                  <Menu.Item key="menu_bisection" >Bisection<Link to="/bisection" /></Menu.Item>
                  <Menu.Item key="menu_false">False Position<Link to="/false" /> </Menu.Item>
                  <Menu.Item key="menu_onepoint">One-Point Iteration<Link to="/onepoint" /></Menu.Item>
                  <Menu.Item key="menu_newton">Newton-Raphson<Link to="/newtonraphson" /></Menu.Item>
                  <Menu.Item key="menu_secant">Secant Method<Link to="/secant" /></Menu.Item>
                </SubMenu>
                <SubMenu key="algebra_submenu" title={<span>Linear Algebra</span>}>
                  <Menu.Item key="menu_cramer">Cramer's Rule<Link to="/cramer" /></Menu.Item>
                  <Menu.Item key="menu_gauss">Gauss's Elimination<Link to="/eilimination" /></Menu.Item>
                  <Menu.Item key="menu_jordan">Gauss Jordan Method<Link to ="/jordan"/></Menu.Item>
                  <Menu.Item key="menu_lu">LU Decomposition<Link to ="/lu"/></Menu.Item>
                  <Menu.Item key="menu_cholesky">Cholesky Decomposition<Link to ="/cholesky"/></Menu.Item>
                  <Menu.Item key="menu_jacobi">Jacobi Iteration Method<Link to="/jacobi" /></Menu.Item>
                  <Menu.Item key="menu_seidel">Gauss Seidel Iteration</Menu.Item>
                  <Menu.Item key="menu_gradient">Conjugate Gradient Method</Menu.Item>
                </SubMenu>
                <SubMenu key="interpolate_submenu" title={<span>Interpolation</span>}>
                  <Menu.Item key="menu_divide">Newton Divide Difference</Menu.Item>
                  <Menu.Item key="menu_lagrange">Lagrange</Menu.Item>
                </SubMenu>
                <SubMenu key="regression_submenu" title={<span>Least Square Error</span>}>
                  <Menu.Item key="menu_linear">Linear Regression<Link to="/linear" /></Menu.Item>
                  <Menu.Item key="menu_poly">Polynomial Regression<Link to="/polynomial" /></Menu.Item>
                  <Menu.Item key="menu_multiple">Multiple Linear Regression</Menu.Item>
                </SubMenu>
                <SubMenu key="integrate_submenu" title={<span>Integration</span>}>
                  <Menu.Item key="menu_compositeTrapzoidal">Composite Trapezoidal Rule<Link to="/trapzoidal" /></Menu.Item>
                  <Menu.Item key="menu_compositeSimpson">Composite Simpson's Rule<Link to="/simson" /></Menu.Item>
                </SubMenu>
                <SubMenu key="diff_submenu" title={<span>Differentiation</span>}>
                  <Menu.Item key="menu_forwardh">Forward Divided-Differences O(h)<Link to="/forwardOh" /></Menu.Item>
                  <Menu.Item key="menu_backwardh">Backward Divided-Differences O(h)<Link to="/backwardOh" /></Menu.Item>
                  <Menu.Item key="menu_centralh">Central Divided-Differences O(h{<sup>2</sup>})<Link to="/centralOh2" /></Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout>
              <Content style={{ padding: 24, margin: 0, minHeight: 280, }}>
                <Route path="/graphical" component={Graphical}/>
                <Route path="/bisection" component={Bisection}/>
                <Route path="/cramer" component={Cramer}/>
                <Route path="/false" component={False}/>
                <Route path="/newtonraphson" component={Newtonraphson}/>
                <Route path="/onepoint" component={Onepoint}/>
                <Route path="/secant" component={Secant}/>
                <Route path="/eilimination" component={Eilimination}/>
                <Route path="/trapzoidal" component={Trapezoidal}/>
                <Route path="/linear" component={Linear}/>
                <Route path="/polynomial" component={Polynomial}/>
                <Route path="/forwardOh" component={Forward}/>
                <Route path="/backwardOh" component={Backward}/>
                <Route path="/centralOh2" component={Central}/>
                <Route path="/simson" component={Simpson}/>
                <Route path="/jacobi" component={Jacobi}/>
                <Route path="/jordan" component={Jordan}/>
                <Route path="/lu" component={LU}/>
                <Route path="/cholesky" component={Cholesky}/>

              </Content>
            </Layout>
          </Layout>
          <Footer style={{ backgroundColor: "#363636", height: "100px" }}>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "white" }}>
              <a> Maytee&nbsp;&nbsp;&nbsp;&nbsp;saechoa&nbsp;&nbsp;6004062616199</a>
              <p style={{ fontSize: "18px", fontWeight: "bold", color: "white" }}>
                KMUTNB - Computer Science
              </p>
            </p>

          </Footer>

        </Layout>

      </Router>

    )
  }
}

export default App