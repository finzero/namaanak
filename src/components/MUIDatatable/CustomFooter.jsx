import React from "react";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import MuiTablePagination from "@material-ui/core/TablePagination";
import { withStyles } from "@material-ui/core/styles";

const defaultFooterStyles = {
  footerLH: {
    lineHeight: "53px"
  }
};


class CustomFooter extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      selectedPage: "0"
    }
  }

  handleRowChange = event => {
    this.props.changeRowsPerPage(event.target.value);
  };

  handlePageChange = (_, page) => {
    this.props.changePage(page);
    this.setState({selectedPage: page})
  };

  createPageList = () => {
    const { count, page, rowsPerPage } = this.props;
    const maxPage = Math.ceil(count/rowsPerPage);

    if(count){
      let select = [];
      let options = [];
      for(let i=0; i<maxPage; i++){
        options.push(<option key={i} value={i}>Halaman {i+1}</option>)
      }
      select.push(<select id="selectPage" key='selectPage' value={page} onChange={(e)=>this.handlePageChange(e, parseInt(e.target.value))}>{options}</select>)
      return select;
    }else{
      return <select><option value=""></option></select>;
    }
  }

  render() {
    const { count, textLabels, rowsPerPage, page } = this.props;

    const footerStyle = {
      display:'flex', 
      justifyContent: 'flex-end',
      padding: '0px 24px 0px 24px'
    };

    const pageListStyle = {
      lineHeight: "52px"
    }

    return (
      <TableFooter>
        <TableRow>
          <TableCell style={footerStyle} colSpan={1000}>
            <div className="MuiTypography-body2" style={pageListStyle}>
              Ke Halaman: &nbsp;
              {this.createPageList()}
            </div>
            <MuiTablePagination
              component="div"
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              labelRowsPerPage={textLabels.rowsPerPage}
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${textLabels.displayRows} ${count}`}
              backIconButtonProps={{
                'aria-label': textLabels.previous,
              }}
              nextIconButtonProps={{
                'aria-label': textLabels.next,
              }}
              rowsPerPageOptions={[8]}
              onChangePage={this.handlePageChange}
              onChangeRowsPerPage={this.handleRowChange}
            />
          </TableCell>
        </TableRow>
      </TableFooter>
    );
  }

}

export default withStyles(defaultFooterStyles, { name: "CustomFooter" })(CustomFooter);