import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

const API_PATH = 'my-app/api/contact/index.php';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Contact Us</h1>
        <div>
          <form action ="api/contact/index.php">
            <label>Name</label>
            <input type = "text" id="name" name="name" placeholder="Your name:" minLength="4" maxLength="30" required 
            value={this.state.name} onChange={e => this.setState({name: e.target.value})}/>

            <label>Email</label>
            <input type = "email" id="email" name="email" placeholder="Enter email eg ilja@ilja.com" pattern="[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*" required
            value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>

            <label>Phone</label>
            <input type="number" id="phone" name="phone" placeholder="Phone number" minLength="8" maxLength="10" pattern="/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/" required
            value={this.state.phone} onChange={e => this.setState({phone: e.target.value})}/>

            <label>Address</label>
            <input type="text" id="address" name="address" placeholder="Address" minLength="5" maxLength="40" required
            value={this.state.address} onChange={e => this.setState({address: e.target.value})}/>

            <label>Date of birth</label>
            <input type="date" id="date" name="date" placeholder="DOB" required
            value={this.state.date} onChange={e => this.setState({date: e.target.value})}/>
            
            <input type="submit" value="Submit"/>
            <div>
              {this.state.mailSent &&
                <div> Thank you for contacting us. </div>
              }
            </div>
          
          </form>
        </div>
      </div>
    );
  }
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      address: '',
      date: '',
      mailSent: false,
      error: null
    }
  }

  handleFormSubmit = e => {
      e.preventDefault();
      axios({
        method: 'post',
        url: 'api/contact/index.php',
        headers: {'content-type': 'application/json'},
        data: this.state
      })
      .then(result =>{
        this.setState({
          mailSent: result.data.sent
        })
      })
      .catch(error => this.setState({error: error.message}));
    };
}





export default App;
