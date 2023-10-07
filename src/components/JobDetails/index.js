import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import JobDetailsItem from '../JobDetailsItem'

class JobDetails extends Component {
  state = {detailsItem: {}}

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
      this.setState({detailsItem: updatedData})
    }
  }

  renderDetailItem = () => {
    const {detailsItem} = this.state
    const {jobDetails} = detailsItem
    return (
      <>
        <JobDetailsItem jobItem={jobDetails} />
      </>
    )
  }

  render() {
    return (
      <div>
        <h1>Details...</h1>
        {this.renderDetailItem()}
      </div>
    )
  }
}
export default JobDetails
