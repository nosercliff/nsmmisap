import {
  React,Component, Nav, Navbar, NavDropdown, NavDropdownMenu, DropdownSubmenu , AppConfiguration, axios
} 
from '../../noser-hris-component';
import '../../noser-hris.css';
import { Form, FormControl } from 'react-bootstrap';
class Banner extends Component {
  constructor(props) {
    super(props);
    this.state={
      userinfo:[],
      featuresLst:[]
    }
  }
componentDidMount(){
  this.setState({
    userinfo : JSON.parse(sessionStorage.getItem("userData")),/* 
    featuresLst : JSON.parse(sessionStorage.getItem("userAccess")) */
  })
  this.state.featuresLst = JSON.parse(sessionStorage.getItem("userAccess"))
  //console.log("this.state.featuresLst")
  //console.log(this.state.featuresLst)
}


  render() {
    return (
      <div>
        <Navbar expand="lg" fixed="top" >
          <Navbar.Brand href="/home">
            <div>
              <div style={{textAlign:'left',fontSize:'14px'}}>Noser</div>
              <div style={{textAlign:'left'}}>SAP Web Interface</div>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav >
              <Nav.Link href="/home">HOME</Nav.Link>

              <NavDropdown title="Inventory" id="basic-nav-dropdown" > 
                  <NavDropdown.Item href="/home">Sample Submenu</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Accounts Payable" id="basic-nav-dropdown" > 
                  <NavDropdown.Item href="/home">Sample Submenu</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Accounts Receivable" id="basic-nav-dropdown" > 
                  <NavDropdown.Item href="/home">Sample Submenu</NavDropdown.Item>
              </NavDropdown>

              {/*
              {
                this.state.featuresLst.map((menu) =>
                {
                  if(menu.isActive){
                    return (<NavDropdownMenu title={menu.name} id="basic-nav-dropdown">
                        {
                          menu.subModules.map((submenu) =>
                          {
                            if(submenu.isActive){
                              if(submenu.isParent=="1")
                              {
                                if(submenu.hasDivider=="1"){
                                  return (<div>
                                            <NavDropdown.Divider />
                                            <DropdownSubmenu title={submenu.name} id="basic-nav-dropdown" style={{marginLeft:'10px'}}>
                                            {
                                              submenu.items.map((item) =>
                                                {
                                                  if(item.isActive){
                                                    if(item.hasDivider=="1"){
                                                      return (<div>
                                                              <NavDropdown.Divider />
                                                              <NavDropdown.Item href={item.url}>{item.name}</NavDropdown.Item>
                                                            </div>)
                                                    }
                                                    else{
                                                      return <NavDropdown.Item href={item.url}>{item.name}</NavDropdown.Item>
                                                    }
                                                  }
                                                  else{
                                                    return <NavDropdown.Item></NavDropdown.Item>
                                                  }
                                                }
                                              )
                                            }
                                          </DropdownSubmenu>
                                          </div>)
                                }
                                else{
                                  return <DropdownSubmenu title={submenu.name} id="basic-nav-dropdown" style={{marginLeft:'10px'}}>
                                        {
                                          submenu.items.map((item) =>
                                            {
                                              if(item.isActive){
                                                if(item.hasDivider=="1"){
                                                  return (<div>
                                                          <NavDropdown.Divider />
                                                          <NavDropdown.Item href={item.url}>{item.name}</NavDropdown.Item>
                                                         </div>)
                                                }
                                                else{
                                                  return <NavDropdown.Item href={item.url}>{item.name}</NavDropdown.Item>
                                                }
                                              }
                                              else{
                                                return <NavDropdown.Item></NavDropdown.Item>
                                              }
                                            }
                                          )
                                        }
                                      </DropdownSubmenu>
                                }
                              }
                              else
                              {
                                if(submenu.hasDivider=="1"){
                                  return (<div>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href={submenu.url}>{submenu.name}</NavDropdown.Item>
                                   </div>)
                                }
                                else{
                                  return <NavDropdown.Item href={submenu.url}>{submenu.name}</NavDropdown.Item>
                                }
                              }
                            }
                            else{
                              return (<NavDropdown.Item></NavDropdown.Item>)
                            }
                            
                          }
                        )}
                    </NavDropdownMenu>)
                  }
                  else
                  {
                    return (<NavDropdown.Item></NavDropdown.Item>)
                  }
                })
              }
            */}
            </Nav>
            <Nav className="ml-auto">
              <Form>
              <Form.Group controlId="formHorizontalEmail">

              </Form.Group>
              </Form>
            </Nav>
            <Nav className="ml-auto">
              <Nav.Link href="/">Logout</Nav.Link>
              <Nav.Link href="/ChangePassword">Change Password</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div style={{height: "50px"}}></div>
      </div>
    );
  }
}

export default Banner;
