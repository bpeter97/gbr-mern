import React, { Component } from "react";
import { connect } from "react-redux";
import { getQuotes } from "../../actions/quoteActions";
import "react-table/react-table.css";
import PropTypes from "prop-types";
// import ReactTable from "react-table";
// import matchSorter from "match-sorter";

class Quotes extends Component {
  componentDidMount() {
    this.props.getQuotes();
  }

  render() {
    return (
      <div className="container-fluid main-content">
        <div className="row justify-content-center">
          <div className="col-sm-12 pb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center py-2">Quotes</h5>
                <div className="d-flex flex-row justify-content-center">
                  <div className="col-12 py-md-3 pl-md-5">Table</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Quotes.propTypes = {
  auth: PropTypes.object.isRequired,
  quotes: PropTypes.object.isRequired,
  getquotes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  quotes: state.quotes
});

export default connect(
  mapStateToProps,
  { getQuotes }
)(Quotes);

// export default Quotes;
