export const isValidSuburb = (suburb: string): boolean => {
  const suburbPattern = /^[a-zA-Z ]+$/;
  return suburbPattern.test(suburb);
};

export const isValidPostcode = (postcode: string): boolean => {
  const postcodePattern = /^\d{4}$/;
  return postcodePattern.test(postcode);
};

export const validateSuburbs = (suburbs: string[]): boolean => {
  return suburbs.every(isValidSuburb);
};

export const validatePostcodes = (postcodes: string[]): boolean => {
  return postcodes.every(isValidPostcode);
};
