import React, {Component} from 'react';
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Button, ButtonToolbar, Card, Form, Col, Row,Container, Tabs, Tab, Modal, Dropdown, DropdownButton } from "react-bootstrap";
class Banner extends Component {
    constructor(props) {
      super(props);

    }
    render() {
        return (
            <div>
                <Navbar expand="lg" fixed="top" >
                    <Navbar.Brand href="/home">
                        <div>
                        <div style={{textAlign:'left',fontSize:'14px'}}>Noser</div>
                        <div  style={{textAlign:'left'}}>Human Resource Information System</div>
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav >
                        <Nav.Link href="/home">Home</Nav.Link>
                            <NavDropdown title="Timekeeping" id="basic-nav-dropdown" >
                                <NavDropdown.Item href="/workschedule">Work Schedule</NavDropdown.Item>
                                <NavDropdown.Item href="/breaktime">Breaktime</NavDropdown.Item>
                                {/* <NavDropdown.Item href="/dailytimerecord">DTR</NavDropdown.Item>  */}
                                <NavDropdown.Item href="/clientconfig">Client Configuration</NavDropdown.Item>
                                <NavDropdown.Item href="/employeeconfig">Employee Configuration</NavDropdown.Item>
                                <NavDropdown.Item href="/changeworksched">Change Work Schedule</NavDropdown.Item>
                                <NavDropdown.Item href="/ratecard">Rate Card Element</NavDropdown.Item>
                                <NavDropdown.Item href="/GenerateWorkSchedule">Generate Schedule-Manual</NavDropdown.Item>
                                
                               {/*  <NavDropdown.Item href="/ratecardconfig">Rate Card Configuration</NavDropdown.Item> */}
                                <NavDropdown.Divider />
                                 {/* <NavDropdown.Item href="/billablehours">Billable Hours</NavDropdown.Item> */}

                               <NavDropdown.Item href="/GenerateDTR">Process DTR</NavDropdown.Item>
                                 <NavDropdown.Item href="/ComputedDTR">Finalized DTR</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Payroll" id="basic-nav-dropdown" >
                                <NavDropdown.Item href="/PayrollConfiguration">Payroll Transaction</NavDropdown.Item>
                                <NavDropdown.Divider />

                                <NavDropdown.Item href="/PayrollDeductions">Deductions / Employee Charges</NavDropdown.Item>
                                <NavDropdown.Item href="/PayrollInclusions">Inclusions</NavDropdown.Item>
                                <NavDropdown.Item href="/PayrollLoans">Loans</NavDropdown.Item>
                                <NavDropdown.Divider />
                                
                                <NavDropdown.Item href="/PayrollLoanAdjustments">Adjustments</NavDropdown.Item>
                                {/* <NavDropdown.Item href="/PayrollDeductionAdjustments">Deduction Adjustments</NavDropdown.Item>
                                <NavDropdown.Item href="/PayrollContributionAdjustments">Employee Contribution Adjustments</NavDropdown.Item> */}
                                <NavDropdown.Divider />

                                {/* <NavDropdown.Item href="/PayrollSSSLoanDeduction">SSS Loans Deduction</NavDropdown.Item> */}
                                {/* <NavDropdown.Item href="/DeductionLedger">Ledger</NavDropdown.Item> */}
                                <NavDropdown.Item href="/InclusionLedger">Ledger</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/GeneratePayroll">Generate Payroll Cut-Off</NavDropdown.Item>
                                {/* <NavDropdown.Item href="/PayrollInclusion">Payroll Inclusion</NavDropdown.Item> */}
                                {/* <NavDropdown.Item href="/PayrollInclusionMenu">Payroll Inclusion Menu</NavDropdown.Item> */}
                            </NavDropdown>

                            <NavDropdown title="Maintenance" id="basic-nav-dropdown" >
                                <NavDropdown.Item href="/location">Location</NavDropdown.Item>
                                <NavDropdown.Item href="/city">City</NavDropdown.Item>
                                <NavDropdown.Item href="/province">Province</NavDropdown.Item>
                                <NavDropdown.Item href="/region">Region</NavDropdown.Item>
                                <NavDropdown.Item href="/holiday">Holiday</NavDropdown.Item>

                                <NavDropdown.Divider />
                                 <NavDropdown.Item href="/Deduction">Deduction</NavDropdown.Item>
                                 <NavDropdown.Item href="/DeductionType">Deduction Type</NavDropdown.Item>
                                 <NavDropdown.Item href="/Inclusion">Inclusion</NavDropdown.Item>
                                 <NavDropdown.Item href="/InclusionType">Inclusion Type</NavDropdown.Item>
                                 <NavDropdown.Item href="/LoanType">Loan Type</NavDropdown.Item>
                                 <NavDropdown.Item href="/SSSTable">SSS Table</NavDropdown.Item>
                                 <NavDropdown.Item href="/PhilHealthTable">PhilHealth Table</NavDropdown.Item>
                                 <NavDropdown.Item href="/PagibigTable">Pagibig Table</NavDropdown.Item>
                                {/*  <NavDropdown.Item href="/PayrollGenerate">Test</NavDropdown.Item>  */}
                                 {/* <NavDropdown.Item href="/PayrollLoanTypes">Loan Type</NavDropdown.Item> */}



                            </NavDropdown>
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
        )}
}
export default Banner;