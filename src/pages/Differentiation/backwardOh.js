import React, { Component } from 'react'
import { Card, Input, Button } from 'antd';
import { compile, derivative } from 'mathjs'

const InputStyle = {
    background: "#f58216",
    color: "white",
    fontWeight: "bold",
    fontSize: "24px"
};
var error, fx = " ", fxforward = 0, dfx = 0;
class backwardOh extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fx: "",
            x: 0,
            h: 0,
            showinput: true,
            showoutput: false
        }
        this.handleChange = this.handleChange.bind(this);
    }
    backward(x, h){
        fx = this.state.fx;
        fxforward = (this.func(x) - this.func(x-h)) / h;
        dfx = this.divx(x);
        error = this.error(fxforward, dfx);

        this.setState({
            showinput: false,
            showoutput: true
        })
    }
    divx(X) {
        var dfx2 = derivative(this.state.fx, "x");
        let scope = { x: parseFloat(X) };
        return dfx2.eval(scope);
    }
    func(X) {
        var expr = compile(this.state.fx);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }
    error(xnew, xold) {
        return Math.abs((xnew - xold) / xnew) * 100;
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return (
            <div style={{ height: 1000, background: "#FFFF", padding: "30px" }}>
                <h2 style={{ color: "black", fontWeight: "bold" }}>Backward divided-difference O(h)</h2>
                <div style={{ float: "left" }}>
                    {this.state.showinput &&
                        <Card
                            bordered={true}
                            style={{ width: 300, background: "#363636", color: "#FFFFFFFF", float: "left" }}
                            onChange={this.handleChange}
                            id="inputCard"
                        >
                            <h2 style = {{color: "#FFFFFF"}}>f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                            <h2 style = {{color: "#FFFFFF"}}>input X</h2><Input size="large" name="x" style={InputStyle}></Input>
                            <h2 style = {{color: "#FFFFFF"}}>input h</h2><Input size="large" name="h" style={InputStyle}></Input><br /><br />
                            <Button id="submit_button" onClick={
                                () => this.backward(parseFloat(this.state.x), parseFloat(this.state.h))
                            }
                                style={{ background: "#4caf50", color: "white", fontSize: "20px" }}>Submit</Button>
                        </Card>
                    }
                    {this.state.showoutput &&
                        <Card
                            bordered={true}
                            style={{ width: 600, background: "#363636", color: "#FFFFFFFF", float: "left" }}
                            onChange={this.handleChange}
                            id="inputCard"
                        >
                            <h2 style = {{color: "#FFFFFF"}}>Output</h2>
                            <h2 style = {{color: "#FFFFFF"}}>f({this.state.x + this.state.h})-f({this.state.x}) = {fxforward}</h2>
                            <h2 style = {{color: "#FFFFFF"}}>f'({this.state.x}) = {dfx}</h2>
                            <h2 style = {{color: "#FFFFFF"}}>error = {error}</h2>
                        </Card>
                    }
                </div>
            </div>
        )
    }
}

export default backwardOh
