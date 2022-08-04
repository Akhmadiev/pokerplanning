import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Task extends React.Component {
    render() {
        return (
            <div className="input-group mb-3">
                <input 
                    type="number"
                    className="form-control"
                    placeholder="est"
                    aria-label="JIRA"
                    aria-describedby="basic-addon2"
                    onChange={this.props.onVoteChange}
                    style={{marginRight: "2%", maxWidth: "11%"}}/>
                <input 
                    type="text"
                    readOnly={this.props.delete ? true : false}
                    className="form-control"
                    placeholder="JIRA"
                    value={this.props.inputValue}
                    aria-label="JIRA"
                    aria-describedby="basic-addon2"
                    onChange={this.props.onChange}
                    style={{backgroundColor: this.props.selected ? "#90EE90" : ""}}/>
                <div className="input-group-append">
                    <button hidden={this.props.delete ? false : true} onClick={this.props.onVoteSelect} style={{backgroundColor: "#90EE90"}} className="btn btn-outline-secondary" type="button">Vote</button>
                    <button onClick={this.props.onClick} style={{backgroundColor: this.props.delete ? "#FFCCCB" : "#90EE90"}} className="btn btn-outline-secondary" type="button">{this.props.delete ? "Delete" : "Add"}</button>
                </div>
            </div>
        );
      }
}

export default Task;