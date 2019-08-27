import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authentication';
import classnames from 'classnames';


class Login extends React.Component {

  constructor() {
      super();
      this.state = {
        username: 'esoko',
        password: 'insyt',
        errors: {}
      }
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
      this.setState({
          [e.target.name]: e.target.value
      })
  }

  handleSubmit(e) {
      e.preventDefault();
      const user = {
          username: this.state.username,
          password: this.state.password,
      }
      this.props.loginUser(user);
  }

  componentDidMount() {
      if(this.props.auth.isAuthenticated) {
          this.props.history.push('/');
      }
  }

  componentWillReceiveProps(nextProps) {
      if(nextProps.auth.isAuthenticated) {
          this.props.history.push('/')
      }
      if(nextProps.errors) {
          this.setState({
              errors: nextProps.errors
          });
      }
  }

  render() {
      const {errors} = this.state;
      return (
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="8">
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <Form onSubmit={ this.handleSubmit }>
                        <h1>Insyt Groove</h1>
                        <p className="text-muted">Sign In</p>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>

                          <Input type="text"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.email
                            })}
                            name="username"
                            onChange={ this.handleInputChange }
                            value={ this.state.username }
                            placeholder="Username"
                            autoComplete="username" />
                            {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="password"
                            placeholder="Password"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.password
                            })}
                            name="password"
                            onChange={ this.handleInputChange }
                            value={ this.state.password }
                          />
                        </InputGroup>
                        <Row>
                          <Col xs="6">
                            <Button color="primary" type="submit" className="px-4">Login</Button>
                          </Col>
                          <Col xs="6" className="text-right">
                            <Button color="link" type="button" className="px-0">Forgot password?</Button>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                  <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                    <CardBody className="text-center">
                      <div>
                        <h2>Sign up</h2>
                        <p>Share with friends on Insyt Groove today!</p>
                        <Link to="/register">
                          <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                        </Link>
                      </div>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login)
