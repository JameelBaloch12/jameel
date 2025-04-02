import { useState, useEffect } from "react";
import axios from "axios";

const Sucessful = () => {
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    axios.get("/api/get-transaction").then((response) => {
      setAmount(response.data.amount);
    });
  }, []);

  return (
    <div>
      <h1>Transaction Successful!</h1>
      <p>You have deposited <strong>{amount || "Loading..."} PKR</strong> successfully.</p>
    </div>
  );
};
