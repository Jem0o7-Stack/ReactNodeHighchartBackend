import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios';
import $ from 'jquery';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../../css/Style.css';

import MyTimePicker from '../../component/MyTimePicker';
import EditMyTimePicker from '../../component/EditMyTimePicker';
import MyDatePicker from '../../component/MyDatePicker';
import EditMyDatePicker from '../../component/EditMyDatePicker';
import { SalesRadioField, CheckField } from '../../component/RadioCheck';
import { Link } from 'react-router-dom';
//const fruits = ['banana', 'apple', 'orange', 'tomato', 'strawberries'];

const contry = [];


 class DefaultPaginationTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {            
            data: [],
            ContactId:'',
            mess: '',
            Fname: '',
            email: '',
            radval: '',
            isChecked: false,
            isCheckedf: false,
            isCheckedc: false,
            dateup: '',
            timeupdate:'',
            totalDataSize:'',
            value: '0',
            modal: false,
            page: '1',
            sizePerPage:'10'

        };
        this.fetchData = this.fetchData.bind(this);
        this.onAfterInsertRow=this.onAfterInsertRow.bind(this);
        this.getState = this.getState.bind(this);
        onPageChange: this.onPageChange.bind(this);
        getcountry: this.getcountry.bind(this);
        this.onAfterDeleteRow = this.onAfterDeleteRow.bind(this);
        this.afterSaveCell = this.afterSaveCell.bind(this);
        this.customNameField = this.customNameField.bind(this);
        this.togglepopup = this.togglepopup.bind(this);
        this.closepopup = this.closepopup.bind(this);
        this.logChange = this.logChange.bind(this);
        this.customdatepicker = this.customdatepicker.bind(this);
        this.customtimepicker = this.customtimepicker.bind(this);
        this.commaseprateval = this.commaseprateval.bind(this);
        this.getCheckFieldValue = this.getCheckFieldValue.bind(this);
        this.contrystatechange = this.contrystatechange.bind(this);
    }
   
    componentDidMount() {
         
        this.fetchData();
        this.getcountry();
         
    }
     
    getcountry() {
        var url = 'http://localhost:1337/GetCountry';
       
         fetch(url)
            .then(response => {
                return response.json();
            })
             .then(country => {
                 //alert(JSON.stringify(country));
                
                for (var i = 0; i < country.length; i++) {
                    contry.push(country[i]);                   
                }
                
            });
       
    }

    fetchData() {
        
        var tp = this.state.page;
        var ts = this.state.sizePerPage;
       
        var url = "http://localhost:1337/GetData";
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                page: tp,
                sizePerPage: ts,
            }),
        })
            .then(response => {
                return response.json();
            })
            .then (data => {
                
                if (data.length > 0) {
                    this.setState({
                        data,
                        totalDataSize: data[0]['dataTotalSize']
                    })
                }
                else {
                    this.setState({
                        data,
                        totalDataSize:0
                    })
                }
            });
    }
   
    getState(e) {
        
        // Effect on Contry dropdown this.setState when insert data
        this.setState({
            value: e.target.value
        })
 
        var index = e.nativeEvent.target.selectedIndex;  
        var url = "http://localhost:1337/getState";
        $.ajax({
            url: url,
            method: 'GET',
            data: { "index": index },
            success: function (data) {
             // Blank value of dropdown list
                $('#ddlNationality').html('');

                $.each(data, function () {
                    $("#ddlNationality").append($("<option     />").val(this.stId).text(this.stName));
                });
                // alert(JSON.stringify(cnstate));
            }
        });         

    }

    contrystatechange(row) {
        //alert(JSON.stringify(row.Email));
        var index = row.Fullname;

        var url = "http://localhost:1337/getState";
        $.ajax({
            url: url,
            method: 'GET',
            data: { "index": index },
            success: function (data) {
                // Blank value of dropdown list
                $('#ddlNationality').html('');

                $.each(data, function () {
                    $("#ddlNationality").append($("<option     />").val(this.stId).text(this.stName));
                });
                // alert(JSON.stringify(cnstate));
            }
        });
    }

    onAfterInsertRow(row) {
       // alert();
        var self = this;
        var url = "http://localhost:1337/SaveData";      
        axios.post(url, row).then((response) => {
            
            self.fetchData();           
            //window.location.reload();
        })
            
    }

    onAfterDeleteRow(ids) {
        
        var url = 'http://localhost:1337/DeleteData';
        
        axios.post(url, ids).then((response) => {
           
        }).then(response => {
           
            this.fetchData();
           // this.onPageChange();

         })
    }

    onPageChange(page, sizePerPage) {

        //  alert(`page: ${page}, sizePerPage: ${sizePerPage}`);

        var url = "http://localhost:1337/PageData";
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                page: page,
                sizePerPage: sizePerPage,
            }),
        })
            .then(response => {
                return response.json();
            })
            .then(data => this.setState({
                data,
                page,
                sizePerPage
            }));
    }

    createCustomInsertButton(cell,row) {
      //  alert(JSON.stringify(row));
        return (
            <InsertButton
                btnText='Edit'
                btnContextual='btn-warning'
                className='my-custom-class'
                btnGlyphicon='glyphicon-edit'
                onClick={() => { this.togglepopup(row); this.contrystatechange(row); }} />
        );
    }

    togglepopup(row) {
      
        if (row.ContactID == undefined) {
            
            this.setState({
                modal: this.state.modal
            })          
        } else {
            
            this.setState({
                modal: !this.state.modal,
                ContactId: row.ContactID,
                Fname: row.Fullname,
                email: row.Email,
                mess: row.Message,
                radval: row.Gender,
                dateup: row.Date,
                timeupdate: row.Time
            })

            this.commaseprateval(row.Games);
        }
        
       
    }

    closepopup() {
        this.setState({
            modal: !this.state.modal
        })
    }

    logChange(e) {
        this.setState({
            [e.target.name]: e.target.value //setting value edited by the admin in state.
        });
    }

    commaseprateval(game) {
       
        this.setState({
            isChecked: false,
            isCheckedf: false,
            isCheckedc: false
        })
        var myarray = game.split(',');       
        for (var i = 0; i < myarray.length; i++)
        {
           
            if (myarray[i] === "Hockey") {
                this.setState({
                    isChecked: true
                })
            } else if (myarray[i] === "Football") {
                this.setState({
                    isCheckedf: true
                })
            } else if (myarray[i] === "Cricket") {
                this.setState({
                    isCheckedc: true
                })
            }
           
        }
          
    }

    getCheckFieldValue() {
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

    }

    async afterSaveCell() {
        let data = [];
        var contry = $('#ModalCountry').val();
        var sts = $('#ddlNationality').val();
        var mess = $('#mess').val();
        var Id = $('#contid').val();
        var fm = this.state.radval;
        var chekval = this.getCheckFieldValue();
        var Editdate = this.refs.EditMyDatePicker.getDateEditValue();
        var Edittime = this.refs.EditMyTimePicker.getEditTimeValue();
        //alert(Edittime);
        data.push({ "ContactId": Id }, { "Country": contry }, { "State": sts }, { "msg": mess }, { "gender": fm }, { "games": chekval }, { "date": Editdate }, { "time": Edittime });
      
      var url = 'http://localhost:1337/EditData';
      await axios.post(url, data).then((response) => {
            //alert("Successfully Updated Data");
            this.setState({
                modal: !this.state.modal               
            });
        });

        this.fetchData();
    }

    createCustomModalHeader(onClose, onSave) {
        return (
            <div className='modal-header'>
                <button type="button" class="close" onClick={onClose}>
                    <span aria-hidden="true">×</span>
                    <span class="sr-only">Close</span>
                </button>
                <h4 class="modal-title">That is my custom header</h4>
            </div>
        );
    }

    customNameField(column, attr, editorClass, ignoreEditable, defaultValue) {
       
        return (
            
            <select className={`${editorClass}`} {...attr} onChange={this.getState.bind(this)} value={this.state.value}>
                <option value='0' disabled>--Select Country--</option>
                {
                    contry.map((name) => (<option key={name} value={name.conId}>{name.conName}</option>))
                }
            </select>
        );
    }

    customEmailField(column, attr, editorClass, ignoreEditable, defaultValue) {

        return (
            <select id="ddlNationality" className={`${editorClass}`} {...attr} >
                <option value="0" >--Select State--</option>
            </select>
            
        );
    }

    customSaleField(column, attr, editorClass, ignoreEditable, defaultValue){
        /*
          Sometime, your field is not only a HTML element, like radio, checkbox etc.
          In this case, you are suppose to be prodived a specific method name for
          react-bootstrap-table to get the value for this field.
          Notes:
          1. You are suppose to be added ref to your custom React class
          2. You are suppose to be implement getFieldValue function and return the value that user input
        */
        return (
            <SalesRadioField ref={attr.ref} editorClass={editorClass} ignoreEditable={ignoreEditable} />
        );
    }

    customCheckField(column, attr, editorClass, ignoreEditable, defaultValue) {
        return (
            <CheckField ref={attr.ref} editorClass={editorClass} ignoreEditable={ignoreEditable} />
        );
    }

    customdatepicker(column, attr, editorClass, ignoreEditable, defaultValue) {
        return (
            <MyDatePicker ref={attr.ref} editorClass={editorClass} ignoreEditable={ignoreEditable} />
        );
    }

    customtimepicker(column, attr, editorClass, ignoreEditable, defaultValue) {
        return (
            <MyTimePicker ref={attr.ref} editorClass={editorClass} ignoreEditable={ignoreEditable} />
        );
    }

    render() {
       
        const options = {
            afterDeleteRow: this.onAfterDeleteRow,
            afterInsertRow: this.onAfterInsertRow,
            insertModalHeader:this.createCustomModalHeader,
            customNameField: this.customNameField,
            customSaleField: this.customSaleField,
            customCheckField: this.customCheckField,
            customEmailField: this.customEmailField,
            customdatepicker: this.customdatepicker,
            exportCSVText: 'my_export',
            insertText: 'my_insert',
            deleteText: 'my_delete',
            saveText: 'my_save',
            closeText: 'my_close',
            onPageChange: this.onPageChange.bind(this)
        };
        const selectRowProp = {
            mode: 'checkbox'
        };
        const cellEditProp = {           
           // mode: 'click',
           // afterSaveCell: this.afterSaveCell,
           // blurToSave: true
        };
        const mt = {
            'margin-top': 20
        };
        const { onChange } = this.props;
        return (
            <div>

                <div>
                    <Modal isOpen={this.state.modal} toggle={this.togglepopup} className={this.props.className} id="popupid">
                        <ModalHeader toggle={this.togglepopup}>Edit</ModalHeader>                      
                        <ModalBody>
                           <form id="formid">
                            <div className="row">
                                <div className="col-sm-1">
                                   
                                </div>
                                <div className="col-sm-11">
                                    <input type="hidden" value={this.state.ContactId} id="contid" className="form-control" />
                                </div>
                           </div>
                                
                                <div className="row">
                                    <div className="col-sm-2">
                                        <label>Country</label>
                                    </div>
                                    <div className="col-sm-10">
                                        <select className="form-control" id="ModalCountry" value={this.state.Fname} name='Fname' onChange={(e) => { this.getState(e); this.logChange(e) }}>
                                            <option value='0' disabled>--Select Country--</option>
                                            {
                                                contry.map((name) => (<option key={name} value={name.conId}>{name.conName}</option>))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="row" style={mt}>
                                    <div className="col-sm-2">
                                        <label>State</label>
                                    </div>
                                    <div className="col-sm-10">
                                        <select id="ddlNationality" className="form-control" value={this.state.email} onChange={this.logChange} name='email'>
                                           
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="row" style={mt}>
                                <div className="col-sm-2">
                                    <label>Message</label>
                                </div>
                                    <div className="col-sm-10">
                                       <input type="text" value={this.state.mess} onChange={this.logChange} name='mess' id="mess" className="form-control" />
                                    </div>                            
                                </div>
                                <div className="row" style={mt}>
                                    <div className="col-sm-2">
                                        <label>Gender</label>
                                    </div>
                                    <div className="col-sm-10">
                                        <label className='radio-inline'>
                                            <input type='radio' onChange={(e) => this.setState({ radval: e.target.value })} name='optradio' value='Male' checked={this.state.radval === "Male"}/>Male
                                        </label>
                                        <label className='radio-inline'>
                                            <input type='radio' onChange={(e) => this.setState({ radval: e.target.value })} name='optradio' value='Female' checked={this.state.radval === "Female"} />Female
                                        </label>
                                    </div>
                                </div>
                                <div className="row" style={mt}>
                                    <div className="col-sm-2">
                                        <label>Games</label>
                                    </div>
                                    <div className="col-sm-10">
                                        <label className='checkbox-inline'>
                                            <input ref='Hockey' type='Checkbox' name='optcheck' onChange={(e) => this.setState({isChecked: !this.state.isChecked })} value='Hockey' checked={this.state.isChecked}/>Hockey
                                        </label>
                                        <label className='checkbox-inline'>
                                            <input ref='Football' type='Checkbox' name='optcheck' onChange={(e) => this.setState({ isCheckedf: !this.state.isCheckedf })} value='Football' checked={this.state.isCheckedf} />Football
                                        </label>
                                        <label className='checkbox-inline'>
                                            <input ref='Cricket' type='Checkbox' name='optcheck' onChange={(e) => this.setState({ isCheckedc: !this.state.isCheckedc })} value='Cricket' checked={this.state.isCheckedc}/>Cricket
                                        </label>                                        
                                    </div>
                                </div>
                                <div className="row" style={mt}>
                                    <div className="col-sm-2">
                                        <label>Date</label>
                                    </div>
                                    <div className="col-sm-10">
                                        <EditMyDatePicker value={this.state.dateup} ref="EditMyDatePicker" />
                                    </div>
                                </div>
                                <div className="row" style={mt}>
                                    <div className="col-sm-2">
                                        <label>Time</label>
                                    </div>
                                    <div className="col-sm-10">
                                        <EditMyTimePicker value={this.state.timeupdate} ref="EditMyTimePicker" />
                                    </div>
                                </div>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.closepopup}>Close</Button>
                            <Button color="primary" onClick={this.afterSaveCell}>Save</Button>{' '}                           
                        </ModalFooter>
                    </Modal>
                </div>

                <div>
                    <div className="row">
                        <div className="col-sm-1">
                            <Link to="/About">About</Link>
                        </div>
                        <div className="col-sm-1">
                            <Link to="/ImageUpload">ImageUpload</Link>
                        </div>
                        <div className="col-sm-1">
                            <Link to="/HighChartReact">Graph</Link>
                        </div>
                    </div>
                                      
                </div>

                <div>
                   
                    <BootstrapTable data={this.state.data}
                        deleteRow={true}
                        selectRow={selectRowProp}
                        options={options}
                        search={true}
                        exportCSV
                        hover
                        cellEdit={cellEditProp}
                        remote={true}
                        pagination={true}
                        fetchInfo={{ dataTotalSize: this.state.totalDataSize }}
                        insertRow={true}
                    >
                    <TableHeaderColumn dataField='ContactID' hidden hiddenOnInsert isKey width={100} autoValue>Contact ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='Fullname' customInsertEditor={{ getElement: this.customNameField }} width={100}> Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='Email' customInsertEditor={{ getElement: this.customEmailField }} width={100}>Email </TableHeaderColumn>            
                    <TableHeaderColumn dataField='Message' width={200}>Message </TableHeaderColumn>
                    <TableHeaderColumn dataField='Gender' customInsertEditor={{ getElement: this.customSaleField }} width={100}>Gender </TableHeaderColumn>
                    <TableHeaderColumn dataField='Games' width={150} customInsertEditor={{ getElement: this.customCheckField }}>Game </TableHeaderColumn>
                    <TableHeaderColumn dataField='Date' customInsertEditor={{ getElement: this.customdatepicker }} width={100} >Date</TableHeaderColumn>
                    <TableHeaderColumn dataField='Time' customInsertEditor={{ getElement: this.customtimepicker }} width={100} >Time</TableHeaderColumn>
                    <TableHeaderColumn  width='100' dataFormat={this.createCustomInsertButton.bind(this)} >Edit</TableHeaderColumn>
                </BootstrapTable>
                </div>

                
            </div>
        );
    }
   
}

export default DefaultPaginationTable; 

//ReactDOM.render(
//    <DefaultPaginationTable />,
//    document.getElementById('container')
//);


//--For Pagination--
//http://allenfang.github.io/react-bootstrap-table/docs.html#fetchInfo
//https://gist.github.com/xabikos/fcd6e709f8ae0c11e33b