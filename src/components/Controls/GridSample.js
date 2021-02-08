import React, { Component } from "react";
import { Button, ButtonToolbar } from "react-bootstrap";
import ReactDataGrid from "react-data-grid";

class GridSample extends Component {
    constructor(props) {
        super(props);
        this._columns = [
            {
                key: "id",
                name: "Particular"
            },
            {
                key: "title",
                name: "Time"
            },
            {}
        ];

        let rows = [];
        /* for (let i = 1; i <= 10; i++) {
            rows.push({
                id: i,
                title: "Title " + i,
                count: i * 1000
            });
        } */
        rows.push({
            id: "id",
            title: "title"
        });
        //console.log(rows)
        this.state = { rows, selectedIndexes: [] };
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        /* fetch("http://43.255.218.197:8080/home", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                IpAddress: "0.0.0.0",
                ClientId: "1",
                UserId: "1"
            })
        })
            .then((responseText) => {
                console.log(responseText);
            })
            .catch((error) => {
                console.error(error);
            }); */
    }

    rowGetter = (i) => {
        return this.state.rows[i];
    };

    onRowsSelected = (rows) => {
        this.setState({
            selectedIndexes: this.state.selectedIndexes.concat(rows.map((r) => r.rowIdx), alert("Row Index Selected = " + this.state.selectedIndexes.length))
        });
    };

    onRowsDeselected = (rows) => {
        let rowIndexes = rows.map((r) => r.rowIdx);
        this.setState({
            selectedIndexes: this.state.selectedIndexes.filter((i) => rowIndexes.indexOf(i) === -1)
        });
    };

    render() {
        const rowText = this.state.selectedIndexes.length === 1 ? "row" : "rows";
        return (
            <div>
                <p>
                    <span>
                        {this.state.selectedIndexes.length} {rowText} selected
                    </span>
                    <h4>Work Schedule (Preview):</h4>
                    <ReactDataGrid
                        rowKey="id"
                        columns={this._columns}
                        rowGetter={this.rowGetter}
                        rowsCount={this.state.rows.length}
                        minHeight={500}
                        rowSelection={{
                            showCheckbox: true,
                            enableShiftSelect: true,
                            onRowsSelected: this.onRowsSelected,
                            onRowsDeselected: this.onRowsDeselected,
                            selectBy: {
                                indexes: this.state.selectedIndexes
                            }
                        }}
                    />
                </p>
                <ButtonToolbar>
                    <Button type="submit" variant="success" className="ml-auto">
                        Save
                    </Button>&nbsp;&nbsp;
                    <Button variant="danger">Close</Button>
                </ButtonToolbar>
            </div>
        );
    }
}

export default GridSample;
