import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosUtils from "../../../Utils/axiosUtils";

export default function SeatOrder({ selectedSeat, scheduleData, scheduleUrl }) {
  const [seat, setSeat] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setSeat(selectedSeat);
  }, [selectedSeat]);

  const submitOrder = async () => {
    try {
      const { data } = await axiosUtils.updateItem(
        scheduleUrl,
        scheduleData._id,
        selectedSeat
      );

      setSuccess(data.success);
      setError(null);
    } catch (error) {
      setSuccess(false);
      setError(error.message);
      console.error(error);
    }
  };

  const handleOrderMore = () => {
    window.location.reload();
  };

  const handleBackToMovies = () => {
    navigate(`/`);
  };

  return (
    <div>


      {seat ? (
        <div>
          <span>Selected Seat:</span>
          <br />
          <span>{`Row: ${seat?.row} Seat: ${seat?.seat}`}</span>
          <br />
          <br />
          <button onClick={submitOrder}>Complete Your Order</button>
        </div>
      ) : (
        <div>
          <span>{""}</span>
          <br />
          <span>{""}</span>
          <br />
          <br />
          <button disabled>Choose A Seat To Order</button>
        </div>
      )}
    </div>
  );
}
