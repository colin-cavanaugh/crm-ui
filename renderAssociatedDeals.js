function renderAssociatedDeals(filteredClientDeals) {
  console.log(filteredClientDeals)
  const dealNames = []

  filteredClientDeals.forEach((clientData) => {
    dealNames.push(clientData.Deal_Name)
  })
  console.log(dealNames)

  console.log('Account Names:', accountNames)
}
const associatedDeals = renderAssociatedDeals(relatedClientDeals)
console.log(associatedDeals)
