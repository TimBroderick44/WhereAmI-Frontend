export interface SuburbPostcodeResponse {
  length: number;
  id: number;
  suburb: string[];
  postcode: string[];
  count: number;
}

export interface SuburbPostcodeResult {
  count: number;
  suburb: string;
  postcodes: string[];
}