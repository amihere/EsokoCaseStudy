import React, { Component } from 'react';
import {
  Card,
  Row,
  Col,
  Table
} from 'reactstrap';

import axios from 'axios';
import { ALL_POSTS_URL, ALL_PHOTOS_URL } from '../../utils';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      user: props.location.state.userValue,
      photoUrl: "",
      posts: []
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  componentDidMount() {
    this.populate();
  }

  populate() {

    const id = this.state.user.id;
    const pathValue = ALL_PHOTOS_URL + "/" + id
    axios.get(pathValue)
     .then(res => {
         const url = res.data.url;
         this.setState({
           photoUrl: url
         });
     })
     .catch(err => {
         console.log("Error with loading image.");
     });

    axios.get(ALL_POSTS_URL + "?userId=" + id)
      .then(res => res.data)
      .then(jsonObject => jsonObject.map(post => {
          return  {
                id: `${post.id}`,
                title: `${post.title}`,
                body: `${post.body}`
            }
      }))
      .then(posts => {
          this.setState({
            posts: posts
          });
      })
      .catch(err => {
          console.log(err);
          console.log("Error with data population.");
      });
  }
  render() {
    const posts = this.state.posts;
    const user = this.state.user;
    const photoUrl = this.state.photoUrl;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <img className="img-avatar" src={photoUrl} alt="user profile" />
          </Col>
        </Row>
        <Row>
          <Col xs="6" md="6" sm="6" className="text-center">
            <p text-align = "center" className="form-control-static">Posts By {user.name}</p>
          </Col>
        </Row>
        <Row>
          <Card>
              <Table hover responsive className="table-outline mb-0 d-md-table">
                <tbody>
                  { posts.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>
                            <div className="small text-muted">
                              <span>{item.title}</span>
                            </div>
                            <div>{item.body}</div>
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </Table>
          </Card>
        </Row>
      </div>
    );
  }
}

export default UserProfile;
