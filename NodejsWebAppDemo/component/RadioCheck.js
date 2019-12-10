import React, { Component } from "react";
import ReactDOM from "react-dom";

export class SalesRadioField extends React.Component {

    getFieldValue() {
        return this.refs.Male.checked ? 'Male' : 'Female';
    }

    render() {
        return (
            <div>
                <label className='radio-inline'>
                    <input ref='Male' type='radio' name='optradio' value='Yes' />Male
                </label>
                <label className='radio-inline'>
                    <input ref='Female' type='radio' name='optradio' value='No' />Female
                </label>
            </div>

        );
    }
}

export class CheckField extends React.Component {

    getFieldValue() {
        var games = [];
        var temp;
        if (this.refs.Hockey.checked == true) {
            games.push('Hockey');
        }
        if (this.refs.Football.checked == true) {
            games.push('Football');
        }
        if (this.refs.Cricket.checked == true) {
            games.push('Cricket');
        }
        // alert(games);
        return games;

        // return this.refs.Hockey.checked;
    }

    render() {
        return (
            <div>

                <label className='checkbox-inline'>
                    <input ref='Hockey' type='Checkbox' name='optcheck' value='Hockey' />Hockey
                </label>
                <label className='checkbox-inline'>
                    <input ref='Football' type='Checkbox' name='optcheck' value='Football' />Football
                </label>
                <label className='checkbox-inline'>
                    <input ref='Cricket' type='Checkbox' name='optcheck' value='Cricket' />Cricket
                </label>

            </div>

        );
    }
}