import React, { Component } from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import '../css/TopBar.css';
import UserBar from './UserBar';

class TopBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            userID: localStorage.getItem('userID'),
            openUserMenu: false
        }
    }

    logOff(){
        localStorage.clear();
        this.setState({userID: null});
    }

    render() {
        const loggedIn = !(this.state.userID === null);
        
        return (
            <React.Fragment>
                <Navbar id="navHelper" variant="dark" expand="lg" style={{backgroundColor: "#2A2A31"}}>
                        <Navbar.Brand id="brandDisappear" style={{textAlign: "center"}} href="/">ThemePark</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto" style={{margin: "0 auto", paddingTop: "0.3125rem"}}>
                                <Nav.Link className="brandStyle" href="/">Theme Park</Nav.Link>
                                <Nav.Link href="/park-tickets">Buy Tickets</Nav.Link>
                                <Nav.Link href="/rides" >Rides</Nav.Link>
                                <Nav.Link href="/dining">Dining</Nav.Link>
                                {loggedIn ? <UserBar openUserMenu={this.state.openUserMenu} openMenu={() => this.setState({openUserMenu: true})} closeMenu={() => this.setState({openUserMenu: false})} logOff={() => this.logOff()}/> : <Nav.Link href="/login">Login</Nav.Link>}
                            </Nav>
                        </Navbar.Collapse>
                </Navbar>
            </React.Fragment>
        );
    }
}

export default TopBar;