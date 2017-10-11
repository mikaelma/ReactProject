import React, {Component} from 'react';

class ProfilePage extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
          <div id="Container">
              <label>Name</label>
              <input type="text" placeholder="Enter Name" name="name" />

              <label>Email</label>
              <input type="text" placeholder="Enter Email" name="email" />

              <label>Phone</label>
              <input type="text" placeholder="Enter Number" name="phone" />

              <label>Address</label>
              <input type="text" placeholder="Enter Address" name="address" />
          </div>
        );
    }
}

export default ProfilePage;