import React, { Component } from 'react';
import {
  Card,
  Row,
  Table,
} from 'reactstrap';
import axios from 'axios';
import { ALL_USERS_URL, ALL_PHOTOS_URL } from '../../utils';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      isLoading: true,
      users : [],
      photos: {}
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  componentDidMount() {
    this.populate();
  }

  populate() {
    axios.get(ALL_USERS_URL)
      .then(res => res.data)
      .then(jsonObject => jsonObject.map(user => {
          const id = user.id;
          const pathValue = ALL_PHOTOS_URL + "/" + id
          axios.get(pathValue)
           .then(res => {
               const url = res.data.thumbnailUrl;
               var photos = this.state.photos;
               photos[id] = url;
               this.setState({
                 photos: photos
               });
           })
           .catch(err => {
               console.log("Error with loading image.");
           })
          return  {
                id: `${user.id}`,
                name: `${user.name}`,
                username: `${user.username}`,
                email: `${user.email}`
            }
      }))
      .then(users => {
          this.setState({
            users: users
          });
      })
      .catch(err => {
          console.log(err);
          console.log("Error with data population.");
      });
  }

  handleClick(userValue) {
    this.props.history.push({
      pathname: '/posts',
      search: '',
      state: { userValue: userValue}
    })
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    const {users} = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Card>
              <Table hover responsive className="table-outline mb-0 d-md-table">
                <tbody>
                  { users.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td className="text-center">
                            <div className="avatar">
                              <img src={this.state.photos[item.id]} className="img-avatar" alt="" />
                              <span className="avatar-status badge-success"></span>
                            </div>
                          </td>
                          <td>
                            <div>{item.name}</div>
                            <div className="small text-muted">
                              <span>{item.username}</span>
                            </div>
                          </td>
                          <td>
                            <button onClick={this.handleClick.bind(this,item)}>
                              Open Profile
                            </button>
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

export default Dashboard;
