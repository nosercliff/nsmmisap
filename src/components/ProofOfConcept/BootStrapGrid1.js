import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";

class BootStrapGrid1 extends Component {
    constructor() {
        super();
        this.state = {};
    }

 componentDidMount() {
        fetch("http://43.255.218.197:8080/home").then((response) => response.json()).then((data) => {
            console.log(data);
            this.setState({
                products: data
            });
        });
    }


    render() {
        const columns = [
            {
                dataField: "id",
                text: "Product ID"
            },
            {
                dataField: "title",
                text: "Product Name"
            },
            {
                dataField: "count",
                text: "Product Price"
            }
        ];

        const selectRow = {
            mode: "checkbox",
            //clickToSelect: true,
            clickToSelectAndEditCell: true
        };

        const products = [
            /* {"id" : 0, "name" : "Item 1", "price" : 100},
            {"id" : 1, "name" : "Item 2", "price" : 200},
            {"id" : 2, "name" : "Item 3", "price" : 300} */
        ];

        return (
            <div>
                0 rows selected
                <br />
                <BootstrapTable keyField="id" data={products} columns={columns} selectRow={selectRow} cellEdit={cellEditFactory({ mode: "dbclick", blurToSave: true })} />
                <input type="button" value="Save" />
            </div>
        );
    }
}

export default BootStrapGrid1;
