import React, { Component } from 'react'
import { Card, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { det } from 'mathjs';
const InputStyle = {
    background: "#f58216",
    color: "white",
    fontWeight: "bold",
    fontSize: "24px"
};
var A = [], B = [], answer = [], matrixA = [], matrixB = []
class Cramer extends Component {
    constructor() {
        super();
        this.state = {
            row: 0,
            column: 0,
            showinput: true,
            showmatrix: false,
            showOutput: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.cramer = this.cramer.bind(this);
    }
    cramer() {
        for (var i = 0; i < this.state.row; i++) {
            A[i] = []
            for (var j = 0; j < this.state.column; j++) {
                A[i][j] = (parseFloat(document.getElementById("a" + (i + 1) + "" + (j + 1)).value));
            }
            B.push(parseFloat(document.getElementById("b" + (i + 1)).value));
        }
        var counter = 0;
        while (counter != this.state.row) {
            var transformMatrix = JSON.parse(JSON.stringify(A));
            for (var i = 0; i < this.state.row; i++) {
                for (var j = 0; j < this.state.column; j++) {
                    if (j === counter) {
                        transformMatrix[i][j] = B[i]
                        break;
                    }
                }
            }
            counter++;
            answer.push(<h2>X<sub>{counter}</sub> = {Math.round(det(transformMatrix)) / Math.round(det(A))}</h2>)
            answer.push(<br />)
        }
        this.setState({
            showOutput: true,
            showmatrix: false,
            showinput: false,
        });
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
                <h2 style={{ color: "black", fontWeight: "bold" }}>Cramer's Rule</h2>
                <div style={{ float: "left" }}>
                    {this.state.showinput &&
                        <Card
                            bordered={true}
                            style={{ width: 800, background: "#363636", color: "#FFFFFFFF", float: "left" }}
                            onChange={this.handleChange}
                        >
                            <h2 style={{ color: "#FFFFFF" }}>Row</h2><Input size="large" name="row" style={InputStyle}></Input>
                            <h2 style={{ color: "#FFFFFF" }}>Column</h2><Input size="large" name="column" style={InputStyle}></Input>
                            <br /><br />
                            <Button id="input_button" onClick={
                                () => this.createMatrix(this.state.row, this.state.column)
                            }
                                style={{ background: "#4caf50", color: "white", fontSize: "20px" }}>Submit</Button>
                        </Card>
                    }
                    {this.state.showmatrix &&
                        <Card
                            bordered={true}
                            style={{ width: 800, background: "#363636", color: "#FFFFFFFF", float: "left" }}
                            onChange={this.handleChange}
                        >
                            <h2 style={{ color: "#FFFFFF" }}>Matrix [A]</h2><br />{matrixA}<h2 style={{ color: "#FFFFFF" }}>Vector [B]<br /></h2>{matrixB}<br />
                            <Button
                                id="matrix_button" onClick={
                                    () => this.cramer()
                                }
                                style={{ background: "#4caf50", color: "white", fontSize: "20px" }}>Submit</Button>
                        </Card>
                    }
                    {this.state.showOutput &&
                        <Card
                            title={"Output"}
                            bordered={true}
                            style={{ width: 400, background: "#CD5C5C", color: "#FFFFFFFF", float: "left" }}
                            onChange={this.handleChange}>
                            <p style={{ fontSize: "24px", fontWeight: "bold" }}>{answer}</p>
                        </Card>
                    }
                </div>
            </div >
        );
    }
}
export default Cramer;




