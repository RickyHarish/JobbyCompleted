import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {BsSearch} from 'react-icons/bs'

import JobCard from '../JobCard'
// import EmploymentType from '../EmploymentType'
// import SalaryRange from '../SalaryRange'
import Profile from '../Profile'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'INPROCESS',
}

class Jobs extends Component {
  state = {
    employmentType: [],
    salaryRange: '',
    searchInput: '',
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProcess})
    const {employmentType, salaryRange, searchInput} = this.state
    //  searchInput.toLowerCase()

    const employmentTypeString = employmentType.join(',')
    console.log(salaryRange)
    console.log(searchInput)
    console.log(employmentTypeString)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeString}&minimum_package=${salaryRange}&search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {jobsList} = this.state

    return (
      <>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        {jobsList.length !== 0 ? (
          <ul className="jobs-list">
            {jobsList.map(job => (
              <JobCard jobDetails={job} key={job.id} />
            ))}
          </ul>
        ) : (
          <div className="no-jobs-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              className="no-jobs-image"
              alt="no jobs"
            />
            <h1 className="no-jobs-heading">No Jobs Found</h1>
            <p className="no-jobs-des">
              We could not find any jobs. Try other filters.{' '}
            </p>
          </div>
        )}
      </>
    )
  }

  reloadJobs = () => {
    this.getJobs()
  }

  renderFailureView = () => (
    <div className="jobs-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="jobs-failure-image"
        alt="failure view"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-des">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        onClick={this.reloadJobs}
        className="jobs-retry-button"
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearch = () => {
    this.getJobs()
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container">
        <input
          type="search"
          value={searchInput}
          placeholder="Search"
          onChange={this.onChangeSearchInput}
        />
        <button
          type="button"
          onClick={this.onSearch}
          data-testid="searchButton"
          className="search-btn"
        >
          <BsSearch fill="white" />
        </button>
      </div>
    )
  }

  filterEmploymentType = employmentTypeId => {
    const {employmentType} = this.state

    if (employmentType.includes(employmentTypeId) === true) {
      this.setState(
        {
          employmentType: employmentType.filter(
            eachItem => eachItem !== employmentTypeId,
          ),
        },
        this.getJobs,
      )
    } else {
      this.setState(
        {employmentType: [...employmentType, employmentTypeId]},
        this.getJobs,
      )
    }
  }

  renderEmploymentType = () => {
    const {employmentTypesList} = this.props
    return (
      <div>
        <h1 className="employment-heading">Type of Employment</h1>
        <ul className="employment-list">
          {employmentTypesList.map(employment => {
            /* <EmploymentType
              key={employment.employmentTypeId}
              filterEmploymentType={this.filterEmploymentType}
              employmentDetails={employment}
            /> */
            const {label, EmploymentTypeId} = employment
            const onChangeEmploymentType = () => {
              this.filterEmploymentType(EmploymentTypeId)
            }
            return (
              <li key={EmploymentTypeId} className="employment-list-item">
                <input
                  type="checkbox"
                  id="employmentType"
                  onChange={onChangeEmploymentType}
                />
                <label
                  htmlFor="employmentType"
                  className="employment-type-label"
                >
                  {label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  filterSalaryRange = salaryRangeId => {
    this.setState({salaryRange: salaryRangeId}, this.getJobs)
  }

  renderSalaryRange = () => {
    const {salaryRangesList} = this.props
    console.log(salaryRangesList) // ---salaryRangeList---

    return (
      <div>
        <ul className="salary-list">
          <h1 className="salary-list-heading">Salary Range</h1>
          {salaryRangesList.map(eachSalary => {
            /* <SalaryRange
              key={eachSalary.salaryRangeId}
              salaryDetails={eachSalary}
              filterSalaryRange={this.filterSalaryRange}
            /> */
            const {salaryRangeId, label} = eachSalary
            const onChangeSalaryRange = () => {
              this.filterSalaryRange(salaryRangeId)
            }
            return (
              <li key={salaryRangeId} className="salary-range-list-item">
                <input
                  id="salaryRange"
                  type="radio"
                  name="radioGroup"
                  onChange={onChangeSalaryRange}
                  className="salary-range"
                />
                <label htmlFor="salaryRange" className="salary-range-label">
                  {label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  renderViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProcess:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  renderUi = () => (
    <>
      <div className="profile-section-container">
        <Header />
        {this.renderSearchInput()}
        <Profile />
        {this.renderEmploymentType()}
        {this.renderSalaryRange()}
        {this.renderViews()}
      </div>
    </>
  )

  render() {
    return <>{this.renderUi()}</>
  }
}

export default Jobs
