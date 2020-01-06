import React from "react";
import API from "../utils/API.jsx";
import MUIDataTable from "mui-datatables";
import CustomToolbarSelect from "./MUIDatatable/CustomToolbarSelect.jsx";
import CustomFooter from "./MUIDatatable/CustomFooter.jsx";
import CustomToolbar from "./MUIDatatable/CustomToolbar.jsx";

export class NameList extends React.Component{

  constructor(props) {
    super(props);

    this.onRowsSelect = this.onRowsSelect.bind(this)
    this.onClearSelect = this.onClearSelect.bind(this)
    this.state = {
      isLoading: true,
      names: [],
      selectedNames: []
    };

    this.options = {
      filterType: 'checkbox',
      rowsPerPage: 8,
      selectableRowsOnClick: false,
      selectableRows: 'none',
      onRowsSelect: this.onRowsSelect,
      selectableRowsHeader: false,
      selectableRowsHeader: false,
      viewColumns: false,
      filter: false,
      searchOpen: true,
      responsive: 'scrollMaxHeight',
      rowsPerPageOptions: [8,10,15,20],
      CustomToolbar: () => { return <CustomToolbar /> },
      customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
        <CustomToolbarSelect onRef={ref => this.cts = ref} selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} />
      ),
      customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels) => {
        return (  
          <CustomFooter 
            count={count} 
            page={page} 
            rowsPerPage={rowsPerPage} 
            changeRowsPerPage={changeRowsPerPage} 
            changePage={changePage} 
            textLabels={textLabels} />
        );
      }
    };
  }

  columns = [
    {
      name: "name",
      label: "Nama",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "meaning",
      label: "Arti",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "setAs",
      label: "Pilih Sebagai",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <React.Fragment>
              <button onClick={()=>this.setAs(0, tableMeta.rowData)} type="button" className="btn btn-info btn-sm">Nama Depan</button>
              <button onClick={()=>this.setAs(1, tableMeta.rowData)} type="button" className="btn btn-info btn-sm">Nama Tengah</button>
              <button onClick={()=>this.setAs(2, tableMeta.rowData)} type="button" className="btn btn-info btn-sm">Nama Belakang</button>
            </React.Fragment>
          )
        }
      }
    }
  ]
  

  setAs(id, value){
    // console.log('setAs',id,value);
    this.props.onSelectName({name: value[0], meaning: value[1], order: id})
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  onRowsSelect(current, all){
    this.props.onSelectName(all.map(x=>this.state.names[x.index]));
  }

  onClearSelect(){
    this.cts.handleClickDeselectAll();
  }

  componentDidMount() {
    API.get('nama2anak.json').then(
      res => {
        this.setState({
          isLoading: false,
          names: res.data
        })
      }
    )
    this.props.onRef(this)
  }

  render(){
    if(this.state.names){
      return (
        <>
        {
          this.state.selectedNames.map(x=>{
            return <span key={x.name}>{x.name}</span>
          })
        }
        <MUIDataTable
          title={"Nama Nama Anak"}
          data={this.state.names}
          columns={this.columns}
          options={this.options}
        />

        </>
      )
    }
  }
}