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
                        <Nav className="mr-auto" style={{marginLeft: '20%'}}>
                        <Navbar.Brand href="/">ThemePark</Navbar.Brand>
                        <Nav.Link href="/park-tickets" style={{paddingRight: 30, paddingLeft: 20}}>Buy Tickets</Nav.Link>
                        <Nav.Link href="/rides" style={{paddingRight: 30}}>Rides</Nav.Link>
                        <Nav.Link href="/dining">Dining</Nav.Link>
                        </Nav>
                        <Form inline style={{marginRight: '20%'}}>
                        <Button variant="outline-success" size="sm" >Login</Button>
                        </Form>
                </Navbar>
            </React.Fragment>
        );
    }
}

export default TopBar;