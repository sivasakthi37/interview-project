import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import TextField from "@material-ui/core/TextField";
import { connect } from 'react-redux';
import {updateData} from './../../redux/actions/contactActions';

class ModalUpdateView extends React.Component {
    constructor(props){
        super(props);
        this.state={
            open: false,
            contactName:null,
            photo:null,
            phone:null,
            email:null,
            address:null
        };
    }
    handleClose(){
        this.props.close();
    }
    handleSave(){
       let data = {
        id: this.props.data.id,
        contactName: this.state.contactName === null ? this.props.data.contactName : this.state.contactName ,
        email: this.state.email === null ? this.props.data.email : this.state.email,
        phone: this.state.phone === null ? this.props.data.phone : this.state.phone,
        address: this.state.address === null ? this.props.data.address : this.state.address,
      };
      this.props.updateData(data);
      this.props.parentData(data);
      this.handleClose();
    }
    render(){
        const {show, data} = this.props;
        return (
     <div>
      <Modal show={show} >
        <Modal.Header >
         <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Customer Name"
              type="string"
              defaultValue={data.contactName}
              fullWidth
              onChange={e => {
                this.setState({ contactName: e.target.value });
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              defaultValue={data.email}
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
            />
             <TextField
              autoFocus
              margin="dense"
              id="Address"
              label="Address"
              type="string"
              fullWidth
              defaultValue={data.address}
              onChange={e => {
                this.setState({ address: e.target.value });
              }}
            />

            <TextField
             autoFocus
             margin="dense"
             id="Phone"
             label="Phone"
             type="number"
             fullWidth
             defaultValue={data.phone}
             onChange={e => {
               console.log("eeeeeeee", e.target.value);

               this.setState({ phone: e.target.value });
             }}             
                        />
             {/* <TextField
              autoFocus
              margin="dense"
              id="image"
              label="Photo"
              type="file"
              fullWidth
              defaultValue={data.photo}
              onChange={e => {
                console.log("eeeeeeee", e.target.value);

                this.setState({ photo: e.target.value });
              }} */}
            />
            <div className="mt-2">
            <Button variant="outline-success" onClick={this.handleSave.bind(this) }>save</Button>
            <span className="ml-3">
            <Button variant="outline-danger" onClick={this.handleClose.bind(this)}> Close
            </Button>
            </span>
            </div>
          
        </Modal.Body>
      
      </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateData: (data) => dispatch(updateData(data))
 });
 
export default connect(null, mapDispatchToProps)(ModalUpdateView);