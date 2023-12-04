import React, { useState } from "react";
import "./SeatMap.css";
import Screen from "./Screen/Screen";

const SeatMap = ({ seatsTaken }) => {
  const totalRows = 10; 
  const totalSeatsPerRow = 10; 

  // Initialize a 2D array to represent the seat map
  const seatMap = Array.from({ length: totalRows }, () =>
    Array(totalSeatsPerRow).fill(false)
  );

  // Mark seats as taken based on the data from the server
  seatsTaken?.forEach(({ row, seat }) => {
    seatMap[row - 1][seat - 1] = true;
  });

  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatClick = (rowIndex, seatIndex) => {
    if (!seatMap[rowIndex][seatIndex]) {
      setSelectedSeat({ row: rowIndex + 1, seat: seatIndex + 1 });
    }
  };

  return (
    <div className="SeatMapContainer">
      <h3>Seat Map</h3>
      <Screen />
      <table>
        <tbody>
          {seatMap.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td style={{ width: "30px", textAlign: "center" }}>
                {rowIndex + 1}
              </td>
              {row.map((isTaken, seatIndex) => (
                <td
                  key={seatIndex}
                  onClick={() => handleSeatClick(rowIndex, seatIndex)}
                  style={{
                    width: "30px",
                    height: "30px",
                    border: "1px solid",
                    backgroundColor: isTaken
                      ? "grey" // Taken seat color
                      : selectedSeat &&
                        selectedSeat.row === rowIndex + 1 &&
                        selectedSeat.seat === seatIndex + 1
                      ? "orange" // Selected seat color
                      : "green", // Available seat color
                    cursor: isTaken ? "not-allowed" : "pointer",
                  }}
                >
                  {isTaken ? "X" : `${seatIndex + 1}`}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      {selectedSeat ? (
        <div>
          <span>Selected Seat:</span>
          <br />
          <span>{`Row: ${selectedSeat?.row} Seat: ${selectedSeat?.seat}`}</span>
        </div>
      ) : null}
    </div>
  );
};

export default SeatMap;
