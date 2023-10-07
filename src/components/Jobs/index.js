import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header'
import JobsList from '../JobsList'
import Profile from '../Profile'
import './index.css'
import JobContext from '../../Context/JobContext'

class Jobs extends Component {
  state = {blogsData: [], isLoading: true}

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
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
      this.setState({blogsData: updatedData, isLoading: false})
    }
  }

  onChangeCheckBox = event => {
    this.setState({typeValue: event.target.value})
  }

  onChangeRadio = event => {
    this.setState({rangeValue: event.target.value})
  }

  renderLoading = () => (
    <div className="loader">
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
            <p>Type of Employment</p>
            <ul>
              {employmentTypesList.map(eachType => (
                <li key={eachType.id} className="list-item">
                  <input
                    type="checkbox"
                    id={eachType.id}
                    value={typeValue}
                    onChange={this.onChangeCheckBox}
                  />
                  <label htmlFor={eachType.id}>{eachType.label}</label>
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
        console.log(rangeValue)
        return (
          <div className="range-section">
            <p>Salary Range</p>
            <ul>
              {salaryRangesList.map(each => (
                <li key={each.id} className="list-item">
                  <input
                    type="radio"
                    id={each.id}
                    name="radio"
                    value={rangeValue}
                    onChange={this.onChangeRadio}
                  />
                  <label htmlFor={each.id}>{each.label}</label>
                </li>
              ))}
            </ul>
          </div>
        )
      }}
    </JobContext.Consumer>
  )

  render() {
    const {blogsData, isLoading} = this.state

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
            {isLoading ? (
              this.renderLoading()
            ) : (
              <ul className="jobs-list-container">
                {blogsData.map(each => (
                  <JobsList key={each.id} jobDetails={each} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
