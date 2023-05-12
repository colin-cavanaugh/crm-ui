const clientsData = [
  {
    clentId: 1,
    clientName: 'Client 1',
    deals: [
      { dealId: 1, value: 1000 },
      { dealId: 2, value: 2000 },
    ],
  },
  {
    clientId: 2,
    clientName: 'Client 2',
    deals: [
      { dealId: 3, value: 1500 },
      { dealId: 4, value: 2500 },
    ],
  },
]
function filterClientsByDate(dateRange) {
  let filteredClients

  // Filter the clientsData array based on the dateRange
  // This will require adjusting the filter condition depending on your date data

  // Render the filtered client names and related deals
  renderClients(filteredClients)
}

function renderClients(clients) {
  // Remove existing client name buttons and related deals container

  clients.forEach((client) => {
    // Create a client name button for each client
    const clientNameButton = document.createElement('button')
    clientNameButton.textContent = client.clientName
    clientNameButton.addEventListener('click', () => renderClientDeals(client.deals))

    // Append the client name button to the container
  })
}

function renderClientDeals(deals) {
  // Remove existing related deals container

  deals.forEach((deal) => {
    // Create a new container element for each deal and its value
    // Append the container to the related deals container
  })
}
// To efficiently handle this complex structure and filtering, you can follow these steps:

// Maintain a single source of truth for the data: Keep the data for clients, sales orders, and related deals in a data structure (e.g., an object or array), which will be your single source of truth. This will ensure that the data can be easily filtered and manipulated without affecting the DOM directly.

// Decouple rendering and filtering: Create separate functions for rendering the data and filtering the data based on the date range. This will make it easier to maintain and modify the code as you add new features or data to the project.

// Filter data first, then render: When filtering the data, first filter the data in the data structure, and then render the filtered data in the DOM. This will ensure that the DOM is only updated with the data that meets the filter criteria, which will improve performance and make it easier to maintain the code.

// Here's an example of how you can structure your code:

// A data structure to hold the clients, sales orders, and related deals
const clientsData = [
  // ... your client data with sales orders and deals
];

// Function to filter the data based on the date range
function filterDataByDate(dateRange) {
  // Filter the clientsData array based on the dateRange
  // This will require adjusting the filter condition depending on your date data
  // ...
  const filteredData = clientsData.filter(/* your filtering logic */);

  return filteredData;
}

// Function to render the data in the DOM
function renderData(filteredData) {
  // Remove existing elements from the accounts-menu-container, gro-container, and other related containers

  filteredData.forEach((client) => {
    // Render the client buttons, client-totals buttons, and other related elements in the DOM
    // ...
  });
}

// Function to handle the global date filter
function handleGlobalDateFilter(dateRange) {
  // Filter the data based on the date range
  const filteredData = filterDataByDate(dateRange);

  // Render the filtered data in the DOM
  renderData(filteredData);
}
// By following this structure, you can efficiently filter and render the data in the DOM, making it easier to maintain and extend the project as needed.




Product_Details":[{"product":{"Product_Code":"120082","Currency":"USD","name":"Website Hosting + 60 Minutes of Maintenance","id":"5641508000002317082"},"quantity":1,"Discount":0,"total_after_discount":0,"net_total":0,"book":null,"Tax":0,"list_price":0,"unit_price":null,"quantity_in_stock":0,"total":0,"id":"5641508000005170002","product_description":"No Description","line_tax":[]},{"product":{"Product_Code":"13002","Currency":"USD","name":"Graphic Design - Logo Creation","id":"5641508000000416122"},"quantity":1,"Discount":0,"total_after_discount":0,"net_total":0,"book":null,"Tax":0,"list_price":0,"unit_price":3500,"quantity_in_stock":0,"total":0,"id":"5641508000005170003","product_description":"No Description","line_tax":[]},{"product":{"Product_Code":"1300

salesOrder: relatedClientSalesOrder[index]
? relatedClientSalesOrder[index].map((salesOrder) => ({
    subject: salesOrder.Subject,
    id: salesOrder.id,
    productDetails: salesOrder.Product_Details.map((productDetail) => ({
      product: {
        id: productDetail.product.id,
        name: productDetail.product.name,
        code: productDetail.product.Product_Code,
        currency: productDetail.product.Currency,
      },
      quantity: productDetail.quantity,
      discount: productDetail.Discount,
      totalAfterDiscount: productDetail.total_after_discount,
      netTotal: productDetail.net_total,
      tax: productDetail.Tax,
      listPrice: productDetail.list_price,
      unitPrice: productDetail.unit_price,
      quantityInStock: productDetail.quantity_in_stock,
      total: productDetail.total,
      id: productDetail.id,
      productDescription: productDetail.product_description,
    })),
    grandTotal: salesOrder.Grand_Total,
  }))
: [],