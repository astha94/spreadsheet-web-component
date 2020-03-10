import React from 'react';
import PropTypes from 'prop-types'
import Row from './Row'

/**
 * Table is an array of rows, it stores the user input cell values.
 * Each table is stored on database as a JSON object for persistence.
 * Communication between the react component and backend mostly occurs here.
 */

export default class Table extends React.Component {
    constructor(props) {
        super(props)

        if (window.table_data_string) {
            var decodeHTML = function (html){
                var txt = document.createElement('textarea');
                txt.innerHTML = html;
                return txt.value;
            };

            this.state = {
                data: JSON.parse(decodeHTML(window.table_data_string)),
                col: this.props.y,
                row: this.props.x
            }}
        else{
            this.state = {
                data: {},
                col: this.props.y,
                row: this.props.x
            }}

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddRow = this.handleAddRow.bind(this);
    }

    handleChangedCell = ({ x, y }, value) => {
        const modifiedData = Object.assign({}, this.state.data)
        if (!modifiedData[y]) modifiedData[y] = {}
        modifiedData[y][x] = value
        this.setState({ data: modifiedData })

    }

    updateCells = () => {
        this.forceUpdate()
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault()
        this.setState({y: this.state.col += 1})
    }

    handleAddRow(event) {
            event.preventDefault()
            this.setState({x: this.state.row += 1})
        }

        /**
            * Render handles saving the table to the database and displaying rows with user input
        */

    render() {
        const rows = []
        for (let y = 0; y < this.state.row + 1; y += 1) {
            const rowData = this.state.data[y] || {}
            rows.push(
                <Row
                    handleChangedCell={this.handleChangedCell}
                    updateCells={this.updateCells}
                    handleSubmit = {this.handleSubmit}
                    key={y}
                    y={y}
                    x={this.state.col}
                    rowData={rowData}
                />,
            )
        }

        return (

            <div>
                {rows}
                <form onSubmit={this.handleSubmit}>
                        <select value={this.state.value} onChange={this.handleChange}>
                            <option selected placeholder= "new col"> Select Type </option>
                            <option value= "string"> String </option>
                            <option value= "integer"> Integer</option>
                        </select>
                    <input type="submit" value="Add New Column" />
                </form>
                <form onSubmit={this.handleAddRow}>
                    <input type="submit" value="Add New Row" />
                </form>

                <label> Your sheet ID is: {window.token} </label>

                <button onClick={async () =>{
                    const modifiedData = this.state.data
                    const numRows = this.state.row
                    const numCols = this.state.col
                    const testing = {modifiedData, numRows, numCols}
                    const response = await fetch("/" + window.token, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(testing)
                    });

                    if (response.ok) {
                        console.log("spreadsheet saving worked!");

                    }                }}>
                    Save
                </button>

            </div>
        )
    }
}

Table.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    id: PropTypes.string,
    saveToLocalStorage: PropTypes.bool
}

Table.defaultProps = {
  saveToLocalStorage: true,
  id: 'default'
}