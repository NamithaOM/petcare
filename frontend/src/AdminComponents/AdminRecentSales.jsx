import React from 'react';

function AdminRecentSales() {
  const salesData = [
    {
      date: '10 Apr 2025',
      invoice: 'INV-1001',
      customer: 'Alice Smith',
      amount: '$250.00',
      status: 'Paid',
    },
    {
      date: '09 Apr 2025',
      invoice: 'INV-1002',
      customer: 'Bob Johnson',
      amount: '$180.50',
      status: 'Pending',
    },
    {
      date: '08 Apr 2025',
      invoice: 'INV-1003',
      customer: 'Charlie Lee',
      amount: '$99.99',
      status: 'Overdue',
    },
    {
      date: '07 Apr 2025',
      invoice: 'INV-1004',
      customer: 'Diana Prince',
      amount: '$450.00',
      status: 'Paid',
    },
    {
      date: '06 Apr 2025',
      invoice: 'INV-1005',
      customer: 'Ethan Hunt',
      amount: '$320.75',
      status: 'Refunded',
    },
  ];

  return (
    <>
      {/* Recent Sales Start */}
      <div className="container-fluid pt-4 px-4">
        <div className="bg-light text-center rounded p-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h6 className="mb-0">Recent Sales</h6>
          </div>
          <div className="table-responsive">
            <table className="table text-start align-middle table-bordered table-hover mb-0">
              <thead>
                <tr className="text-dark">
                  <th scope="col">
                    <input className="form-check-input" type="checkbox" />
                  </th>
                  <th scope="col">Date</th>
                  <th scope="col">Invoice</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((sale, index) => (
                  <tr key={index}>
                    <td>
                      <input className="form-check-input" type="checkbox" />
                    </td>
                    <td>{sale.date}</td>
                    <td>{sale.invoice}</td>
                    <td>{sale.customer}</td>
                    <td>{sale.amount}</td>
                    <td>{sale.status}</td>
                    <td>
                      <a className="btn btn-sm btn-primary" href="#">
                        Detail
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Recent Sales End */}
    </>
  );
}

export default AdminRecentSales;
