// render dates and clients
function filterData(selectedValue, sortedCombinedUserData) {
  // ... existing switch statement code, using selectedValue and sortedCombinedUserData ...
  let filteredCombinedData = sortedCombinedUserData
  const now = new Date()
  let year = new Date().getFullYear()
  const startYear = 2005
  let startOfMonth
  let endOfMonth
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
  // ... return filteredCombinedData at the end ...
  return filteredCombinedData
}
