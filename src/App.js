import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavbar from "./components/MyNavbar";
import { useState, useEffect } from "react";
import MyLoader from "./components/MyLoader";
import TransactionCard from "./components/TransactionCard";
import OnlineDetective from "./components/OnlineDetective";

const App = () => {
  // endpoint to virtual DB(backend)
  const endpoint = "http://localhost:3001/";
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTransaction = async () => {
    try {
      setLoading(true);
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setTransactions(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  useEffect(() => {
    if (loading) {
      fetchTransaction();
    }
  }, [loading]);

  return (
    <div className="App">
      <MyNavbar />
      {loading && <MyLoader />}
      {transactions.length != 0 && !loading && <OnlineDetective />}
      {transactions.length > 0 && (
        <TransactionCard
          transactions={transactions}
          setLoading={setLoading}
          endpoint={endpoint}
        />
      )}
      {transactions.length == 0 && !loading && (
        <span className="m-auto">No Transaction left unchecked 🕵️✔️</span>
      )}
    </div>
  );
};

export default App;
