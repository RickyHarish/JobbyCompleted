import {Component} from 'react'
import Cookies from 'js-cookie'
import {GrLocation} from 'react-icons/gr'
import {RiSuitcase2Line} from 'react-icons/ri'
import {BsBoxArrowUpRight} from 'react-icons/bs'
import {AiOutlineStar} from 'react-icons/ai'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import SimilarJobItem from '../SimilarJobItem'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProcess: 'INPROCESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetailedView extends Component {
  state = {apiStatus: apiStatusConstants.initial, jobDetailsView: {}}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProcess})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        jobDetails: {
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          id: data.job_details.id,
          title: data.job_details.title,
          jobDescription: data.job_details.job_description,
          skills: data.job_details.skills.map(skill => ({
            skillImageUrl: skill.image_url,
            name: skill.name,
          })),
          lifeAtCompany: {
            description: data.job_details.life_at_company.description,
            imageUrl: data.job_details.life_at_company.image_url,
          },
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
        },
        similarJobs: data.similar_jobs.map(similarJob => ({
          companyLogoUrl: similarJob.company_logo_url,
          employmentType: similarJob.employment_type,
          id: similarJob.id,
          jobDescription: similarJob.job_description,
          location: similarJob.location,
          rating: similarJob.rating,
          title: similarJob.title,
        })),
      }
      this.setState({
        jobDetailsView: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {jobDetailsView} = this.state
    const {jobDetails, similarJobs} = jobDetailsView
    // const {} = jobDetails
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      packagePerAnnum,
      location,
      title,
      skills,
      rating,
      lifeAtCompany,
    } = jobDetails
    const {description, imageUrl} = lifeAtCompany
    return (
      <div className="bg-container">
        <div className="job-details-container">
          <div className="logo-type-container">
            <img
              src={companyLogoUrl}
              className="job-detailed-logo"
              alt="job details company logo"
            />
            <div className="title-rating-container">
              <h1 className="title">{title}</h1>
              <div className="rating-container">
                <AiOutlineStar />
                <p className="rating">{rating}</p>
              </div>
              <div className="location-package-container">
                <div className="location-container">
                  <GrLocation />
                  <p className="location">{location}</p>
                </div>
                <div className="employment-type-container">
                  <RiSuitcase2Line />
                  <p className="employment-type">{employmentType}</p>
                </div>
                <p className="package">{packagePerAnnum}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                  alt="website logo"
                />
              </div>
            </div>
          </div>
          <br />
          <div className="description-container">
            <div className="visit-link-container">
              <h1 className="des-heading">Description</h1>
              <a href={companyWebsiteUrl} className="company-url-link">
                Visit <BsBoxArrowUpRight />
              </a>
            </div>
            <p className="job-des">{jobDescription}</p>
            <h1 className="skills-heading">Skills</h1>
            <ul className="skills-list">
              {skills.map(skill => {
                const {skillImageUrl, name} = skill
                return (
                  <li key={name} className="skill-item">
                    <img
                      src={skillImageUrl}
                      className="skill-image"
                      alt={name}
                    />
                    <p className="skill-name">{name}</p>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="life-at-company-container">
            <h1 className="life-at-company-heading">Life at Company</h1>
            <p className="life-at-company-des">{description}</p>
            <img
              alt="life at company"
              src={imageUrl}
              className="life-at-company-image"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobs.map(similar => (
            <SimilarJobItem similarJobDetails={similar} key={similar.id} />
          ))}
        </ul>
      </div>
    )
  }

  retryDetailedView = () => {
    this.getJobDetails()
  }

  renderFailureView = () => (
    <div className="job-details-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="detailed-failure-image"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-des">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        data-testid="retryButton"
        className="retry-btn"
        onClick={this.retryDetailedView}
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

  renderUi = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProcess:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderUi()}
      </>
    )
  }
}

export default JobDetailedView
