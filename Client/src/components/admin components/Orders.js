import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

function Orders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  function fetchData() {
    axios
      .get('http://localhost:5000/order/getAll')
      .then((response) => {
        const allOrders = response.data
        setOrders(allOrders)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  console.log(orders)

  return (
    <div style={{ width: '70%', margin: 'auto' }}>
      <MaterialTable
        title='Orders Table'
        columns={[
          {
            title: 'Picture',
            field: 'picture[0].picture',
            render: (rowData) => (
              <img
                className={{ width: '38px', height: '122px !important' }}
                src={`/uploads/${rowData.product[0].picture}`}
              />
            )
          },
          { title: 'Puyer Name', field: 'buyer[0].full_name' },
          { title: 'Product Name', field: 'product[0].name' },
          { title: 'Total Price', field: 'totalPrice' },
          { title: 'Address', field: 'address' }
        ]}
        data={orders}
        options={{
          exportButton: true
        }}
      />
    </div>
  )
}

export default Orders
