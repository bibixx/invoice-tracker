import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fullCompanyPropTypes } from 'src/propTypes/companyPropTypes';

import { getCompanies as getCompaniesAction } from 'src/actions/companies';

import Grid from '@material-ui/core/Grid';

import Page from 'src/components/shared/Page/Page';
import Pagination from 'src/components/shared/Pagination/Pagination';

import CompanyItem from './CompanyItem/CompanyItem';

class CompaniesList extends Component {
  static propTypes = {
    getCompanies: PropTypes.func.isRequired,
    numberOfPages: PropTypes.number.isRequired,
    companies: PropTypes.arrayOf(fullCompanyPropTypes).isRequired,
  }

  state = {
    currentPage: 0,
  }

  componentDidMount() {
    this.getPageOfCompanies();
  }

  getPageOfCompanies = () => {
    const { currentPage } = this.state;
    const { getCompanies } = this.props;

    getCompanies(currentPage);
  }

  onNextPage = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }), this.getPageOfCompanies);
  }

  onPrevPage = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage - 1,
    }), this.getPageOfCompanies);
  }

  render() {
    const { companies, numberOfPages } = this.props;
    const { onNextPage, onPrevPage } = this;
    const { currentPage } = this.state;

    return (
      <Page>
        <Grid container spacing={24}>
          {companies.map(company => (
            <CompanyItem key={company.id} company={company} />
          ))}
        </Grid>

        <Pagination
          onNextPage={onNextPage}
          onPrevPage={onPrevPage}
          currentPage={currentPage}
          totalPages={numberOfPages}
        />
      </Page>
    );
  }
}

const mapStateToProps = ({
  companies: {
    companies, companiesLoaded, numberOfPages,
  },
}) => ({
  companies, companiesLoaded, numberOfPages,
});

const mapDispatchToProps = dispatch => ({
  getCompanies: page => dispatch(getCompaniesAction(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesList);
