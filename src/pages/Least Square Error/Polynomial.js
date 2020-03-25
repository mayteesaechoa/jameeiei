import React, { Component } from 'react'
import { Card, Input, Button, Table } from 'antd';

import 'antd/dist/antd.css';
import { range, compile } from 'mathjs';
const InputStyle = {
    background: "#f58216",
    color: "white",
    fontWeight: "bold",
    fontSize: "24px",
    width: "100px"
};
var matrixA = [], matrixB = [], X = [], Y = [], xpow = [], xpowy = [], polyorder = [], answer = [];
var fx = 0;
class Polynomial extends Component {
    constructor(props) {
        super(props)
        this.state = {
            m: parseInt(0),
            n: parseInt(0),
            showinput: true,
            showOutputCard: false,
            showMatrixForm: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    polynomial() {
        for (var i = 0; i < this.state.n; i++) {
            X[i] = (parseFloat(document.getElementById("a" + (i + 1)).value));
            Y[i] = (parseFloat(document.getElementById("b" + (i + 1)).value));
        }
        for (var i = 0; i < (this.state.m) * 2; i++) {
            xpow[i] = 0;
        }
        for (var i = 0; i <= this.state.m; i++) {
            xpowy[i] = 0;
        }
        for (var i = 0; i < (this.state.m) * 2; i++) {
            for (var j = 0; j < this.state.n; j++) {
                xpow[i] += Math.pow(X[j], i + 1);
            }
        }
        for (var i = 0; i <= this.state.m; i++) {
            for (var j = 0; j < this.state.n; j++) {
                if (i == 0 && j == 0) {
                    xpowy[i] += Y[j];
                }
                else {
                    xpowy[i] += Y[j] * Math.pow(X[j], i);
                }
            }
        }
        var runner = 0;
        for (var i = 0; i <= this.state.m; i++) {
            polyorder[i] = []
            for (var j = 0; j <= this.state.m; j++) {
                if (i == 0 && j == 0) {
                    polyorder[0][0] = this.state.n;
                }
                else {
                    polyorder[i][j] = xpow[runner++];
                }
            }
            runner = runner - 3;
        }
        for (var i = 0; i <= this.state.m; i++) {
            for(var j = 0; j <= this.state.m; j++){
                answer.push(<p style = {{float:"left"}} > {polyorder[i][j]} | </p>);
            }
            answer.push(<br/>);
        }
        /*var setvar = polyorder[0][0] ;
        for(var i=0 ; i<=this.state.m ; i++){
            polyorder[0][i] = polyorder[0][i]/setvar ;
        }
        xpowy[0] = xpowy[0]/setvar ;
        for(var i=1 ; i<=this.state.m ; i++){
            this.guassround(i);
            if(i<this.state.m){
                var setvar = polyorder[i][i] ;
                for(var h=0 ; h<=this.state.m ; h++){
                    polyorder[i][h] = polyorder[i][h]/setvar ;
                }
                xpowy[i] = xpowy[i]/setvar ;
            }
        }*/

        this.setState({
            showinput: false,
            showOutputCard: true,
            showMatrixForm: false,
        })
    }
    guassround(K) {
        for (var i = K; i <= this.state.m; i++) {
            var setvar = polyorder[i][K - 1];
            for (var j = K - 1; j <= this.state.m; j++) {
                polyorder[i][j] = polyorder[i][j] - setvar * polyorder[K - 1][j];
            }
            xpowy[i] = xpowy[i] - setvar * xpowy[K - 1]
        }
    }
    createmaxtrix(n) {
        for (var i = 1; i <= n; i++) {
            matrixA.push(<Input style={{
                width: "15%",
                height: "50%",
                backgroundColor: "#06d9a0",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"a" + i} key={"a" + i} placeholder={"a" + i} />)
            matrixB.push(<Input style={{
                width: "15%",
                height: "50%",
                backgroundColor: "#06d9a0",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"b" + i} key={"b" + i} placeholder={"b" + i} />)
        }
        this.setState({
            showinput: false,
            showOutputCard: false,
            showMatrixForm: true,
        })
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return (
            <div>
                <div style={{ height: 1000, background: "#FFFF", padding: "30px" }}>
                    <h2 style={{ color: "black", fontWeight: "bold" }}>Polynomial Regression</h2>
                    <div style={{ float: "left" }}>
                        <Card
                            bordered={true}
                            style={{ width: 400, background: "#363636", color: "#FFFFFFFF", float: "left" }}
                            onChange={this.handleChange}
                        >
                            {this.state.showinput &&
                                <div>
                                    <h2 style={{ color: "#FFFFFF" }}>input n</h2><Input size="large" name="n" style={InputStyle}></Input><br /><br />
                                    <h2 style={{ color: "#FFFFFF" }}>input m</h2><Input size="large" name="m" style={InputStyle}></Input><br /><br />
                                    <Button  id="submit_button" onClick={
                                        () => this.createmaxtrix(this.state.n, this.state.m)
                                    }
                                    style={{ background: "#4caf50", color: "white", fontSize: "20px" }}>Submit</Button>
                                </div>
                            }
                            {this.state.showMatrixForm &&
                                <div>
                                    <h2>X</h2><br /> {matrixA} <h2>Y</h2> <br /> {matrixB} <br />
                                    <Button type="ghost" id="submit_button2" onClick={
                                        () => this.polynomial()
                                    }
                                    >Submit</Button>
                                </div>
                            }
                            {this.state.showOutputCard &&
                                <div>
                                    <h2>Output </h2>
                                    <p style={{fontSize: "24px", fontWeight: "bold"}}>{answer}</p>
                                </div>
                            }
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default Polynomial
