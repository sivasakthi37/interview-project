import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { setAddData } from "./../../redux/actions/contactActions";
import axios from "axios";

const API_BASE = "http://localhost:3000";
class ModalView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      contactName: null,
      photo: null,
      phone: null,
      email: null,
      address: null
    };
    // this.submitForm = this.submitForm.bind(this);
  }
  handleClose() {
    this.props.close();
  }

  // submitForm(contentType, data, setResponse) {
  //   axios({
  //   url: `${API_BASE}/src`,
  //   method: 'POST',
  //   data: data,
  //   headers: {
  //   'Content-Type': contentType
  //   }
  //   }).then((response) => {
  //   setResponse(response.data);
  //   }).catch((error) => {
  //   setResponse("error");
  //   })
  // }

  handleSave() {
    let data = {
      id: new Date().getUTCMilliseconds(),
      contactName: this.state.contactName,
      photo: this.state.photo,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address
    };
    // const file = this.state.photo;
    // const formData = new FormData();
    // formData.append("file", file);
    // this.submitForm("multipart/form-data", formData, (msg) => console.log(msg));
    this.props.setAddData(data);
    this.handleClose();
  }
  uploadImage = element => {
    var file = element.target.files[0];
    var reader = new FileReader();
    console.log("this.state.email", this.state);
    let { email } = this.state;
    reader.onloadend = function() {
      console.log("RESULT", reader.result);
      // this.setState({ photo:JSON.stringify(reader.result) });
      localStorage.setItem(email && email, reader.result);
    };
    reader.readAsDataURL(file);
    // console.log("hfchg", reader.readAsDataURL(file));
  };

  render() {
    const { show } = this.props;
    return (
      <div>
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>Create</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Customer Name"
              type="string"
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
              onChange={e => {
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
              onChange={e => {
                let data = new FormData();
                data.append("image", e.target.files[0]);
                this.setState({ photo: data });
              }}
            /> */}
            <input
              ref={fileInput => (this.fileInput = fileInput)}
              type="file"
              className="uploadImage"
              onChange={evt => this.uploadImage(evt)}
            />
            {/* <img alt="sample" src={localStorage.getItem("uploadpic")} /> */}
            <div className="mt-2">
              <Button
                variant="outline-success"
                onClick={this.handleSave.bind(this)}
              >
                save
              </Button>
              <span className="ml-3">
                <Button
                  variant="outline-danger"
                  onClick={this.handleClose.bind(this)}
                >
                  Close
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
  setAddData: data => dispatch(setAddData(data))
});

export default connect(
  null,
  mapDispatchToProps
)(ModalView);
