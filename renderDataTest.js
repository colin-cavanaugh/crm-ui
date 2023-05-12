window.initRenderData = async function (sortedCombinedUserData) {
  const dateFilter = document.getElementById('date-filter')
  // ... existing code to create date filter dropdown options ...
  // Create choices in dropdown
  const options = [
    { value: 'all', text: 'All Dates' },
    { value: 'this-month', text: 'This Month' },
    { value: 'last-month', text: 'Last Month' },
    { value: 'january', text: 'January' },
    { value: 'february', text: 'February' },
    { value: 'march', text: 'March' },
    { value: 'april', text: 'April' },
    { value: 'may', text: 'May' },
    { value: 'june', text: 'June' },
    { value: 'july', text: 'July' },
    { value: 'august', text: 'August' },
    { value: 'september', text: 'September' },
    { value: 'october', text: 'October' },
    { value: 'november', text: 'November' },
    { value: 'december', text: 'December' },
  ]
  options.forEach(({ value, text }) => {
    const option = document.createElement('option')
    option.value = value
    option.textContent = text
    dateFilter.appendChild(option)
  })
  const renderAllData = () => {
    const filteredCombinedData = filterData('all', sortedCombinedUserData)
    clientButtonArray = renderClients(filteredCombinedData)
    clientButtonEventListener(clientButtonArray, filteredCombinedData)
  }

  // Call this function immediately to render all data by default
  renderAllData()

  dateFilter.addEventListener('change', (event) => {
    event.preventDefault()
    const selectedValue = event.target.value
    const filteredCombinedData = filterData(selectedValue, sortedCombinedUserData)
    clientButtonArray = renderClients(filteredCombinedData)
    clientButtonEventListener(clientButtonArray, filteredCombinedData)
  })
}
