/*!

=========================================================
* Argon Design System React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Container,
  Button,
  Card,
  CardBody,
  CardTitle,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Row,
  Col
} from "reactstrap";

import classnames from "classnames";
import "../assets/css/index.css";

// core components
// import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
// import CardsFooter from "components/Footers/CardsFooter.jsx";
import { NameList } from "components/NameList.jsx";

import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

// index page sections
// import Hero from "./IndexSections/Hero.jsx";
// import Buttons from "./IndexSections/Buttons.jsx";
// import Inputs from "./IndexSections/Inputs.jsx";
// import CustomControls from "./IndexSections/CustomControls.jsx";
// import Menus from "./IndexSections/Menus.jsx";
// import Navbars from "./IndexSections/Navbars.jsx";
// import Tabs from "./IndexSections/Tabs.jsx";
// import Progress from "./IndexSections/Progress.jsx";
// import Pagination from "./IndexSections/Pagination.jsx";
// import Pills from "./IndexSections/Pills.jsx";
// import Labels from "./IndexSections/Labels.jsx";
// import Alerts from "./IndexSections/Alerts.jsx";
// import Typography from "./IndexSections/Typography.jsx";
// import Modals from "./IndexSections/Modals.jsx";
// import Datepicker from "./IndexSections/Datepicker.jsx";
// import TooltipPopover from "./IndexSections/TooltipPopover.jsx";
// import Carousel from "./IndexSections/Carousel.jsx";
// import Icons from "./IndexSections/Icons.jsx";
// import Login from "./IndexSections/Login.jsx";
// import Download from "./IndexSections/Download.jsx";


class Index extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      iconTabs: 1,
      plainTabs: 1,
      selectedNames:[],
      savedNames: []
    }
    this.onSelectName = this.onSelectName.bind(this);
    this.onSaveSelectedName = this.onSaveSelectedName.bind(this);
    this.onDeleteName = this.onDeleteName.bind(this);
  }

  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index
    });
  };

  onSelectName(selectedNames){
    this.setState({selectedNames: selectedNames})
  }

  onSaveSelectedName(){
    let newRecord = {
      name: this.state.selectedNames.map(x=>x.name).join(' '),
      meaning: this.state.selectedNames.map(x=>x.meaning).join(' | ')
    }
    this.setState({
      ...this.state, 
      savedNames: [...this.state.savedNames, newRecord],
      selectedNames: []
    })
    this.nameList.onClearSelect();
    NotificationManager.success('Nama Berhasil disimpan','Simpan')
  }

  onDeleteName(index){
    let names = [...this.state.savedNames]
    names.splice(index, 1);
    this.setState({
      ...this.state,
      savedNames: names
    })
    NotificationManager.success('Nama Berhasil dihapus','Hapus')
  }

  componentDidMount() {
  }

  render() {
    return (
      <>
      <main ref="main">
        <section className="">
          <Col className="mt-5 mt-lg-0 fl-left" lg="8">
            {/* Menu */}
            <div className="nav-wrapper">
              <Nav
                className="nav-fill flex-column flex-md-row"
                id="tabs-icons-text"
                pills
                role="tablist"
              >
                <NavItem>
                  <NavLink
                    aria-selected={this.state.plainTabs === 1}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.plainTabs === 1
                    })}
                    onClick={e => this.toggleNavs(e, "plainTabs", 1)}
                    href="#pablo"
                    role="tab"
                  >
                    Nama-nama Anak
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    aria-selected={this.state.plainTabs === 2}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.plainTabs === 2
                    })}
                    onClick={e => this.toggleNavs(e, "plainTabs", 2)}
                    href="#pablo"
                    role="tab"
                  >
                    Nama Tersimpan
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            <Card className="shadow">
              <CardBody>
                <TabContent activeTab={"plainTabs" + this.state.plainTabs}>
                  <TabPane tabId="plainTabs1">
                    <NameList onSelectName={this.onSelectName} onRef={ref => (this.nameList = ref)}/>
                  </TabPane>
                  <TabPane tabId="plainTabs2">
                      {
                        this.state.savedNames.length ? this.state.savedNames.map((i, idx)=>{
                          return (
                            <div key={idx} style={{ display: "table", width: "100%", marginBottom: "5px" }}>
                              <b>{i.name}</b> = {i.meaning}
                              <Button title="Delete" onClick={()=>this.onDeleteName(idx)} className="btn-1 ml-1" style={{float: "right"}} color="danger" type="button">x</Button>
                            </div>
                          )
                        }) : <div className="text-center">Tidak Ada Nama yang tersimpan</div>
                      } 
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
          <Col className="mt-5 mt-lg-0 fl-left" lg="4">
            <div className="nav-wrapper">
            <Card className="shadow">
              <CardTitle className="text-center">Nama yang dipilih</CardTitle>
              <CardBody>
                <div>
                  <b className="brd-btm">Nama</b><br/>
                  {
                    this.state.selectedNames.map(item => {
                      return <span key={item.name}><b>{item.name}</b>&nbsp;</span>
                    })
                  }
                </div>
                <div>
                  <br/><b className="brd-btm">Arti</b>
                  {
                    this.state.selectedNames.map(item => {
                      return <div key={item.name}><b>{item.name}</b>, {item.meaning}&nbsp;<br/></div>
                    })
                  }
                </div>
              </CardBody>
              <div className="btn-container">
                <Button onClick={this.onSaveSelectedName} disabled={!this.state.selectedNames.length} className="btn-1" color="primary" type="button">Simpan</Button>
              </div>
            </Card>
            </div>
          </Col>
        </section>
        <NotificationContainer />
      </main>
      </>
    );
  }
}

export default Index;
