import React from "react";
import { Modal, Button } from "antd";

export default function SeatTakenModal({ onSelectOtherSeat, onBackToMovies }) {
  return (
    <Modal
      open={true}
      title="Seat Taken"
      onCancel={onSelectOtherSeat}
      footer={[
        <Button
          key="selectOtherSeat"
          type="primary"
          onClick={onSelectOtherSeat}
        >
          Select Other Seat
        </Button>,
        <Button key="backToMovies" onClick={onBackToMovies}>
          Back to All Movies
        </Button>,
      ]}
    >
      <p>The selected seat is already taken. Please choose another seat.</p>
    </Modal>
  );
}
