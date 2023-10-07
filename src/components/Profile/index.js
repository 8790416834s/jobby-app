import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Profile extends Component {
  state = {profile: {}, apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/profile`
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const data = {
        profileDetails: fetchedData.profile_details,
      }
      const updatedData = {
        name: data.profileDetails.name,
        profileImageUrl: data.profileDetails.profile_image_url,
        shortBio: data.profileDetails.short_bio,
      }
      this.setState({profile: updatedData, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderSuccess = () => {
    const {profile} = this.state
    const {name, profileImageUrl, shortBio} = profile
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderFailure = () => (
    <div className="profile-failure-container">
      <button type="button" className="retry-btn">
        Retry
      </button>
    </div>
  )

  renderInProgress = () => (
    <div className="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSwitchMethod = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccess()
      case apiConstants.failure:
        return this.renderFailure()
      case apiConstants.inProgress:
        return this.renderInProgress()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderSwitchMethod()}</>
  }
}
export default Profile
