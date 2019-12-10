import React, { Component } from "react";
import ReactDOM from "react-dom";
import DatePicker from 'react-date-picker';
import { debug } from "util";


class MyDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        };
        this.onChangedate = this.onChangedate.bind(this);
    }
    getFieldValue() {
       
        var temp = this.state.date;

        var date = temp.getDate();
        var month = temp.getMonth(); //Be careful! January is 0 not 1
        var year = temp.getFullYear();

        var dateString = (month + 1)+ "/" + date + "/" + year;

        return dateString;
    }
    onChangedate(date) {

        this.setState({
            date
        })

    }

    render() {
       
        return (
            <div>
                <DatePicker
                    onChange={this.onChangedate}
                    value={this.state.date}
                    calendarIcon={null}
                    ref={node => this.date = node}
                />
            </div>
        );
    }
}
export default MyDatePicker;