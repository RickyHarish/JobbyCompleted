import {Link} from 'react-router-dom'
import {AiOutlineStar} from 'react-icons/ai'
import {GrLocation} from 'react-icons/gr'
import {RiSuitcase2Line} from 'react-icons/ri'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails

  return (
    <li className="card-container" key={id}>
      <Link to={`/jobs/${id}`} className="job-card-link">
        <div className="logo-rating-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="employment-rating-container">
            <h1 className="employment-type">{title}</h1>
            <div className="rating-container">
              <AiOutlineStar />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-type-container">
          <div className="type-package-container">
            <div className="location-container">
              <GrLocation />
              <p className="location">{location}</p>
            </div>
            <div className="employment-container">
              <RiSuitcase2Line />
              <p className="employment">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <br />
        <div className="description-container">
          <h1 className="des-heading">Description</h1>
          <p className="job-des">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobCard
