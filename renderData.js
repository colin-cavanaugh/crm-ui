window.initRenderData = async function (sortedCombinedUserData) {
  // function renderDates(sortedCombinedUserData) {
  // Assign date-filter dropdown element
  const dateFilter = document.getElementById('date-filter')
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

  dateFilter.addEventListener('change', (event) => {
    event.preventDefault()
    console.log(event)
    const selectedValue = event.target.value
    const now = new Date()
    let year = new Date().getFullYear()
    const startYear = 2005
    let startOfMonth
    let endOfMonth
    let filteredCombinedData = sortedCombinedUserData
    switch (selectedValue) {
      case 'this-month':
        const thisMonthYear = now.getFullYear()
        const thisMonth = now.getMonth()
        startOfMonth = new Date(thisMonthYear, thisMonth, 1)
        endOfMonth = new Date(thisMonthYear, thisMonth + 1, 0)
        filteredCombinedData = sortedCombinedUserData.filter((clients) => {
          console.log('filteredCombinedData', filteredCombinedData)
          const clientDate = new Date(clients.clients.Created_Time.split('T')[0])
          console.log('clientDate', clientDate)
          if (isNaN(clientDate.getTime())) {
            // Invalid date, skip this client
            return false
          }
          return clientDate >= startOfMonth && clientDate <= endOfMonth
        })
        break
      case 'last-month':
        // const now = new Date()
        const lastMonthYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear()
        const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1
        startOfLastMonth = new Date(lastMonthYear, lastMonth, 1)
        endOfLastMonth = new Date(lastMonthYear, lastMonth + 1, 0)
        filteredCombinedData = sortedCombinedUserData.filter((clients) => {
          const clientDate = new Date(clients.clients.Created_Time.split('T')[0])
          if (isNaN(clientDate.getTime())) {
            // Invalid date, skip this client
            return false
          }
          return clientDate >= startOfLastMonth && clientDate <= endOfLastMonth
        })
        break
      case 'january':
        year = new Date().getFullYear()
        startOfMonth = new Date(year, 0, 1)
        endOfMonth = new Date(year, 0, 31)
        filteredCombinedData = sortedCombinedUserData.filter((clients) => {
          const clientDate = new Date(clients.clients.Created_Time.split('T')[0])
          if (isNaN(clientDate.getTime())) {
            // Invalid date, skip this client
            return false
          }
          const clientYear = clientDate.getFullYear()
          const clientMonth = clientDate.getMonth() // Extract the month from clientDate (0-11)
          return clientMonth === 0 && clientYear >= startYear && clientYear <= year // Check if the month is January (0) and the year is within the specified range
        })
        break
      case 'february':
        year = new Date().getFullYear()
        startOfMonth = new Date(year, 1, 1)
        endOfMonth = new Date(year, 1, 30)
        filteredCombinedData = sortedCombinedUserData.filter((clients) => {
          const clientDate = new Date(clients.clients.Created_Time.split('T')[0])
          if (isNaN(clientDate.getTime())) {
            // Invalid date, skip this client
            return false
          }
          const clientYear = clientDate.getFullYear()
          const clientMonth = clientDate.getMonth()
          return clientMonth === 1 && clientYear >= startYear && clientYear <= year
        })
        break
      case 'march':
        year = new Date().getFullYear()
        startOfMonth = new Date(year, 2, 1)
        endOfMonth = new Date(year, 2, 31)
        filteredCombinedData = sortedCombinedUserData.filter((clients) => {
          const clientDate = new Date(clients.clients.Created_Time.split('T')[0])
          if (isNaN(clientDate.getTime())) {
            // Invalid date, skip this client
            return false
          }
          const clientYear = clientDate.getFullYear()
          const clientMonth = clientDate.getMonth()
          return clientMonth === 2 && clientYear >= startYear && clientYear <= year
        })
        break
      case 'april':
        year = new Date().getFullYear()
        startOfMonth = new Date(year, 3, 1)
        endOfMonth = new Date(year, 3, 30)
        filteredCombinedData = sortedCombinedUserData.filter((clients) => {
          const clientDate = new Date(clients.clients.Created_Time.split('T')[0])
          if (isNaN(clientDate.getTime())) {
            // Invalid date, skip this client
            return false
          }
          const clientYear = clientDate.getFullYear()
          const clientMonth = clientDate.getMonth()
          return clientMonth === 3 && clientYear >= startYear && clientYear <= year
        })
        break
      case 'may':
        year = new Date().getFullYear()
        filteredCombinedData = sortedCombinedUserData.filter((clients) => {
          const clientDate = new Date(clients.clients.Created_Time.split('T')[0])
          if (isNaN(clientDate.getTime())) {
            // Invalid date, skip this client
            return false
          }
          const clientYear = clientDate.getFullYear()
          const clientMonth = clientDate.getMonth() // Extract the month from clientDate (0-11)
          return clientMonth === 4 && clientYear >= startYear && clientYear <= year // Check if the month is May (4) and the year is within the specified range
        })
        break
      case 'june':
        year = new Date().getFullYear()
        startOfMonth = new Date(year, 5, 1)
        endOfMonth = new Date(year, 5, 30)
        filteredCombinedData = sortedCombinedUserData.filter((clients) => {
          const clientDate = new Date(clients.clients.Created_Time.split('T')[0])
          if (isNaN(clientDate.getTime())) {
            // Invalid date, skip this client
            return false
          }
          const clientYear = clientDate.getFullYear()
          const clientMonth = clientDate.getMonth() // Extract the month from clientDate (0-11)
          return clientMonth === 5 && clientYear >= startYear && clientYear <= year // Check if the month is May (4) and the year is within the specified range
        })
        break
      case 'july':
        year = new Date().getFullYear()
        startOfMonth = new Date(year, 6, 1)
        endOfMonth = new Date(year, 6, 31)
        filteredCombinedData = sortedCombinedUserData.filter((clients) => {
          const clientDate = new Date(clients.clients.Created_Time.split('T')[0])
          if (isNaN(clientDate.getTime())) {
            // Invalid date, skip this client
            return false
          }
          const clientYear = clientDate.getFullYear()
          const clientMonth = clientDate.getMonth() // Extract the month from clientDate (0-11)
          return clientMonth === 6 && clientYear >= startYear && clientYear <= year // Check if the month is May (4) and the year is within the specified range
        })
        break
      case 'august':
        year = new Date().getFullYear()
        startOfMonth = new Date(year, 7, 1)
        endOfMonth = new Date(year, 7, 31)
        filteredCombinedData = sortedCombinedUserData.filter((clients) => {
          const clientDate = new Date(clients.clients.Created_Time.split('T')[0])
          if (isNaN(clientDate.getTime())) {
            // Invalid date, skip this client
            return false
          }
          const clientYear = clientDate.getFullYear()
          const clientMonth = clientDate.getMonth() // Extract the month from clientDate (0-11)
          return clientMonth === 7 && clientYear >= startYear && clientYear <= year // Check if the month is May (4) and the year is within the specified range
        })
        break
      case 'september':
        year = new Date().getFullYear()
        startOfMonth = new Date(year, 8, 1)
        endOfMonth = new Date(year, 8, 30)
        filteredCombinedData = sortedCombinedUserData.filter((clients) => {
          const clientDate = new Date(clients.clients.Created_Time.split('T')[0])
          if (isNaN(clientDate.getTime())) {
            // Invalid date, skip this client
            return false
          }
          const clientYear = clientDate.getFullYear()
          const clientMonth = clientDate.getMonth() // Extract the month from clientDate (0-11)
          return clientMonth === 8 && clientYear >= startYear && clientYear <= year // Check if the month is May (4) and the year is within the specified range
        })
        break
      case 'october':
        year = new Date().getFullYear()
        startOfMonth = new Date(year, 9, 1)
        endOfMonth = new Date(year, 9, 31)
        filteredCombinedData = sortedCombinedUserData.filter((clients) => {
          const clientDate = new Date(clients.clients.Created_Time.split('T')[0])
          if (isNaN(clientDate.getTime())) {
            // Invalid date, skip this client
            return false
          }
          const clientYear = clientDate.getFullYear()
          const clientMonth = clientDate.getMonth() // Extract the month from clientDate (0-11)
          return clientMonth === 9 && clientYear >= startYear && clientYear <= year // Check if the month is May (4) and the year is within the specified range
        })
        break
      case 'november':
        year = new Date().getFullYear()
        startOfMonth = new Date(year, 10, 1)
        endOfMonth = new Date(year, 10, 30)
        filteredCombinedData = sortedCombinedUserData.filter((clients) => {
          const clientDate = new Date(clients.clients.Created_Time.split('T')[0])
          if (isNaN(clientDate.getTime())) {
            // Invalid date, skip this client
            return false
          }
          const clientYear = clientDate.getFullYear()
          const clientMonth = clientDate.getMonth() // Extract the month from clientDate (0-11)
          return clientMonth === 10 && clientYear >= startYear && clientYear <= year // Check if the month is May (4) and the year is within the specified range
        })
        break
      case 'december':
        year = new Date().getFullYear()
        startOfMonth = new Date(year, 11, 1)
        endOfMonth = new Date(year, 11, 31)
        filteredCombinedData = sortedCombinedUserData.filter((clients) => {
          const clientDate = new Date(clients.clients.Created_Time.split('T')[0])
          if (isNaN(clientDate.getTime())) {
            // Invalid date, skip this client
            return false
          }
          const clientYear = clientDate.getFullYear()
          const clientMonth = clientDate.getMonth() // Extract the month from clientDate (0-11)
          return clientMonth === 11 && clientYear >= startYear && clientYear <= year // Check if the month is May (4) and the year is within the specified range
        })
        break
      default:
        break
    }

    const filteredClients = filteredCombinedData.map((item) => item.clients)
    renderClients(filteredCombinedData)
    const filteredClientDeals = filteredCombinedData.map((item) => item.clientDeals)
    renderClientDeals(filteredCombinedData)
    const filteredSalesOrders = filteredCombinedData.map((item) => item.salesOrder)
    renderSalesOrder(filteredCombinedData)
    // console.log('end of switch statement', filteredClients)
    // console.log('end of switch statement ClientDeals', filteredClientDeals)
    // console.log('end of switch statement salesOrder', filteredSalesOrders)
    // Render the sorted clients
    clientButtonArray = renderClients(filteredCombinedData)
    clientButtonEventListener(clientButtonArray, filteredCombinedData)
  })
  // }
}
