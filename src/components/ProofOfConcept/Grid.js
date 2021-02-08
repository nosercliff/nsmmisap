import React, { Component } from "react";
import Table from "react-bootstrap/Table";

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: []
        };
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        fetch("http://43.255.218.197:8080/home").then((response) => response.json()).then((data) => {
            this.setState({ lists: data });
        });
    }

    render() {
        const { lists } = this.state;
        return (
            <div className="mt-5">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lists.map((list) => (
                            <tr key={list.id}>
                                <td>{list.id}</td>
                                <td>{list.title}</td>
                                <td>{list.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Grid;
