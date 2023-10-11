import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header'
import JobsList from '../JobsList'
import Profile from '../Profile'
import './index.css'
import JobContext from '../../Context/JobContext'

const apiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {blogsData: [], apiStatus: ''}

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs`
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(each => ({
        id: each.id,
        title: each.title,
        rating: each.rating,
        location: each.location,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        packagePerAnnum: each.package_per_annum,
      }))
      this.setState({blogsData: updatedData, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onChangeCheckBox = event => {
    this.setState({typeValue: event.target.value})
  }

  onChangeRadio = event => {
    this.setState({rangeValue: event.target.value})
  }

  renderLoading = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderTypeSection = () => (
    <JobContext.Consumer>
      {value => {
        const {employmentTypesList} = value
        const {typeValue} = this.state
        return (
          <div className="type-section">
            <h1>Type of Employment</h1>
            <ul>
              {employmentTypesList.map(eachType => (
                <li key={eachType.employmentTypeId} className="list-item">
                  <input
                    type="checkbox"
                    id={eachType.employmentTypeId}
                    value={typeValue}
                    onChange={this.onChangeCheckBox}
                  />
                  <label htmlFor={eachType.employmentTypeId}>
                    {eachType.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )
      }}
    </JobContext.Consumer>
  )

  renderRangeSection = () => (
    <JobContext.Consumer>
      {value => {
        const {salaryRangesList} = value
        const {rangeValue} = this.state
        return (
          <div className="range-section">
            <h1>Salary Range</h1>
            <ul>
              {salaryRangesList.map(each => (
                <li key={each.salaryRangeId} className="list-item">
                  <input
                    type="radio"
                    id={each.salaryRangeId}
                    name="radio"
                    value={rangeValue}
                    onChange={this.onChangeRadio}
                  />
                  <label htmlFor={each.salaryRangeId}>{each.label}</label>
                </li>
              ))}
            </ul>
          </div>
        )
      }}
    </JobContext.Consumer>
  )

  renderSuccess = () => {
    const {blogsData} = this.state

    return (
      <>
        <ul className="jobs-list-container">
          {blogsData.map(each => (
            <JobsList key={each.id} jobDetails={each} />
          ))}
        </ul>
      </>
    )
  }

  renderFailure = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" className="retry-btn">
        Retry
      </button>
    </>
  )

  renderSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.inProgress:
        return this.renderLoading()
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
      <>
        <Header />
        <div className="jobs-container">
          <div className="filter-section">
            <Profile />
            <hr />
            <div className="type-section">{this.renderTypeSection()}</div>
            <hr />
            <div className="range-section">{this.renderRangeSection()}</div>
          </div>
          <div className="jobs-data-section">
            <div className="search-img-container">
              <input type="search" className="search-input" />
              <AiOutlineSearch className="search-img" />
            </div>
            {this.renderSwitch()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
