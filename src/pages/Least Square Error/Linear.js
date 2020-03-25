import React, { Component } from 'react'
import { Card, Input, Button} from 'antd';

import 'antd/dist/antd.css';
import { range, compile } from 'mathjs';
const InputStyle = {
    background: "#f58216", 
    color: "white",
    fontWeight: "bold",
    fontSize: "24px",
    width: "100px"
};
var matrixA = [], matrixB = [] , X = [] ,Y = []
var fx = 0 ;
class Linear extends Component {
    constructor(props) {
        super(props)
        this.state = {
            x : parseInt(0),
            n : parseInt(0),
            showinput: true,
            showOutputCard: false,
            showMatrixForm: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    createmaxtrix(n){
        for (var i=1 ; i<=n ; i++) {
            matrixA.push(<Input style={{
                width: "15%",
                height: "50%", 
                backgroundColor:"#06d9a0", 
                marginInlineEnd: "5%", 
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }} 
            id={"a"+i} key={"a"+i} placeholder={"a"+i} />)  
            matrixB.push(<Input style={{
                width: "15%",
                height: "50%", 
                backgroundColor:"#06d9a0", 
                marginInlineEnd: "5%", 
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }} 
            id={"b"+i} key={"b"+i} placeholder={"b"+i} />)  
        }
        this.setState({
            showinput: false,
            showOutputCard: false,
            showMatrixForm: true,
        })
    }
    linearnaja(){
        for(var i=0 ; i<this.state.n; i++) {
            X[i] = (parseFloat(document.getElementById("a"+(i+1)).value));
            Y[i] = (parseFloat(document.getElementById("b"+(i+1)).value));
        }
        var sumx = 0 ; 
        var sumy = 0 ; 
        var sumxy = 0 ; 
        var sumx2 = 0 ;
        for(var i = 0 ; i < this.state.n ; i++){
            sumx += X[i] ; 
            sumy += Y[i] ;
            sumxy += (X[i]*Y[i]) ;
            sumx2 += (X[i]*X[i]) ; 
        }
        var a = ((this.state.n *sumxy)-(sumx*sumy))/((this.state.n*sumx2)-(sumx*sumx)) ;
        var b = (sumy-(a*sumx))/this.state.n  
        fx = parseFloat(a + (b*this.state.x )) ;
        this.setState({
            showinput: false,
            showOutputCard: true,
            showMatrixForm: false,
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
                <h2 style={{ color: "black", fontWeight: "bold" }}>Linear Regression</h2>
                <div style={{ float: "left" }}>
                    <Card
                        bordered={true}
                        style={{ width:400, background: "#363636", color: "#FFFFFFFF", float: "left" }}
                        onChange={this.handleChange}
                    >
                        {this.state.showinput &&
                            <div>
                                <h2 style={{ color: "#FFFFFF" }}>input n</h2><Input size="large" name="n" style={InputStyle}></Input><br /><br />
                                <h2 style={{ color: "#FFFFFF" }}>input x</h2><Input size="large" name="x" style={InputStyle}></Input><br /><br />
                                <Button id="submit_button" onClick={
                                    () => this.createmaxtrix(this.state.n , this.state.x)
                                }
                                style={{ background: "#4caf50", color: "white", fontSize: "20px" }}>Submit</Button>
                                
                            </div>
                        }
                        {this.state.showMatrixForm && 
                            <div>
                                <h2 style={{ color: "#FFFFFF" }}>X</h2><br/> {matrixA} <h2 style={{ color: "#FFFFFF" }}>Y</h2> <br/> {matrixB} <br/>
                                <Button type="ghost" id="submit_button2" onClick={
                                    () => this.linearnaja()
                                }
                                style={{ background: "#4caf50", color: "white", fontSize: "20px" }}>Submit</Button>
                            </div>
                        }
                        {this.state.showOutputCard &&
                            <div>
                                <h2 style={{ color: "#FFFFFF" }}>Output f(x)</h2><h2 style={{ color: "#FFFFFF" }}>f({this.state.x}) = {fx}</h2>
                            </div>
                        }
                    </Card>
                </div>
            </div>
            </div>
        )
    }
}
export default Linear
