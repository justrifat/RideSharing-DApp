function extractNumberFromString(input: string): number | null {
  // Split the input string by spaces
  const parts = input.split(" ");

  // Find the part that can be converted to a number
  for (let part of parts) {
    const number = parseFloat(part);
    if (!isNaN(number)) {
      return number;
    }
  }

  // If no number is found, return null
  return null;
}

export const calculateFare = (distanceString: string): number => {
  const distance = extractNumberFromString(distanceString);
  if (distance === null) {
    return 0;
  }
  if (distance <= 2) {
    return 100;
  }
  if (distance > 2 && distance <= 5) {
    return 200;
  }

  return distance * 50;
};
