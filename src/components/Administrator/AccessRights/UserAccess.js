import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker
} 
from '../../../noser-hris-component';

class UserAccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userinfo        :   [],
            isloading       :   false,
            isshow          :   false,
            alerttype       :   "",
            message         :   "",
            color           :   "",
            fade            :   true,
            clientId        :   '',
            clientName      :   '',
            employeeId      :   '',
            clientList      :   [],
            employeeList    :   [],
            featuresLst     :   [],
            selectedFeatures:   [],
            selectedSubMenus:   [],
            selectedItems   :   [],
            nonExpandableSubMenu:[],
            expanded        :   []
        }
    } 
    componentDidMount(){
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetEmployees()
    }
    GetClients = () =>{
        this.setState({isloading:true,isDisable:true})
        const params = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        }
        
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", params)
        .then(res => {
            const data = res.data
            this.setState({
                isloading   :   false,
                alerttype   :   data.status=="1" ? "Success!" : "Error!",
                isshow      :   data.status=="1" ? false : true,
                color       :   data.status=="1" ? "success" : "danger",
                message     :   data.message,
                fade        :   true,
                clientList :   data.clients,
            });

        })
        .catch(error=>{
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade        :   true,
            })
        })
    }
    GetEmployees = () =>{
        this.setState({isloading:true,isDisable:true})
        const params = {
            "IpAddress":"0.0.0.0",
            "ClientId":"111",
            "UserId":this.state.userinfo.userId,
            "ClientName":""
        }
        
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Employee/GetEmployees", params)
        .then(res => {
            const data = res.data
            console.log(data)
            this.setState({
                isloading   :   false,
                alerttype   :   data.status=="1" ? "Success!" : "Error!",
                isshow      :   data.status=="1" ? false : true,
                color       :   data.status=="1" ? "success" : "danger",
                message     :   data.message,
                fade        :   true,
                employeeList :   data.employees,
            });

        })
        .catch(error=>{
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade        :   true,
            })
        })
    }
    GetUserAccesss = () =>{
        this.setState({isloading:true,isDisable:true})
        const params = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeId":this.state.employeeId,
        }
        
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Administrator/GetUserAccess", params)
        .then(res => {
            const data = res.data
            console.log(data)
            let _selectedFeatures = []//this.state.selectedFeatures
            let _selectedSubMenus =[] //this.state.selectedSubMenus
            let _selectedItems = []//this.state.selectedItems
            let _nonExpandableSubMenu = []//this.state.nonExpandableSubMenu
            let _expanded = []
            data.features.map(function(menu,a){
                //_expanded.push(menu.id)
                if(menu.isActive)
                    _selectedFeatures.push(menu.id)
                menu.subModules.map(function(submenu,b){
                    if(submenu.isActive)
                        _selectedSubMenus.push(submenu.id)
                    if(submenu.isParent=="0")
                        _nonExpandableSubMenu.push(submenu.id)
                    submenu.items.map(function(item,c){
                        if(item.isActive)
                        _selectedItems.push(item.id)
                    })
                })
            })

            this.setState({
                isloading   :   false,
                alerttype   :   data.status=="1" ? "Success!" : "Error!",
                isshow      :   data.status=="1" ? false : true,
                color       :   data.status=="1" ? "success" : "danger",
                message     :   data.message,
                fade        :   true,
                featuresLst :   data.features,
                nonExpandableSubMenu:_nonExpandableSubMenu,
                selectedFeatures: _selectedFeatures,
                selectedSubMenus: _selectedSubMenus,
                selectedItems:_selectedItems,
                //expanded:{["1"]:true}
            });
            console.log(_selectedFeatures)
        })
        .catch(error=>{
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade        :   true,
            })
        })
    }
    handleSubmit = (e) => {
        this.setState({isloading:true,isDisable:true})

        let featureAccesses = []
        let employeeId = this.state.employeeId
        this.state.featuresLst.map(function(menu,a){
            menu.subModules.map(function(submenu,b){
                if(submenu.isParent=="0" && submenu.isModified=="1")
                {
                    featureAccesses.push({
                        "EmployeeId":employeeId,
                        "FeatureId":submenu.id,
                        "IsDeleted":submenu.isActive ? "0" : "1"
                    })
                }
                submenu.items.map(function(item,c){
                    if(item.isModified=="1")
                    {
                        featureAccesses.push({
                            "EmployeeId":employeeId,
                            "FeatureId":item.id,
                            "IsDeleted":item.isActive ? "0" : "1"
                        })
                    }
                })
            })
        })
        console.log(featureAccesses)
        //return 
        const params = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "featureAccesses":featureAccesses,
        }
        
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Administrator/SaveUserAccess", params)
        .then(res => {
            const data = res.data
            this.setState({
                isloading   :   false,
                alerttype   :   data.status=="1" ? "Success!" : "Error!",
                isshow      :   true,
                color       :   data.status=="1" ? "success" : "danger",
                message     :   data.message,
                fade        :   true
            });

        })
        .catch(error=>{
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade        :   true,
            })
        })
    }
    handleChangeClient = (e) =>{
        this.setState({
            alerttype   :   "",
            isshow      :   false,
            color       :   "",
            message     :   "",
            fade        :   false
        });
        if(e.length==0)
        {
            this.state.clientId=''
            this.state.clientName=''
            return
        }
        this.state.clientId= e[0].id
        this.state.clientName=e[0].name
        this.GetEmployees()
    }
    handleChangeEmployee = (e) =>{
        this.setState({
            alerttype   :   "",
            isshow      :   false,
            color       :   "",
            message     :   "",
            fade        :   false
        });
        if(e.length==0)
        {
            this.state.employeeId= ''
            return
        }
        this.state.employeeId= e[0].id
        this.GetUserAccesss()
    }
    render(){
        const featuresCol = [
            {
                dataField: 'name',
                text: 'MODULES',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left',width:'100%' }},
                style:{textAlign:'left',width:'100%'}
            }
        ]
        const submodulesCol = [
            {
                dataField: 'name',
                text: 'SUB-MODULES',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left',width:'100%',hidden:true }},
                style:{textAlign:'left',width:'100%'},
            }
        ]
        const itemsCol = [
            {
                dataField: 'name',
                text: 'FEATURES',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left',width:'100%' }},
                style:{textAlign:'left',width:'99%'}
            }
        ]
        const selectRow = {
            mode: 'checkbox',
            hideSelectAll: true,
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                let _selectedFeatures = this.state.selectedFeatures
                let _selectedSubMenus = this.state.selectedSubMenus
                let _selectedItems = this.state.selectedItems
                this.state.featuresLst.map(function(menu,i){
                    
                    if(menu.id===row.id)
                    {
                        if(isSelect)
                        {
                            _selectedFeatures.push(menu.id)
                            menu.isActive = true
                            menu.subModules.map(function(smenu,j){
                                _selectedSubMenus.push(smenu.id)
                                smenu.isActive = true
                                smenu.isModified="1"
                                //smenu.isDeleted = !isSelect ? "1" : "0"
                                smenu.items.map(function(item,k){
                                    _selectedItems.push(item.id)
                                    item.isActive = true
                                    item.isModified="1"
                                    //item.isDeleted = !isSelect ? "1" : "0"
                                })
                            })
                        }
                        else
                        {
                            
                            let menu_idx = _selectedFeatures.indexOf(menu.id)
                            if (menu_idx !== -1)
                                _selectedFeatures.splice(menu_idx, 1)
                            menu.isActive = false
                            menu.subModules.map(function(smenu,j){
                                let smenu_idx = _selectedSubMenus.indexOf(smenu.id)
                                if (smenu_idx !== -1)
                                    _selectedSubMenus.splice(smenu_idx, 1)
                                smenu.isActive = false
                                smenu.isModified="1"
                                //smenu.isDeleted = !isSelect ? "1" : "0"
                                smenu.items.map(function(item,k){
                                    let item_idx = _selectedItems.indexOf(item.id)
                                    if (item_idx !== -1)
                                        _selectedItems.splice(item_idx, 1)
                                    item.isActive = false
                                    item.isModified="1"
                                    //item.isDeleted = !isSelect ? "1" : "0"
                                })
                            })  
                        }
                    }
                })
                this.setState({
                                selectedFeatures: _selectedFeatures,
                                selectedSubMenus: _selectedSubMenus,
                                selectedItems:_selectedItems
                             })
                             //console.log(this.state.featuresLst)
            },
            selected: this.state.selectedFeatures,
            
        };
        const selectSubRow = {
            mode: 'checkbox',
            hideSelectAll: true,
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                let _selectedFeatures = this.state.selectedFeatures
                let _selectedSubMenus = this.state.selectedSubMenus
                let _selectedItems = this.state.selectedItems
                this.state.featuresLst.map(function(menu,i){
                    menu.subModules.map(function(smenu,j){
                        if(smenu.id===row.id)
                        {
                            if(isSelect)
                            {
                                _selectedSubMenus.push(smenu.id)
                                smenu.isActive = true
                                smenu.isModified="1"
                                //smenu.isDeleted = !isSelect ? "1" : "0"
                                if(smenu.isParent=="1")
                                {
                                    smenu.items.map(function(item,k){
                                        _selectedItems.push(item.id)
                                        item.isActive = true
                                        item.isModified="1"
                                        //item.isDeleted = !isSelect ? "1" : "0"
                                    })
                                }
                            }
                            else
                            {
                                smenu.isActive = false
                                var smenuidx = _selectedSubMenus.indexOf(smenu.id)
                                if (smenuidx !== -1)
                                    _selectedSubMenus.splice(smenuidx, 1)
                                smenu.isModified="1"
                                //smenu.isDeleted = !isSelect ? "1" : "0"
                                if(smenu.isParent=="1")
                                {
                                    smenu.items.map(function(item,k){
                                        var item_idx = _selectedItems.indexOf(item.id)
                                        if (item_idx !== -1)
                                            _selectedItems.splice(item_idx, 100)
                                        item.isActive = false
                                        item.isModified="1"
                                        //item.isDeleted = !isSelect ? "1" : "0"
                                    })
                                }
                            }
                        }
                    })
                })
                this.setState({
                    selectedFeatures: _selectedFeatures,
                    selectedSubMenus: _selectedSubMenus,
                    selectedItems: _selectedItems
                 })
                 //console.log(this.state.featuresLst)
            },
            selected: this.state.selectedSubMenus,
        };

        const selectRowItems = {
            mode: 'checkbox',
            hideSelectAll: true,
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                let _selectedFeatures = this.state.selectedFeatures
                let _selectedSubMenus = this.state.selectedSubMenus
                let _selectedItems = this.state.selectedItems
                this.state.featuresLst.map(function(menu,i){
                    menu.subModules.map(function(smenu,j){
                        smenu.items.map(function(item,k){
                            if(item.id===row.id)
                            {
                                item.isModified="1"
                                //item.isDeleted = !isSelect ? "1" : "0"
                                if(isSelect)
                                {
                                    _selectedItems.push(item.id)
                                    item.isActive = true
                                }
                                else
                                {
                                    var item_idx = _selectedItems.indexOf(item.id)
                                    if (item_idx !== -1)
                                        _selectedItems.splice(item_idx, 100)
                                    item.isActive = false
                                }
                            }
                        })
                    })
                })
            },
            selected: this.state.selectedItems,
            
        };

        const expandSubModules = {
            //onlyOneExpanding: true,
            renderer: row => 
            (
                <div className="expandable-table" style={{marginLeft:'50px !important'}}>
                    <BootstrapTable
                            keyField = "id"
                            data = { row.subModules }
                            columns = { submodulesCol }
                            selectRow = { selectSubRow }
                            rowClasses="noser-table-row-class"
                            striped
                            //hover
                            //condensed
                            //expanded={this.state.expanded}
                            expandRow={ expandItems }
                            wrapperClasses="table-responsive"
                            headerClasses="role-access-header-class"
                            className="expandable-table-sub"
                        /> 
                </div>
            ),
            showExpandColumn: true,
          };
          const expandItems = {
            onlyOneExpanding: true,
            renderer: row => 
            (
                <BootstrapTable
                            keyField = "id"
                            data = { row.items }
                            columns = { itemsCol }
                            selectRow = { selectRowItems }
                            rowClasses="noser-table-row-class"
                            striped
                            //hover
                            //condensed
                            //expandRow
                            wrapperClasses="table-responsive"
                            rowClasses="noser-table-row-class"
                            headerClasses="role-access-header-class"
                        /> 
            ),
            nonExpandable: this.state.nonExpandableSubMenu,
            showExpandColumn: true
          };
        return(
            <div>
                <Banner />
                <Container className="themed-container" fluid={true}>
                    <Card className="mt-5">
                        <Card.Header> ADMINISTRATOR >> USER ACCESS</Card.Header>
                        <Card.Body>
                            <Form >
                                <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                    <div className={this.state.color}></div> 
                                    {this.state.message}
                                </Alert>
                                <Form.Row>
                                    {/* <Form.Group as={Col} sm={6} controlId="formHorizontalEmail">
                                        <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleChangeClient}
                                                options={this.state.clientList}
                                                placeholder="Select Client"
                                            />
                                    </Form.Group> */}
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} sm={6} controlId="formHorizontalEmail">
                                        <Typeahead
                                                labelKey='employeeName'
                                                id="basic-example"
                                                onChange={this.handleChangeEmployee}
                                                options={this.state.employeeList}
                                                placeholder="Select Employee"
                                            />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                        <Card.Header>ASSIGNED FEATURES</Card.Header>
                                        <div className="mt-1">
                                            <BootstrapTable
                                                keyField = "id"
                                                data = { this.state.featuresLst }
                                                columns = { featuresCol }
                                                selectRow = { selectRow }
                                                cellEdit = { cellEditFactory({ 
                                                        mode: 'dbclick', 
                                                        blurToSave: true,
                                                        afterSaveCell: (oldValue, newValue, row, column) => { 
                                                            //this.GridDataModified(oldValue, newValue, row.rowIndex, column.dataField)
                                                        }
                                                    })
                                                }
                                                //rowEvents={ rowEvents }
                                                rowClasses="noser-table-row-class"
                                                headerClasses="role-access-header-class"
                                                striped
                                                //hover
                                                //condensed
                                                loading={true}
                                                //expanded={this.state.expanded}
                                                expandRow={ expandSubModules }
                                                wrapperClasses="table-responsive"
                                                rowClasses="noser-table-row-class"
                                                //pagination={ paginationFactory({sizePerPageRenderer})}
                                                //noDataIndication={ () => <div style={{width:'100%'}}>No record found.</div> }
                                            />
                                        </div>
                                        
                                    </Form.Group>
                                    {/* <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                        <Card.Header>Features Assigned</Card.Header>
                                        
                                    </Form.Group> */}
                                </Form.Row>
                                <div className="mt-1">
                                    <ButtonToolbar>
                                        <Button variant="primary" variant="success" onClick={this.handleSubmit}>
                                            Submit
                                        </Button>
                                    </ButtonToolbar>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
                <NoserLoading show={this.state.isloading} />
            </div>
        )
    }
}

export default UserAccess;