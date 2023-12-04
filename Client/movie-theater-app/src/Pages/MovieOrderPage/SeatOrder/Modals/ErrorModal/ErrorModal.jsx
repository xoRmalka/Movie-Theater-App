import React from "react";
import { Modal, Button } from "antd";

export default function ErrorModal({ errorMessage, onBackToMovies }) {
  return (
    <Modal
    open={true}
    title="Error"
      onCancel={onBackToMovies}
      footer={[
        <Button key="backToMovies" onClick={onBackToMovies}>
          Back to All Movies
        </Button>,
      ]}
    >
      <p>Something went wrong.</p>
    </Modal>
  );
}
