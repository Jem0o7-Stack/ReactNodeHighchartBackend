import 'rc-time-picker/assets/index.css';
import React from 'react';
import moment from 'moment';
import TimePicker from 'rc-time-picker';

class EditMyTimePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            now: new moment().hour(0).minute(0),
            value: props.value           
        };
        this.onChangeTime = this.onChangeTime.bind(this);
    }
    getEditTimeValue() {
       
        var time = this.state.now.format('h:mm a');      
        if (time == '12:00 am') {           
            var time = this.state.value;
            return time;
        } else {
            var time = this.state.now.format('h:mm a');
             return time;
        }       
    }
    
    onChangeTime(now) {
       
        this.setState({
            now
        })  
    }
    
    render() {
        const format = 'h:mm a';
        //const { value } = this.props;      
        return (
            <div>
                <TimePicker
                    showSecond={false}
                    Value={this.state.now}
                    className="xxx"
                    onChange={this.onChangeTime}
                    format={format}
                    use12Hours
                    id="timepicker1"
                    ref={node => this.now = node}
                    //defaultValue={moment()}
                    placeholder={this.state.value}
                                      
                />
            </div>
        );
    }
}

export default EditMyTimePicker;
