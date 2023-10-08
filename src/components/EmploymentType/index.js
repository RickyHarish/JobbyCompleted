const EmploymentType = props => {
  const {employmentDetails, filterEmploymentType} = props

  const {label, EmploymentTypeId} = employmentDetails

  const onChangeEmploymentType = () => {
    filterEmploymentType(EmploymentTypeId)
  }

  return (
    <li className="employment-list-item">
      <input
        type="checkbox"
        id="employmentType"
        onChange={onChangeEmploymentType}
      />
      <label htmlFor="employmentType" className="employment-type-label">
        {label}
      </label>
    </li>
  )
}

export default EmploymentType
