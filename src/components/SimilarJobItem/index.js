import {AiOutlineStar} from 'react-icons/ai'
// import {AiOutlineStar} from 'react-icons/ai'
import {GrLocation} from 'react-icons/gr'
import {RiSuitcase2Line} from 'react-icons/ri'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <li className="similar-job-item-container">
      <div className="logo-container">
        <img
          src={companyLogoUrl}
          className="similar-job-company-logo"
          alt="similar job company logo"
        />
        <div className="rating-type-container">
          <h1 className="similar-job-title">{title}</h1>
          <div className="rating-container">
            <AiOutlineStar />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="similar-job-des-container">
        <h1 className="similar-job-des-heading">Description</h1>
        <p className="similar-jod-des">{jobDescription}</p>
      </div>
      <div className="location-type-container">
        <div className="location-container">
          <GrLocation />
          <p className="similar-job-location">{location}</p>
        </div>
        <div className="similar-job-type">
          <RiSuitcase2Line />
          <p className="similar-job-type">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
