import React, { Component } from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';

class TopBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    render() {
        return (
            <React.Fragment>
                <Navbar variant="dark" expand="lg" style={{backgroundColor: "#2A2A31"}}>
                        <Navbar.Brand href="/">ThemePark</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/park-tickets">Buy Tickets</Nav.Link>
                            <Nav.Link href="/rides" >Rides</Nav.Link>
                            <Nav.Link href="/dining">Dining</Nav.Link>
                        </Nav>
                        <Form inline style={{marginRight: '20%'}}>
                        <Button variant="outline-success" size="sm" >Login</Button>
                        </Form>
                        </Navbar.Collapse>
                </Navbar>
            </React.Fragment>
        );
    }
}

export default TopBar;