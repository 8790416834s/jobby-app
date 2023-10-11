import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const jobsList = props => {
  const {jobDetails} = props
  const {
    id,
    rating,
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`}>
      <li className="jobs-card-container">
        <div className="job-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
          <div>
            <p>{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="horizontal-line" />
        <div>
          <h1 className="description">Description</h1>
          <p>{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default jobsList
