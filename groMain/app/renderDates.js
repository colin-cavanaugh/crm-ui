function renderDates(allClients) {
  const dateFilter = document.getElementById('date-filter')
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
    const selectedValue = event.target.value
    let filteredClients = allClients
    const now = new Date()
    let year = new Date().getFullYear()
    let startOfMonth = new Date(year, 0, 1)
    let endOfMonth = new Date(year, 0, 31)
    switch (selectedValue) {
      case 'this-month':
        const thisMonthYear = now.getFullYear()
        const thisMonth = now.getMonth()
        startOfThisMonth = new Date(thisMonthYear, thisMonth, 1)
        endOfThisMonth = new Date(thisMonthYear, thisMonth + 1, 0)
        filteredClients = allClients.filter((client) => {
          const clientDate = new Date(client.Created_Time.split('T')[0])
          return clientDate >= startOfThisMonth && clientDate <= endOfThisMonth
        })
        break
      case 'last-month':
        // const now = new Date()
        const lastMonthYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear()
        const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1
        startOfLastMonth = new Date(lastMonthYear, lastMonth, 1)
        endOfLastMonth = new Date(lastMonthYear, lastMonth + 1, 0)
        filteredClients = allClients.filter((client) => {
          const clientDate = new Date(client.Created_Time.split('T')[0])
          return clientDate >= startOfLastMonth && clientDate <= endOfLastMonth
        })
        break
      case 'january':
        year = new Date().getFullYear()
        startOfMonth = new Date(year, 0, 1)
        endOfMonth = new Date(year, 0, 31)
        filteredClients = allClients.filter((client) => {
          const clientDate = new Date(client.Created_Time.split('T')[0])
          return clientDate >= startOfMonth && clientDate <= endOfMonth
        })
        break
      case 'february':
        year = new Date().getFullYear()
        startOfMonth = new Date(year, 1, 1)
        endOfMonth = new Date(year, 1, 30)
        filteredClients = allClients.filter((client) => {
          const clientDate = new Date(client.Created_Time.split('T')[0])
          return clientDate >= startOfMonth && clientDate <= endOfMonth
        })
        break
      case 'march':
        year = new Date().getFullYear()
        startOfMonth = new Date(year, 2, 1)
        endOfMonth = new Date(year, 2, 31)
        filteredClients = allClients.filter((client) => {
          const clientDate = new Date(client.Created_Time.split('T')[0])
          return clientDate >= startOfMonth && clientDate <= endOfMonth
        })
        break
      case 'april':
        year = new Date().getFullYear()
        startOfMonth = new Date(year, 3, 1)
        endOfMonth = new Date(year, 3, 30)
        filteredClients = allClients.filter((client) => {
          const clientDate = new Date(client.Created_Time.split('T')[0])
          return clientDate >= startOfMonth && clientDate <= endOfMonth
        })
        break
      case 'may':
        year = new Date().getFullYear()
        startOfMonth = new Date(year, 4, 1)
        endOfMonth = new Date(year, 4, 31)
        filteredClients = allClients.filter((client) => {
          const clientDate = new Date(client.Created_Time.split('T')[0])
          return clientDate >= startOfMonth && clientDate <= endOfMonth
        })
        break
      case 'june':
        year = new Date().getFullYear()
        startOfMonth = new Date(year, 5, 1)
        endOfMonth = new Date(year, 5, 30)
        filteredClients = allClients.filter((client) => {
          const clientDate = new Date(client.Created_Time.split('T')[0])
          return clientDate >= startOfMonth && clientDate <= endOfMonth
        })
        break
      case 'july':
        year = new Date().getFullYear()
        startOfMonth = new Date(year, 6, 1)
        endOfMonth = new Date(year, 6, 31)
        filteredClients = allClients.filter((client) => {
          const clientDate = new Date(client.Created_Time.split('T')[0])
          return clientDate >= startOfMonth && clientDate <= endOfMonth
        })
        break
      case 'august':
        year = new Date().getFullYear()
        startOfMonth = new Date(year, 7, 1)
        endOfMonth = new Date(year, 7, 31)
        filteredClients = allClients.filter((client) => {
          const clientDate = new Date(client.Created_Time.split('T')[0])
          return clientDate >= startOfMonth && clientDate <= endOfMonth
        })
        break
      case 'september':
        year = new Date().getFullYear()
        startOfMonth = new Date(year, 8, 1)
        endOfMonth = new Date(year, 8, 30)
        filteredClients = allClients.filter((client) => {
          const clientDate = new Date(client.Created_Time.split('T')[0])
          return clientDate >= startOfMonth && clientDate <= endOfMonth
        })
        break
      case 'october':
        year = new Date().getFullYear()
        startOfMonth = new Date(year, 9, 1)
        endOfMonth = new Date(year, 9, 31)
        filteredClients = allClients.filter((client) => {
          const clientDate = new Date(client.Created_Time.split('T')[0])
          return clientDate >= startOfMonth && clientDate <= endOfMonth
        })
        break
      case 'november':
        year = new Date().getFullYear()
        startOfMonth = new Date(year, 10, 1)
        endOfMonth = new Date(year, 10, 30)
        filteredClients = allClients.filter((client) => {
          const clientDate = new Date(client.Created_Time.split('T')[0])
          return clientDate >= startOfMonth && clientDate <= endOfMonth
        })
        break
      case 'december':
        year = new Date().getFullYear()
        startOfMonth = new Date(year, 11, 1)
        endOfMonth = new Date(year, 11, 31)
        filteredClients = allClients.filter((client) => {
          const clientDate = new Date(client.Created_Time.split('T')[0])
          return clientDate >= startOfMonth && clientDate <= endOfMonth
        })
        break
      default:
        break
    }
    renderClients(filteredClients)
  })
}
