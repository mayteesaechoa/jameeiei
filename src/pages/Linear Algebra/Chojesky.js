import React, { Component } from 'react'
import { Card, Input, Button } from 'antd';
import 'antd/dist/antd.css';
const InputStyle = {
    background: "#f58216",
    color: "white",
    fontWeight: "bold",
    fontSize: "24px"
};
var A = [], B = [], matrixA = [], matrixB = [], output = [], decompose = [];
class Chojesky extends Component {
    constructor(props) {
        super(props)
        this.state = {
            row: 0,
            column: 0,
            showinput: true,
            showOutput: false,
            showmatrix: false
        }
        this.handleChange = this.handleChange.bind(this);
    }
    cholesky(n) {
        for (var i = 0; i < this.state.row; i++) {
            A[i] = []
            for (var j = 0; j < this.state.column; j++) {
                A[i][j] = (parseFloat(document.getElementById("a" + (i + 1) + "" + (j + 1)).value));
            }
            B.push(parseFloat(document.getElementById("b" + (i + 1)).value));
        }
        var x = new Array(n);
        var y = new Array(n)
        if (matrixA[0][0] === 0) {
            for (var i = 0; i < n; i++) {
                var temp = A[0][i];
                matrixA[0][i] = B[i][i];
                matrixB[0][i] = temp;
            }
        }
        var matrixL = new Array(n);
        for (i = 0; i < n; i++) {
            matrixL[i] = new Array(n);
            for (var j = 0; j < n; j++) {
                matrixL[i][j] = 0;
            }
            x[i] = 0;
            y[i] = 0;
        }
        matrixL[0][0] = Math.sqrt(matrixA[0][0]);
        for (var k = 1; k < n; k++) {

            for (i = 0; i < k; i++) {
                var sum = 0;
                if (i !== 0) {
                    for (j = 0; j < i; j++) {
                        sum += matrixL[i][j] * matrixL[k][j];
                    }
                }
                matrixL[k][i] = (matrixA[i][k] - sum) / matrixL[i][i];
            }
            var sum = 0;
            for (j = 0; j < k; j++) {
                sum += matrixL[k][j] * matrixL[k][j];
            }
            matrixL[k][k] = Math.sqrt(matrixA[k][k] - sum);
        }
        console.log(matrixL);
        y[0] = matrixB[0] / matrixL[0][0];
        for (i = 1; i < n; i++) {
            sum = 0;
            for (j = 0; j < i; j++) {
                sum += matrixL[i][j] * y[j];
            }
            y[i] = (matrixB[i] - sum) / matrixL[i][i];
        }
        console.log(y);
        x[n - 1] = y[n - 1] / matrixL[n - 1][n - 1];
        for (i = this.state.row - 2; i >= 0; i--) {
            sum = 0;
            for (j = i + 1; j < this.state.row; j++) {
                sum += matrixL[j][i] * x[j];
            }
            x[i] = (y[i] - sum) / matrixL[i][i];
        }
        this.setState({
            showOutput: true,
            showinput: false,
            showmatrix: false
        });
    }
    summation(L, k) {
        var sum = 0
        for (var i = 0; i < parseInt(this.state.row); i++) {
            for (var j = 0; j < i - 2; j++) {
                sum += L[i][j] * L[k][j]
            }
        }
        return sum
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
        });
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return (
            <div style={{ height: 1000, background: "#FFFF", padding: "30px" }}>
                <h2 style={{ fontWeight: "bold" }}>Cholesky Decomposition</h2>
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
                                    () => this.cholesky(this.state.row)
                                }
                                style={{ background: "#4caf50", color: "white", fontSize: "20px" }}>Submit</Button>
                        </Card>
                    }
                    {this.state.showOutput &&
                        <Card
                            title={<h2>output</h2>}
                            bordered={true}
                            style={{ width: 400, background: "#CD5C5C", color: "#FFFFFFFF", float: "left" }}
                            onChange={this.handleChange}>
                             <p style={{fontSize: "24px", fontWeight: "bold"}}>{output}</p>
                        </Card>
                    }
                </div>
            </div >
        )
    }
}

export default Chojesky
