import React, {Component} from 'react';
import './Nav.css';
import {db} from '../db';

class Nav extends Component {
    reload = () => {
        if (this.props.isLoggedIn) {
            window.location = "/courses";
        } else {
            window.location = "/";
        }
    };

    logout(e) {
        e.preventDefault();
        db.auth().signOut().then(function () {
        }, function (error) {
        });
        window.location = "/";
    }

    isLoggedIn() {
        return this.props.isLoggedIn;
    }

    render() {
        let loggedin =
            <div className='nav'>
                <button className='logo' onClick={this.reload}>VIRTUS</button>
                <button className='logo' style={{float: 'right !important'}} onClick={e => this.logout(e)}>SIGN OUT</button>
            </div>;

        let loggedout =
            <div className='nav'>
                <button className='logo' onClick={this.reload}>VIRTUS</button>
            </div>;

        return (
            <div>
                {this.isLoggedIn() ? loggedin : loggedout}
            </div>
        );
    }
}

export default Nav;