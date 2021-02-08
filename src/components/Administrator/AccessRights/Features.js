import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker
} 
from '../../../noser-hris-component';

import CreateFeature from './CreateFeature'
class Features extends Component {
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
            moduleList      :   [],
            submoduleList   :   [],
            submoduleFltrLst:   [],
            featuresLst     :   [],
            selectedFeatures:   [],
            selectedSubMenus:   [],
            selectedItems   :   [],
            nonExpandableSubMenu:[],
            expanded        :   [],
            YesNoList       :   [{value:'0',label:'NO'},{value:'1',label:'YES'}],
            openModal       :   false
        }
    } 
    componentDidMount(){
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetFeatures()
        
    }
    handleModalShow = (e) =>{
        this.setState({openModal:true})
        let obj = {}
        this.child.initialize(obj)
    }
    handleModalClose = (e) =>{
        this.setState({openModal:false})
        this.GetFeatures()
    }
    GetFeatures = () =>{
        this.setState({isloading:true,isDisable:true})
        const params = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        }
        
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Administrator/GetFeatures", params)
        .then(res => {
            const data = res.data
            console.log(data)
            let _selectedFeatures = []//this.state.selectedFeatures
            let _selectedSubMenus =[] //this.state.selectedSubMenus
            let _selectedItems = []//this.state.selectedItems
            let _nonExpandableSubMenu = []//this.state.nonExpandableSubMenu
            let _expanded = []

            let _modules = []
            let _submodules = []
            data.features.map(function(menu,a){
                //_expanded.push(menu.id)
                _modules.push({
                    value : menu.id,
                    label : menu.name
                })
                // if(menu.isActive)
                //     _selectedFeatures.push(menu.id)
                menu.subModules.map(function(submenu,b){
                    // if(submenu.isActive)
                    //     _selectedSubMenus.push(submenu.id)
                    if(submenu.isParent=="0")
                        _nonExpandableSubMenu.push(submenu.id)
                    else
                    {
                        _submodules.push({
                            moduleId : submenu.moduleId,
                            value : submenu.id,
                            label : submenu.name
                        })
                    }
                    submenu.items.map(function(item,c){
                        // if(item.isActive)
                        // _selectedItems.push(item.id)
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
                moduleList:_modules,
                submoduleList:_submodules
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
        this.state.featuresLst.map(function(menu,a){
            if(menu.isModified=="1")
            {
                featureAccesses.push({
                    "Id":menu.id,
                    "FeatureName":menu.name,
                    "Url": "",
                    "ParentId":"0",
                    "IsParent":"1",
                    "HasDivider":"0",
                    "OrderId":menu.orderId,
                    "IsActive" : menu.isActive ? "1" : "0",
                    "IsDeleted" : menu.isDeleted,
                })
            }
            menu.subModules.map(function(submenu,b){
                if(submenu.isModified=="1"){
                    featureAccesses.push({
                        "Id":submenu.id,
                        "FeatureName":submenu.name,
                        "Url": submenu.url,
                        "ParentId": submenu.moduleId,
                        "IsParent": submenu.isParent,
                        "HasDivider": submenu.hasDivider,
                        "OrderId": submenu.orderId,
                        "IsActive" : submenu.isActive ? "1" : "0",
                        "IsDeleted" : submenu.isDeleted,
                    })
                }
                
                submenu.items.map(function(item,c){
                    if(item.isModified=="1"){
                        featureAccesses.push({
                            "Id": item.id,
                            "FeatureName": item.name,
                            "Url": item.url,
                            "ParentId": item.subModuleId,
                            "IsParent": "0",
                            "HasDivider": item.hasDivider,
                            "OrderId": item.orderId,
                            "IsActive" : submenu.isActive ? "1" : "0",
                            "IsDeleted" : submenu.isDeleted,
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
            "features":featureAccesses,
        }
        
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Administrator/EditFeature", params)
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
    
    GridDataModified(oldValue, newValue, id, column) {
        this.state.featuresLst.map(function(menu,i){
            if(id==menu.id)
                menu.isModified="1"
        })
    }
    SubGridDataModified(oldValue, newValue, id, column) {
        this.state.featuresLst.map(function(menu,i){
            menu.subModules.map(function(submenu,j){
                if(submenu.id==id)
                    submenu.isModified="1"
            })
        })
    }
    ItemGridDataModified(oldValue, newValue, id, column) {
        this.state.featuresLst.map(function(menu,i){
            menu.subModules.map(function(submenu,j){
                submenu.items.map(function(itm,k){
                    if(itm.id==id)
                        itm.isModified="1"
                })
            })
        })
    }
    render(){
        const featuresCol = [
            {
                dataField: 'name',
                text: 'MODULE',
                editable: true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left',width:'20%' }},
                style:{textAlign:'left',width:'20%'},
            },
            {
                dataField: 'isActive',
                text: 'IS ACTIVE',
                editable: true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'10%' }},
                style:{textAlign:'center',width:'10%'},
                editor: {
                    type: Type.SELECT,
                    options: this.state.YesNoList
                  },
                  formatter: (cell, row) => {
                      if(row.isActive!='' && row.isActive!=null){
                          return this.state.YesNoList.find(x => x.value == cell).label;
                      }
                  }
            }
            ,
            {
                dataField: 'orderId',
                text: 'ORDER',
                editable: true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left',width:'70%' }},
                style:{textAlign:'left',width:'70%'},
            }
        ]
        const submodulesCol = [
            {
                dataField: 'moduleId',
                text: 'MODULE',
                editable: true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left',width:'10%'}},
                style:{textAlign:'left',width:'10%'},
                editor: {
                    type: Type.SELECT,
                    options: this.state.moduleList
                  },
                formatter: (cell, row) => {
                    if(row.moduleId!='' && row.moduleId!=null){
                        
                        return this.state.moduleList.find(x => x.value == cell).label;
                    }
                }
            },
            {
                dataField: 'name',
                text: 'SUB-MODULE',
                editable: true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left',width:'30%' }},
                style:{textAlign:'left',width:'30%'},
            },
            {
                dataField: 'url',
                text: 'URL',
                editable: true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left',width:'20%' }},
                style:{textAlign:'left',width:'20%'},
            },
            {
                dataField: 'isActive',
                text: 'IS ACTIVE',
                editable: true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'10%' }},
                style:{textAlign:'center',width:'10%'},
                editor: {
                    type: Type.SELECT,
                    options: this.state.YesNoList
                  },
                  formatter: (cell, row) => {
                      if(row.isActive!='' && row.isActive!=null){
                          return this.state.YesNoList.find(x => x.value == cell).label;
                      }
                  }
            },
            {
                dataField: 'isParent',
                text: 'PARENT',
                editable: true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'10%' }},
                style:{textAlign:'center',width:'10%'},
                editor: {
                  type: Type.SELECT,
                  options: this.state.YesNoList
                },
                formatter: (cell, row) => {
                    if(row.isParent!='' && row.isParent!=null){
                        return this.state.YesNoList.find(x => x.value == cell).label;
                    }
                }
            },
            {
                dataField: 'hasDivider',
                text: 'HAS DIVIDER',
                editable: true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'10%' }},
                style:{textAlign:'center',width:'10%'},
                editor: {
                    type: Type.SELECT,
                    options: this.state.YesNoList
                  },
                formatter: (cell, row) => {
                    if(row.hasDivider!='' && row.hasDivider!=null){
                        return this.state.YesNoList.find(x => x.value == cell).label;
                    }
                }
            },
            {
                dataField: 'orderId',
                text: 'ORDER',
                editable: true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'10%' }},
                style:{textAlign:'center',width:'10%'},
            }
        ]
        const itemsCol = [
            {
                dataField: 'moduleId',
                text: 'MODULE',
                editable: true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left',width:'10%'}},
                style:{textAlign:'left',width:'10%'},
                editor: {
                    type: Type.SELECT,
                    options: this.state.moduleList
                  },
                formatter: (cell, row) => {
                    if(row.moduleId!='' && row.moduleId!=null){
                        return this.state.moduleList.find(x => x.value == cell).label;
                    }
                }
            },
            {
                dataField: 'subModuleId',
                text: 'SUB MODULE',
                editable: true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left',width:'10%'}},
                style:{textAlign:'left',width:'10%'},
                editor: {
                    type: Type.SELECT,
                    options: this.state.submoduleList
                  },
                formatter: (cell, row) => {
                    if(row.subModuleId!='' && row.subModuleId!=null){
                        return this.state.submoduleList.find(x => x.value == cell).label;
                    }
                }
            },
            {
                dataField: 'name',
                text: 'FEATURE',
                editable: true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left',width:'30%' }},
                style:{textAlign:'left',width:'30%'}
            },
            {
                dataField: 'url',
                text: 'URL',
                editable: true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left',width:'20%' }},
                style:{textAlign:'left',width:'20%'},
            },
            {
                dataField: 'isActive',
                text: 'IS ACTIVE',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'10%' }},
                style:{textAlign:'center',width:'10%'},
                editor: {
                    type: Type.SELECT,
                    options: this.state.YesNoList
                  },
                  editable:true,
                  formatter: (cell, row) => {
                      if(row.isActive!='' && row.isActive!=null){
                          return this.state.YesNoList.find(x => x.value == cell).label;
                      }
                  }
            },
            {
                dataField: 'hasDivider',
                text: 'HAS DIVIDER',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'10%' }},
                style:{textAlign:'center',width:'10%'},
                editor: {
                    type: Type.SELECT,
                    options: this.state.YesNoList
                  },
                editable:true,
                formatter: (cell, row) => {
                    if(row.hasDivider!='' && row.hasDivider!=null){
                        
                        return this.state.YesNoList.find(x => x.value == cell).label;
                    }
                }
            },
            {
                dataField: 'orderId',
                text: 'ORDER',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'10%' }},
                style:{textAlign:'center',width:'10%'},
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
                        menu.isModified= isSelect ? "1" : "0"
                        menu.isDeleted = isSelect ? "1" : "0"
                        if(isSelect)
                        {
                            _selectedFeatures.push(menu.id)
                            //menu.isActive = true
                            menu.subModules.map(function(smenu,j){
                                _selectedSubMenus.push(smenu.id)
                                //smenu.isActive = true
                                smenu.isModified= isSelect ? "1" : "0"
                                smenu.isDeleted = isSelect ? "1" : "0"
                                smenu.items.map(function(item,k){
                                    _selectedItems.push(item.id)
                                    //item.isActive = true
                                    item.isModified= isSelect ? "1" : "0"
                                    item.isDeleted = isSelect ? "1" : "0"
                                })
                            })
                        }
                        else
                        {
                            
                            let menu_idx = _selectedFeatures.indexOf(menu.id)
                            if (menu_idx !== -1)
                                _selectedFeatures.splice(menu_idx, 1)
                            //menu.isActive = false
                            menu.subModules.map(function(smenu,j){
                                let smenu_idx = _selectedSubMenus.indexOf(smenu.id)
                                if (smenu_idx !== -1)
                                    _selectedSubMenus.splice(smenu_idx, 1)
                                //smenu.isActive = false
                                smenu.isModified= isSelect ? "1" : "0"
                                smenu.isDeleted = isSelect ? "1" : "0"
                                smenu.items.map(function(item,k){
                                    let item_idx = _selectedItems.indexOf(item.id)
                                    if (item_idx !== -1)
                                        _selectedItems.splice(item_idx, 1)
                                    //item.isActive = false
                                    item.isModified= isSelect ? "1" : "0"
                                    item.isDeleted = isSelect ? "1" : "0"
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
                                //smenu.isActive = true
                                smenu.isModified= isSelect ? "1" : "0"
                                smenu.isDeleted = isSelect ? "1" : "0"
                                if(smenu.isParent=="1")
                                {
                                    smenu.items.map(function(item,k){
                                        _selectedItems.push(item.id)
                                        //item.isActive = true
                                        item.isModified= isSelect ? "1" : "0"
                                        item.isDeleted = isSelect ? "1" : "0"
                                    })
                                }
                            }
                            else
                            {
                                //smenu.isActive = false
                                var smenuidx = _selectedSubMenus.indexOf(smenu.id)
                                if (smenuidx !== -1)
                                    _selectedSubMenus.splice(smenuidx, 1)
                                smenu.isModified= isSelect ? "1" : "0"
                                smenu.isDeleted = isSelect ? "1" : "0"
                                if(smenu.isParent=="1")
                                {
                                    smenu.items.map(function(item,k){
                                        var item_idx = _selectedItems.indexOf(item.id)
                                        if (item_idx !== -1)
                                            _selectedItems.splice(item_idx, 100)
                                        //item.isActive = false
                                        item.isModified= isSelect ? "1" : "0"
                                        item.isDeleted = isSelect ? "1" : "0"
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
                                item.isModified= isSelect ? "1" : "0"
                                item.isDeleted = isSelect ? "1" : "0"
                                if(isSelect)
                                {
                                    _selectedItems.push(item.id)
                                    //item.isActive = true
                                }
                                else
                                {
                                    var item_idx = _selectedItems.indexOf(item.id)
                                    if (item_idx !== -1)
                                        _selectedItems.splice(item_idx, 100)
                                    //item.isActive = false
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
                            cellEdit = { cellEditFactory({ 
                                mode: 'dbclick', 
                                blurToSave: true,
                            afterSaveCell: (oldValue, newValue, row, column) => { 
                            this.SubGridDataModified(oldValue, newValue, row.id, column)
                                    }
                                })
                            }
                            expandRow={ expandItems }
                            wrapperClasses="table-responsive"
                            //headerClasses="role-access-header-class"
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
                            cellEdit = { cellEditFactory({ 
                                mode: 'dbclick', 
                                blurToSave: true,
                            afterSaveCell: (oldValue, newValue, row, column) => { 
                            this.ItemGridDataModified(oldValue, newValue, row.id, column)
                                    }
                                })
                            }
                            wrapperClasses="table-responsive"
                            rowClasses="noser-table-row-class"
                            //headerClasses="role-access-header-class"
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
                        <Card.Header> ADMINISTRATOR >> FEATURES</Card.Header>
                        <Card.Body>
                            <Form >
                                <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                    <div className={this.state.color}></div> 
                                    {this.state.message}
                                </Alert>
                                {/* <Form.Row>
                                    <Form.Group as={Col} sm={12} controlId="formHorizontalEmail">
                                        <Typeahead
                                                labelKey='label'
                                                id="basic-example"
                                                //onChange={this.handleChangeRole}
                                                options={this.state.moduleList}
                                                placeholder="Select Module"
                                            />
                                    </Form.Group>
                                </Form.Row> */}
                                <Form.Row>
                                    <Form.Group as={Col} sm={12} controlId="formGridEmail">
                                        {/* <Card.Header>FEATURES</Card.Header> */}
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
                                                //headerClasses="role-access-header-class"
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
                                        <Button style={{minWidth:'60px',marginRight:'1pt'}} className="ml-auto" variant="success" variant="success" onClick={this.handleSubmit}>Save</Button>
                                        <Button style={{minWidth:'60px'}} variant="primary" variant="primary" onClick={this.handleModalShow} >Create</Button>
                                    </ButtonToolbar>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
                <NoserLoading show={this.state.isloading} />
                <CreateFeature 
                    show={this.state.openModal}
                    onHide={this.handleModalClose}
                    onRefInclusionModal={ref => (this.child = ref)}
                />
            </div>
        )
    }
}

export default Features;