import React,{useState, useEffect} from 'react'
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import { Link } from 'react-router-dom';


function AdminSalesPanel() {

    const [salesRep, setSalesRep] = useState([]);

  useEffect (() => {
    fetch('http://localhost:4000/fetch/salesrepresentativeregister').then((response)=>
        response.json()).then((result)=>{
            console.log(result);
            
          setSalesRep(result)
        }).catch(err=>console.log(err))
},[])

const handleDelete = (regId) => {
    fetch('http://localhost:4000/fetch/deletesalesrepresentative', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ regId }),
    })
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
            setSalesRep((prev) => prev.filter((salesRep) => salesRep.regId._id !== regId)); // Update the UI
        })
        .catch((err) => console.error('Error deleting customer service:', err));
};
      
  return (
    <>
    <AdminSidebar/>
    <div className='content'>
        <AdminNavbar/>
        <div className="container-fluid pt-4 px-4">
            <div className="bg-light text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h6 className="mb-0">List Of Sales Representatives</h6>
            </div>
            <div className="table-responsive">
                <table className="table text-start align-middle table-bordered table-hover mb-0">
                <thead>
                    <tr className="text-dark">
                    <th scope="col">Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Employee ID</th>
                    <th scope="col">Work Location</th>
                    <th scope="col">Commission Rate</th>
                    <th scope="col">Work Type</th>
                    <th scope="col">Email</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {salesRep.map((data, index) => (
                    <tr key={index}>
                        <td>{data.regId.name}</td>
                        <td>{data.regId.phone}</td>
                        <td>{data.regId.employeeId}</td>
                        <td>{data.regId.workLocation}</td>
                        <td>{data.regId.commissionRate}</td>
                        <td>{data.regId.workType}</td>
                        <td>{data.email}</td>
                        <td>
                        <Link className="btn btn-sm btn-danger" to="#" onClick={() => handleDelete(data.regId._id)}>
                            Delete
                        </Link>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        </div>
    </div>
    </>
  )
}
export default AdminSalesPanel