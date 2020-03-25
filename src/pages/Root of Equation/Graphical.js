import React, { Component } from 'react'
import { Card, Input, Button, Table } from 'antd';
import 'antd/dist/antd.css';
import { range, compile } from 'mathjs';
const InputStyle = {
    background: "#f58216",
    color: "white",
    fontWeight: "bold",
    fontSize: "24px",
};
var dataInTable;
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Y",
        key: "y",
        dataIndex: "y"
    }
];
var fx = " ";
class Graphical extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            start: 0,
            finish: 0,
            showinput: true,
            showOutput: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.graphical = this.graphical.bind(this);
    }

    graphical() {
        fx = this.state.fx;
        var data = []
        data['x'] = []
        data['y'] = []
        console.log(typeof (this.state.start))
        for (var i = parseInt(this.state.start); i <= parseInt(this.state.finish); i++) {
            data['x'].push(i);
            data['y'].push(this.func(i));

        }
        this.createTable(data['x'], data['y']);
        this.setState({
            showOutput: true,
            showinput: false
        })


    }
    func(X) {
        var expr = compile(this.state.fx);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }
    createTable(x, y) {
        dataInTable = []
        for (var i = 0; i < parseInt(this.state.finish - this.state.start); i++) {
            dataInTable.push({
                iteration: i + 1,
                x: x[i],
                y: y[i]
            });
        }

    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return (
            <div style={{ height: 1000,background: "#FFFF", padding: "30px"}}>
                <h2 style={{ color: "black", fontWeight: "bold" }}>Graphical</h2>
                <div>
                    {this.state.showinput &&
                        <Card
                            bordered={true}
                            style={{ width: 400, background: "#363636", color: "#FFFFFFFF", float: "left" }}
                            onChange={this.handleChange}
                        >
                            <h2 style={{ color: "#FFFFFF" }}>f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                            <h2 style={{ color: "#FFFFFF" }}>Start</h2><Input size="large" name="start" style={InputStyle}></Input>
                            <h2 style={{ color: "#FFFFFF" }}>Finish</h2><Input size="large" name="finish" style={InputStyle}></Input><br /><br />
                            <Button id="submit_button" onClick={
                                () => this.graphical(parseFloat(this.state.start), parseFloat(this.state.finish))
                            }
                                style={{ background: "#4caf50", color: "white", fontSize: "20px" }}>Submit</Button>

                        </Card>
                    }
                    {this.state.showOutput &&
                        <Card
                            title={"Output"}
                            bordered={true}
                            style={{ width: 800, background: "#CD5C5C", color: "#FFFFFFFF", float: "inline-start", marginBlockStart: "2%" }}
                            id="outputCard"
                        >
                            <Table columns={columns} bordered={true} dataSource={dataInTable} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black" }}
                            ></Table>
                        </Card>
                    }
                </div>


            </div>
        );
    }
}
export default Graphical;