import 'rc-time-picker/assets/index.css';
import React from 'react';
import ReactDom from 'react-dom';
import moment from 'moment';
import TimePicker from 'rc-time-picker';

class MyTimePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            now: moment().hour(0).minute(0)
        };
        this.onChange = this.onChange.bind(this);
    }
    getFieldValue() {

        var time = this.state.now.format('h:mm a');
        return time;
    }
    onChange(now) {

        this.setState({
            now
        })

    }

    render() {
        const format = 'h:mm a';

        return (
            <div>
                <TimePicker
                    showSecond={false}
                    Value={this.state.now}
                    className="xxx"
                    onChange={this.onChange}
                    format={format}
                    use12Hours
                    inputReadOnly
                    ref={node => this.now = node}
                    defaultValue={moment()}
                />
            </div>
        );
    }
}
export default MyTimePicker;