const SalaryRange = props => {
  const {salaryDetails, filterSalaryRange} = props
  const {salaryRangeId, label} = salaryDetails

  const onChangeSalaryRange = () => {
    filterSalaryRange(salaryRangeId)
  }

  return (
    <li className="salary-range-list-item">
      <input
        id="salaryRange"
        type="radio"
        name="radioGroup"
        onChange={onChangeSalaryRange}
        className="salary-range"
      />
      <label htmlFor="salaryRange" className="salary-range-label">
        {label}
      </label>
    </li>
  )
}

export default SalaryRange
