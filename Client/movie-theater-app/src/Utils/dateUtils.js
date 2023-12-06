const formatDate = (dateString) => {
    const parsedDate = new Date(dateString);

    if (isNaN(parsedDate.getTime())) {
      return "";
    } else {
      const options = { hour: "2-digit", minute: "2-digit", hour12: false };
      return parsedDate.toLocaleTimeString("en-US", {
        ...options,
        timeZone: "UTC",
      });
    }
  };

export default { formatDate };
