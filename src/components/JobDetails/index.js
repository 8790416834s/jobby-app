import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'
import JobDetailsItem from '../JobDetailsItem'
import Header from '../Header'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {detailsItem: {}, apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getJobDetails()
  }

  formattedData = data => ({
    id: data.id,
    location: data.location,
    rating: data.rating,
    title: data.title,
    jobDescription: data.job_description,
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
  })

  formattedSkill = data => ({
    imageUrl: data.image_url,
    name: data.name,
  })

  formattedLife = data => ({
    description: data.description,
    imageUrl: data.image_url,
  })

  renewedData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    companyWebsiteUrl: data.company_website_url,
    id: data.id,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
    skills: data.skills.map(each => this.formattedSkill(each)),
    lifeAtCompany: this.formattedLife(data.life_at_company),
  })

  getJobDetails = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        jobDetails: this.renewedData(fetchedData.job_details),
        similarJobs: fetchedData.similar_jobs.map(each =>
          this.formattedData(each),
        ),
      }
      this.setState({detailsItem: updatedData, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getJobDetails()
  }

  renderSuccess = () => {
    const {detailsItem} = this.state
    console.log(detailsItem)
    return (
      <div className="job-detail-container">
        <JobDetailsItem jobItem={detailsItem} />
      </div>
    )
  }

  renderInProgress = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={50} />
    </div>
  )

  renderFailure = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.onClickRetry} className="retry-btn">
        Retry
      </button>
    </div>
  )

  renderSwitchMethod = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.inProgress:
        return this.renderInProgress()
      case apiConstants.failure:
        return this.renderFailure()
      case apiConstants.success:
        return this.renderSuccess()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-details-container">
        <Header />
        {this.renderSwitchMethod()}
      </div>
    )
  }
}
export default JobDetails
