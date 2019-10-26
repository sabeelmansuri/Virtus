import React, {Component} from 'react';
import './Nav.css';

class Nav extends Component {
    reload() {
        window.location = "/";
    }

    render () {
        return (
            <div>
                <div className='nav'>
                    <button className='logo' onClick={this.reload}>VIRTUS</button>
                </div>
            </div>
        );
    }
}
export default Nav;