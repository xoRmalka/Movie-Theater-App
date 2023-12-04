import React from "react";
import { Modal, Button } from "antd";

export default function SuccessModal({
  movieInfo,
  onSelectOtherSeat,
  onBackToMovies,
  date,
}) {
  return (
    <Modal
      open={true}
      title="Successful Order"
      onCancel={onSelectOtherSeat}
      footer={[
        <Button key="orderMore" type="primary" onClick={onSelectOtherSeat}>
          Order More Seats
        </Button>,
        <Button key="backToMovies" onClick={onBackToMovies}>
          Back to All Movies
        </Button>,
      ]}
    >
      <p>
        Your order for {movieInfo.title} on {date} was successful!
      </p>
    </Modal>
  );
}
