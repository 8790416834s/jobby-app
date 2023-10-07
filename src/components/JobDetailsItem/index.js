import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'
import './index.css'

const JobDetailsItem = props => {
  const {jobItem} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    jobDescription,
    employmentType,
    packagePerAnnum,
  } = jobItem
  return (
    <div className="jobs-card-container">
      <div className="job-container">
        <img src={companyLogoUrl} alt="logo" className="company-logo" />
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
    </div>
  )
}
export default JobDetailsItem
