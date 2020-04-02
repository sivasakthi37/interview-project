import React from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { Container, Row, Col, Button, Table, Image } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Modal from "./../modal";
import { deleteData } from "./../../redux/actions/contactActions";
import ModalUpdateView from "./../updateModal";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  }
}));
class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      updateShow: false,
      viewObj: {},
      updateData: {},
      searchField: ""
    };
    this.handleModal = this.handleModal.bind(this);
    this.handleUpdatedData = this.handleUpdatedData.bind(this);
    this.handleEditModalClose = this.handleEditModalClose.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleModal() {
    this.setState({ open: !this.state.open });
  }
  handleClose() {
    this.setState({ open: false });
  }

  handleView(id) {
    const obj = this.props.contactListData.find(el => el.id === id);
    this.setState({ viewObj: obj });
  }
  handleEditModal(data) {
    this.setState({ updateShow: true, updateData: data });
  }

  handleEditModalClose() {
    this.setState({ updateShow: false });
  }

  handleDelete(id) {
    this.props.deleteData(id);
    this.setState({ viewObj: {} });
  }
  handleUpdatedData(data) {
    this.setState({ viewObj: data });
  }

  render() {
    const filteredData = this.props.contactListData.filter(el =>
      el.contactName.includes(this.state.searchField)
    );
    const classes = <useStyles />;
    return (
      <div>
        <Modal show={this.state.open} close={this.handleClose} />
        <ModalUpdateView
          show={this.state.updateShow}
          parentData={this.handleUpdatedData}
          data={this.state.updateData}
          close={this.handleEditModalClose}
        />

        <Container>
          <Row>
            <Col xs={12} md={8}>
              <div className="d-flex justify-content-between mt-5 ">
                <FormControl
                  type="text"
                  placeholder="Search"
                  onChange={e => {
                    this.setState({ searchField: e.target.value });
                  }}
                  className="w-50"
                />
                <Button variant="outline-info" onClick={this.handleModal}>
                  Add contacts
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={8}>
              <div className="mt-5">
                <Table responsive="sm">
                  <thead variant="success">
                    <tr>
                      <th>ID</th>
                      <th>Contact info</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData &&
                      filteredData.map(el => (
                        <tr>
                          <td>{el.id}</td>
                          <td>
                            <div className="d-flex justify-content-start">
                              <Avatar
                                alt="Remy Sharp"
                                src={localStorage.getItem(el.email)}
                                className={classes.small}
                              />
                              <span>{el.contactName}</span>{" "}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex ">
                              <Button
                                variant="outline-info"
                                onClick={this.handleEditModal.bind(this, el)}
                              >
                                Edit
                              </Button>
                              <span className="ml-4">
                                {" "}
                                <Button
                                  onClick={this.handleView.bind(this, el.id)}
                                  variant="outline-success"
                                >
                                  View
                                </Button>
                              </span>
                              <span className="ml-4">
                                {" "}
                                <Button
                                  onClick={this.handleDelete.bind(this, el.id)}
                                  variant="outline-danger"
                                >
                                  Delete
                                </Button>
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </Col>

            <Col>
              <div className="mt-5">
                <Card className={classes.root}>
                  <CardContent>
                    <div>
                      <ul>
                        <li>
                          {this.state.viewObj && this.state.viewObj.contactName}
                        </li>
                        <li>
                          {this.state.viewObj && this.state.viewObj.email}
                        </li>
                        <li>
                          {this.state.viewObj && this.state.viewObj.address}
                        </li>
                        <li>
                          {this.state.viewObj && this.state.viewObj.phone}
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardActions></CardActions>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ contactReducer }) => ({
  contactListData: contactReducer.contactListData
});
const mapDispatchToProps = dispatch => ({
  deleteData: id => dispatch(deleteData(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contact);
