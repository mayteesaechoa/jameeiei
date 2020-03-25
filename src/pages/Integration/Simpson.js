import React, { Component } from 'react'
import { Card, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { compile } from 'mathjs';
var Algebrite = require('algebrite')
const InputStyle = {
    background: "#f58216",
    color: "white",
    fontWeight: "bold",
    fontSize: "24px"
};
var simsonarea = 0 , error = 0, exact = 0, fxtest = "";
class Simpson extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fx: "",
            n: 0,
            a: 0,
            b: 0,
            showinput: true,
            showoutput: false
        }
        this.handleChange = this.handleChange.bind(this);
    }
    fsimson(a, b, n){
        var sum1 = 0,sum2 = 0 ;
        var h = (b - a) / n; 
        var stack = a + h;
        for (var i = stack ; i < b; i = i + 2*h) {
            sum1 = sum1 + this.func(i);
        }
        var stack2 = a + 2*h ;
        for (var i = stack2 ; i < b; i = i + 2*h){
            sum2 = sum2 + this.func(i);
        }
        simsonarea = (h / 3) * (this.func(a) + this.func(b) + 4*(sum1) + 2*(sum2));
        exact = this.integrate(a, b);
        error = this.error(simsonarea, exact);
        this.setState({
            showinput: false,
            showoutput: true
        })
    }
    integrate(a, b) {
        var expr = compile(Algebrite.integral(Algebrite.eval(this.state.fx)).toString());
        return expr.eval({ x: b }) - expr.eval({ x: a })
    }
    func(X) {
        var expr = compile(this.state.fx);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }
    error(xnew, xold) {
        return Math.abs((xnew - xold) / xnew);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {  
        return (
            <div style={{ height: 1000, background: "#FFFF", padding: "30px" }}>
                <h2 style={{ color: "black", fontWeight: "bold" }} > Composite Simpson's Rule </h2>
                <div style={{ float: "left" }}>
                    {this.state.showinput &&
                        <Card
                            bordered={true}
                            style={{ width: 400, background: "#363636", color: "#FFFFFFFF", float: "left" }}
                            onChange={this.handleChange}
                            id="inputCard"
                        >
                            <h2 style={{ color: "#FFFFFF" }}>f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                            <h2 style={{ color: "#FFFFFF" }}>input a </h2><Input size="large" name="a" style={InputStyle}></Input>
                            <h2 style={{ color: "#FFFFFF" }}>input b </h2><Input size="large" name="b" style={InputStyle}></Input>
                            <h2 style={{ color: "#FFFFFF" }}>input n </h2><Input size="large" name="n" style={InputStyle}></Input>
                            <br /><br />
                            <Button id="submit_button" onClick={
                                () => this.fsimson(parseFloat(this.state.a), parseFloat(this.state.b), parseFloat(this.state.n))
                            }
                                style={{ background: "#4caf50", color: "white", fontSize: "20px" }}>Submit</Button>
                        </Card>
                    }
                    {this.state.showoutput &&
                        <Card
                            title={<h2>Output</h2>}
                            bordered={true}
                            style={{ width: 600, background: "#CD5C5C", color: "#FFFFFFFF", float: "left" }}
                            onChange={this.handleChange}
                            id="inputCard"
                        >
                            <h2 style={{ color: "#FFFFFF" }}>simpson's area = {simsonarea}</h2>
                            <h2 style={{ color: "#FFFFFF" }}>integate <sub>{this.state.a}</sub><sup>{this.state.b}</sup>f({this.state.fx}) = {exact}</h2>
                            <h2 style={{ color: "#FFFFFF" }}>error = {error}</h2>
                        </Card>
                    }
                </div>
            </div>
        )
    }
}

export default Simpson
