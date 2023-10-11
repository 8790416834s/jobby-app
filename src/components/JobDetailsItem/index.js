import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill, BsBoxArrowUpRight} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const JobDetailsItem = props => {
  const {jobItem} = props
  const {jobDetails, similarJobs} = jobItem
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    jobDescription,
    employmentType,
    packagePerAnnum,
    companyWebsiteUrl,
    lifeAtCompany,
    skills,
  } = jobDetails
  const {imageUrl, description} = lifeAtCompany

  const renderSimilarJobs = () => (
    <div className="similar-main-container">
      <h1>Similar Jobs</h1>
      <ul className="similar-container">
        {similarJobs.map(each => (
          <SimilarJobs key={each.id} similarDetails={each} />
        ))}
      </ul>
    </div>
  )

  return (
    <>
      <div className="jobs-card-container">
        <div className="job-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
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
          <div className="anchor-container">
            <h1 className="description">Description</h1>
            <a href={companyWebsiteUrl} className="anchor">
              <p>Visit</p>
              <BsBoxArrowUpRight className="website-link" />
            </a>
          </div>
          <p>{jobDescription}</p>
        </div>
        <h1>Skills</h1>
        <ul className="skill-container">
          {skills.map(each => (
            <li key={each.name} className="skill-item">
              <img src={each.imageUrl} alt={each.name} />
              <p>{each.name}</p>
            </li>
          ))}
        </ul>
        <div className="life-company-container">
          <div>
            <h1>Life at Company</h1>
            <p>{description}</p>
          </div>
          <img src={imageUrl} alt="life at company" />
        </div>
      </div>
      {renderSimilarJobs()}
    </>
  )
}
export default JobDetailsItem
