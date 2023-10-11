import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'

import './index.css'

const SimilarJobs = props => {
  const {similarDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    title,
    rating,
  } = similarDetails
  return (
    <li className="similar-list-item">
      <div className="similar-jobs-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div className="title-container">
          <h1>{title}</h1>
          <div className="rating-container">
            <AiFillStar className="star-img" />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="description">Description</h1>
        <p>{jobDescription}</p>
      </div>
      <div className="package-container">
        <div className="location-container">
          <div className="icon-container">
            <IoLocationSharp className="icon" />
            <p>{location}</p>
          </div>
          <div className="icon-container">
            <BsFillBriefcaseFill className="icon" />
            <p>{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
