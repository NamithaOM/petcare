import React, { useEffect, useState } from "react";
import Header from "../Auth/Header";
import Footer from "../Auth/Footer";
import { baseUrl } from "../util/BaseUrl";

export default function UserWallet() {
  const userId = localStorage.getItem("userId");
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    const fetchRefunds = async () => {
      try {
        const response = await fetch(`${baseUrl}view_refunds/${userId}/`);
        const data = await response.json();

        if (response.ok) {
          setRefunds(data.refunds);

          // Calculate total balance
          const total = data.refunds.reduce(
            (sum, item) => sum + parseFloat(item.amount || 0),
            0
          );
          setTotalBalance(total);
        } else {
          console.error("Error:", data.error);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchRefunds();
    }
  }, [userId]);

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2>User Wallet (Refund History)</h2>
        {loading ? (
          <p>Loading refunds...</p>
        ) : refunds.length > 0 ? (
          <>
            <table className="table table-bordered mt-3">
              <thead className="thead-light">
                <tr>
                  <th>Service Center</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {refunds.map((refund, index) => (
                  <tr key={index}>
                    <td>{refund.service_center}</td>
                    <td>{refund.service}</td>
                    <td>{refund.date}</td>
                    <td>{refund.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right mt-3">
              <h5>
                <strong>Total Balance: ₹{totalBalance.toFixed(2)}</strong>
              </h5>
            </div>
          </>
        ) : (
          <p>No refunds found for your account.</p>
        )}
      </div>
      <Footer />
    </>
  );
}
