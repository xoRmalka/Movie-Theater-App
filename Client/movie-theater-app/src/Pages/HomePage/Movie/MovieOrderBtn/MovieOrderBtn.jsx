import React, { useEffect } from "react";

export default function MovieOrderBtn(data) {
    const { date } = data;

    useEffect(() => {console.log(data);}, []);

  return (
    <button>MovieOrderBtn</button>
  )
}
