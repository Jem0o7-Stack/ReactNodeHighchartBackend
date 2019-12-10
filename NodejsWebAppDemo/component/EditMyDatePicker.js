import React, { Component } from "react";
import ReactDOM from "react-dom";
import DatePicker from 'react-date-picker';
import { debug } from "util";


class EditMyDatePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(props.value),
        };
        this.onChangedate = this.onChangedate.bind(this);
        //this.getDateEditValue = this.getDateEditValue.bind(this);
    }
    getDateEditValue() {
        var temp = this.state.date;

        var date = temp.getDate();
        var month = temp.getMonth(); //Be careful! January is 0 not 1
        var year = temp.getFullYear();

        var dateString = (month + 1) + "/" + date + "/" + year;

        return dateString;
    }
    onChangedate(date) {
       
        this.setState({
            date
        })

    }

    render() {      
        const { value } = this.props;
     
        return (
            <div>
                <DatePicker
                    onChange={this.onChangedate}
                    value={this.state.date}
                    calendarIcon={null}                   
                />
            </div>
        );
    }
}
export default EditMyDatePicker;