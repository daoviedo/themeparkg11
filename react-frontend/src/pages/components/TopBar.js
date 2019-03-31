import React, { Component } from 'react';
import { Navbar, Nav, Form, Button, Container, Row} from 'react-bootstrap';
import '../css/TopBar.css';

class TopBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    render() {
        return (
            <React.Fragment>
                <Navbar id="navHelper" variant="dark" expand="lg" style={{backgroundColor: "#2A2A31"}}>
                        <Navbar.Brand id="brandDisappear" style={{textAlign: "center"}} href="/">ThemePark</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto" style={{margin: "0 auto", paddingTop: "0.3125rem"}}>
                                <Nav.Link className="brandStyle" href="/park-tickets">Theme Park</Nav.Link>
                                <Nav.Link href="/park-tickets">Buy Tickets</Nav.Link>
                                <Nav.Link href="/rides" >Rides</Nav.Link>
                                <Nav.Link href="/dining">Dining</Nav.Link>
                            </Nav>
                            <Form>
                                <Button variant="outline-success" size="sm" >Login</Button>
                            </Form>
                        </Navbar.Collapse>
                </Navbar>
            </React.Fragment>
        );
    }
}

export default TopBar;