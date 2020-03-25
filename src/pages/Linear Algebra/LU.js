import React, { Component } from 'react'
import { Card, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { range, compile, lusolve, format } from 'mathjs';
const InputStyle = {
    background: "#f58216",
    color: "white",
    fontWeight: "bold",
    fontSize: "24px"

};
var A = [], B = [], matrixA = [], matrixB = [], output = [], decompose, output2 = [];
class LU extends Component {
    constructor(props) {
        super(props)
        this.state = {
            row: 0,
            column: 0,
            showinput: true,
            showOutput: false,
            showinput: false 
        }
        this.handleChange = this.handleChange.bind(this);
    }
    Lu(n){
        var c = [],d = [];
        for (var i = 0; i < this.state.row; i++) {
            c[i] = []
            for (var j = 0; j < this.state.column; j++) {
                c[i][j] = (parseFloat(document.getElementById("a" + (i + 1) + "" + (j + 1)).value));
            }
            d.push(parseFloat(document.getElementById("b" + (i + 1)).value));
        }
        A = c;
        B = d;
        decompose = lusolve(A, B)
        for (var i = 0; i < decompose.length; i++) {
            output.push(<h2>X<sub>{i}</sub>=&nbsp;&nbsp;{Math.round(decompose[i])}</h2>);
            output2.push(<h2>X<sub>{i}</sub>=&nbsp;&nbsp;{Math.round(decompose[i])}</h2>);
            output.push(<br />)
            output2.push(<br />)
        }
    }
    poph() {
        decompose = lusolve(A, B)
        this.A=[]
        this.B=[]
        for (var i = 0; i < decompose.length; i++) {
            output.pop();
            output.pop();
        }
    }
    createMatrix(row, column) {
        for (var i = 1; i <= row; i++) {
            for (var j = 1; j <= column; j++) {
                matrixA.push(<Input style={{
                    width: 100,
                    height: 50,
                    backgroundColor: "#CD5C5C",
                    marginInlineEnd: "5%",
                    marginBlockEnd: "5%",
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "bold"
                }}
                    id={"a" + i + "" + j} key={"a" + i + "" + j} placeholder={"a" + i + "" + j} />)
            }
            matrixA.push(<br />)
            matrixB.push(<Input style={{
                width: 100,
                height: 50,
                backgroundColor: "#CD5C5C",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"b" + i} key={"b" + i} placeholder={"b" + i} />)
        }
        this.setState({
            showOutput: false,
            showmatrix: true,
            showinput: false,
        })
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return (
            <div style={{ height: 1000, background: "#FFFF", padding: "30px" }}>
                <h2 style={{ color: "black", fontWeight: "bold" }}>LU Decomposition</h2>
                <div style={{ float: "left" }}>
                    {this.state.showinput &&
                        <Card
                            bordered={true}
                            style={{ width: 800, background: "#363636", color: "#FFFFFFFF" , float: "left" }}
                            onChange={this.handleChange}
                        >
                            <div>
                                <h2 style={{ color: "#FFFFFF" }}>Row</h2><Input size="large" name="row" style={InputStyle}></Input>
                                <h2 style={{ color: "#FFFFFF" }}>Column</h2><Input size="large" name="column" style={InputStyle}></Input>
                                <br /><br />
                                <Button id="input_button" onClick={
                                    () => this.createMatrix(this.state.row, this.state.column)
                                }
                                    style={{ background: "#4caf50", color: "white", fontSize: "20px" }}>Submit</Button>
                            </div>
                        </Card>
                    }
                    {this.state.showmatrix &&
                        <Card
                            bordered={true}
                            style={{ width: 800, background: "#363636", color: "#FFFFFFFF" , float: "left" }}
                            onChange={this.handleChange}
                        >
                            <div>
                                <h2 style={{ color: "#FFFFFF" }}>Matrix [A]</h2><br />{matrixA}<h2 style={{ color: "#FFFFFF" }}>Vector [B]<br /></h2>{matrixB}<br />
                                <Button
                                    id="matrix_button" onClick={
                                        () => this.Lu(this.state.row)
                                    }
                                    style={{ background: "#4caf50", color: "white", fontSize: "20px" }}>Submit</Button>
                            </div>
                        </Card>
                    }
                    {this.state.showOutput &&
                        <Card
                            title={"Output"}
                            bordered={true}
                            style={{ width: 400, background: "#CD5C5C", color: "#FFFFFFFF", float: "left" }}
                            onChange={this.handleChange}>
                            
                            
                        </Card>
                    }
                </div>
            </div >
        )
    }
}

export default LU
