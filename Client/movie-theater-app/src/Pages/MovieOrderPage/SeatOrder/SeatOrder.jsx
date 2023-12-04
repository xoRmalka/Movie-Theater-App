import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axiosUtils from "../../../Utils/axiosUtils";
import SuccessModal from "./Modals/SuccessModal/SuccessModal";
import SeatTakenModal from "./Modals/SeatTakenModal/SeatTakenModal";
import ErrorModal from "./Modals/ErrorModal/ErrorModal";

export default function SeatOrder({
  selectedSeat,
  scheduleData,
  scheduleUrl,
  movie,
  date,
}) {
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

  const handleSelectOtherSeat = useCallback(() => {
    window.location.reload();
  });

  const handleBackToMovies = useCallback(() => {
    navigate(`/`);
  });

  return (
    <div>
      {success === true && (
        <SuccessModal
          movieInfo={movie}
          onSelectOtherSeat={handleSelectOtherSeat}
          onBackToMovies={handleBackToMovies}
          date={date}
        />
      )}
      {success === false && (
        <SeatTakenModal
          onSelectOtherSeat={handleSelectOtherSeat}
          onBackToMovies={handleBackToMovies}
        />
      )}
      {error && (
        <ErrorModal errorMessage={error} onBackToMovies={handleBackToMovies} />
      )}

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
