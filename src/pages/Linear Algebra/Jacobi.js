import React, { Component } from 'react'
import { Card, Input, Button, Table } from 'antd';

import 'antd/dist/antd.css';
const InputStyle = {
    background: "#f58216",
    color: "white",
    fontWeight: "bold",
    fontSize: "24px"
};
var columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    }
];
var A = [], B = [], matrixA = [], matrixB = [], x, epsilon, dataInTable = [], count = 1, matrixX = []
class Jacobi extends Component {
    constructor(props) {
        super(props)

        this.state = {
            row: 0,
            column: 0,
            showinput: true,
            showmatrix: false,
            showOutput: false
        }
        this.handleChange = this.handleChange.bind(this);
    }
    jacobi(n) {
        for (var i = 0; i < this.state.row; i++) {
            A[i] = []
            for (var j = 0; j < this.state.column; j++) {
                A[i][j] = (parseFloat(document.getElementById("a" + (i + 1) + "" + (j + 1)).value));
            }
            B.push(parseFloat(document.getElementById("b" + (i + 1)).value));
            x.push(parseFloat(document.getElementById("x" + (i + 1)).value));
        }
        var temp;
        var xold;
        epsilon = new Array(n);
        do {
            temp = [];
            xold = JSON.parse(JSON.stringify(x));
            for (var i = 0; i < n; i++) {
                var sum = 0;
                for (var j = 0; j < n; j++) {
                    if (i !== j) { //else i == j That is a divide number
                        sum = sum + A[i][j] * x[j];
                    }
                }
                temp[i] = (B[i] - sum) / A[i][i]; //update x[i]

            }
            x = JSON.parse(JSON.stringify(temp));
        } while (this.error(x, xold)); //if true , continue next iteration
        /*
        
        for (i=0 ; i<x.length ; i++) {
                output.push(x[i]);
                output.push(<br/>);
        }*/
        this.setState({
            showinput: false,
            showmatrix: false,
            showOutput: true
        });
    }
    error(xnew, xold) {
        for (var i = 0; i < xnew.length; i++) {
            epsilon[i] = Math.abs((xnew[i] - xold[i]) / xnew[i])
        }
        this.appendTable(x, epsilon);
        for (i = 0; i < epsilon.length; i++) {
            if (epsilon[i] > 0.000001) {
                return true;
            }
        }
        return false;
    }
    createMatrix(row, column) {
        A = []
        B = []
        matrixA = []
        matrixB = []
        x = []
        dataInTable = []
        for (var i = 1; i <= row; i++) {
            for (var j = 1; j <= column; j++) {
                matrixA.push(<Input style={{
                    width: 100,
                    height: 50,
                    backgroundColor: "#06d9a0",
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
                backgroundColor: "black",
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
    initialSchema(n) {
        for (var i = 1; i <= n; i++) {
            columns.push({
                title: "X" + i,
                dataIndex: "x" + i,
                key: "x" + i
            })
        }
        for (i = 1; i <= n; i++) {
            columns.push({
                title: "Error" + i,
                dataIndex: "error" + i,
                key: "error" + i
            })
        }
    }
    appendTable(x, error) {
        var tag = ''
        tag += '{"iteration": ' + count++ + ',';
        for (var i = 0; i < x.length; i++) {
            tag += '"x' + (i + 1) + '": ' + x[i].toFixed(8) + ', "error' + (i + 1) + '": ' + error[i].toFixed(8);
            if (i !== x.length - 1) {
                tag += ','
            }
        }
        tag += '}';
        dataInTable.push(JSON.parse(tag));
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return (
            <div style={{ height: 1000, background: "#FFFF", padding: "30px" }}>
                <h2 style={{ color: "black", fontWeight: "bold" }}>Jacobi</h2>
                <div style={{ float: "left" }}>
                    {this.state.showinput &&
                        <Card
                            bordered={true}
                            style={{ width: 800, background: "#363636", color: "#FFFFFFFF", float: "left" }}
                            onChange={this.handleChange}
                            id="inputCard"
                        >
                            <h2 style={{ color: "#FFFFFF" }}>Row</h2><Input size="large" name="row" style={InputStyle}></Input>
                            <h2 style={{ color: "#FFFFFF" }}>Column</h2><Input size="large" name="column" style={InputStyle}></Input><br /><br />
                            <Button id="submit_button" onClick={
                                () => {
                                    this.createMatrix(this.state.row, this.state.column);
                                    this.initialSchema(this.state.row)
                                }
                            }
                                style={{ background: "#4caf50", color: "white", fontSize: "20px" }}>Submit</Button>
                        </Card>
                    }
                    {this.state.showmatrix &&
                        <Card
                            bordered={true}
                            style={{ width: 800, background: "#363636", color: "#FFFFFFFF", float: "left" }}
                            onChange={this.handleChange}
                            id="inputCard"
                        >
                            <div>
                                <h2 style={{ color: "#FFFFFF" }}>Matrix [A]</h2><br />{matrixA}<h2 style={{ color: "#FFFFFF" }}>Vector [B]<br /></h2>{matrixB}<br />
                                <Button
                                    id="matrix_button"
                                    style={{ background: "blue", color: "white", fontSize: "20px" }}
                                    onClick={() => this.jacobi(parseInt(this.state.row))}>
                                    Submit
                            </Button>
                            </div>
                        </Card>
                    }
                    {this.state.showOutput &&
                        <Card
                            title={"Output"}
                            bordered={true}
                            style={{ width: "100%", background: "#2196f3", color: "#FFFFFFFF", float: "inline-start", marginBlockStart: "2%" }}
                            id="outputCard"
                        >
                            <Table columns={columns} bordered dataSource={dataInTable} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black", overflowX: "scroll", border: "2px solid white" }}
                            ></Table>
                        </Card>
                    }
                </div>
            </div>
        )
    }
}

export default Jacobi
