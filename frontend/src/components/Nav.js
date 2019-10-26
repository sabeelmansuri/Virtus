import React, {Component} from 'react';
import './Nav.css';

class Nav extends Component {
    reload() {
        window.location = "/";
    }

    logout(e) {
        e.preventDefault();
        //Logout
        window.location = "/";
    }

    isLoggedIn() {
        return true;
    }

    render () {
        let loggedin =
            <div className='nav'>
                <button className='logo' onClick={this.reload}>VIRTUS</button>
                <button className='logo' style={{float: 'right'}} onClick={e => this.logout(e)}>SIGN OUT</button>
            </div>

        let loggedout =
            <div className='nav'>
                <button className='logo' onClick={this.reload}>VIRTUS</button>
            </div>

        return (
            <div>
                {this.isLoggedIn() ? loggedin : loggedout}
            </div>
        );
    }
}
export default Nav;