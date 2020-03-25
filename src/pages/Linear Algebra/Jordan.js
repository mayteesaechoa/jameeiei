import React, { Component } from 'react'
import { Card, Input, Button, Table } from 'antd';
import 'antd/dist/antd.css';
const InputStyle = {
    background: "#f58216",
    color: "white",
    fontWeight: "bold",
    fontSize: "24px"
};
var A = [], B = [], matrixA = [], matrixB = [], output = []
class Jordan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            row: 0,
            column: 0,
            showinput: true,
            showmatrix: false,
            showOutput: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    jordan(n) {
        for (var i = 0; i < this.state.row; i++) {
            A[i] = []
            for (var j = 0; j < this.state.column; j++) {
                A[i][j] = (parseFloat(document.getElementById("a" + (i + 1) + "" + (j + 1)).value));
            }
            B.push(parseFloat(document.getElementById("b" + (i + 1)).value));
        }
        if (A[0][0] === 0) {
            var tempRow = JSON.parse(JSON.stringify(A[0]));
            var tempColumn = B[0];
            A[0] = A[1];
            A[1] = tempRow;
            B[0] = B[1];
            B[1] = tempColumn;
        }
        for (var k = 0; k < n; k++) {
            for (var i = k + 1; i < n; i++) {
                var factor = A[i][k] / A[k][k];
                for (var j = k; j < n; j++) {
                    A[i][j] = A[i][j] - factor * A[k][j];
                }
                B[i] = B[i] - factor * B[k];
            }
        }
        for (k = n - 1; k >= 0; k--) {
            for (i = k; i >= 0; i--) {
                if (i === k) {
                    factor = 1 / A[i][k];
                    for (j = 0; j < n; j++) {
                        A[i][j] = A[i][j] * factor;
                    }
                    B[i] = B[i] * factor;
                }
                else {
                    factor = A[i][k] / A[k][k];
                    for (j = 0; j < n; j++) {
                        A[i][j] = A[i][j] - factor * A[k][j];
                    }
                    B[i] = B[i] - factor * B[k];
                }
            }
        }
        var counter = 1 ;
        for (i = 0; i < n; i++) {
            output.push(<h2>X<sub>{counter}</sub> = {B[i]}</h2>);
            output.push(<br />);
            counter++ ;
        }
        this.setState({
            showmatrix: false,
            showinput: false,
            showOutput: true
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
            showinput: false,
            showOutput: false,
            showmatrix: true
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
                <h2 style={{ color: "black", fontWeight: "bold" }}>Gauss Jordan</h2>
                <div style={{ float: "left" }}>
                    {this.state.showinput &&
                        <Card
                            bordered={true}
                            style={{ width: 800, background: "#363636", color: "#FFFFFFFF", float: "left" }}
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
                            style={{ width: 800, background: "#363636", color: "#FFFFFFFF", float: "left" }}
                            onChange={this.handleChange}
                        >
                            <div>
                                <h2 style={{ color: "#FFFFFF" }}>Matrix [A]</h2><br />{matrixA}<h2 style={{ color: "#FFFFFF" }}>Vector [B]<br /></h2>{matrixB}<br />
                                <Button id="matrix_button" onClick={
                                        () => this.jordan(this.state.row)
                                    }
                                    style={{ background: "#4caf50", color: "white", fontSize: "20px" }}>Submit</Button>
                            </div>
                        </Card>
                    }
                    {this.state.showOutput &&
                        <Card
                            title={<h2> output </h2>}
                            bordered={true}
                            style={{ width: 400, background: "#CD5C5C", color: "#FFFFFFFF", float: "left" }}
                            onChange={this.handleChange}>
                            <p style={{ fontSize: "24px", fontWeight: "bold" }}>{output}</p>
                        </Card>
                    }
                </div>
            </div >
        )
    }
}

export default Jordan
