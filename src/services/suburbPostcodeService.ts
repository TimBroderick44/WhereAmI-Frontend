import axios from 'axios';
import { toast } from 'react-toastify';
import { SuburbPostcodeResponse } from '../types/suburbPostcode/SuburbPostcode';

const API_URL = 'http://localhost:8080';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const fetchResults = async (searchTerm: string, searchType: 'suburb' | 'postcode') => {
  try {
    const url = searchType === 'postcode'
      ? `${API_URL}/suburb?postcode=${searchTerm}`
      : `${API_URL}/postcode?suburb=${searchTerm}`;
    const response = await axios.get<SuburbPostcodeResponse>(url, getAuthHeader());

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.error);
    } else {
      toast.error("An error occurred while trying to GET data");
    }
    throw error;
  }
};


export const addSuburbPostcode = async (suburbPostcode: { suburb: string[]; postcode: string[] }) => {
  try {
    await axios.post(`${API_URL}/admin/add`, suburbPostcode, getAuthHeader());
    toast.success("Suburb and Postcode added successfully!");
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      const errors = error.response.data;
      const messages = Object.values(errors).join("");
      toast.error(messages);
    } else {
      toast.error("An error occurred while trying to POST the suburb and postcode");
    }
    throw error;
  }
};

export const deleteSuburbPostcode = async (type: 'suburb' | 'postcode', value: string) => {
  const deleteUrl = `${API_URL}/admin/delete?${type}=${encodeURIComponent(value)}`;
  try {
    await axios.delete(deleteUrl, getAuthHeader());
    toast.success(`${type === 'suburb' ? value : `Postcode ${value}`} deleted successfully!`);
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      const errors = error.response.data;
      const messages = Object.values(errors).join("");
      toast.error(messages);
    } else {
      toast.error("An error occurred while trying to DELETE the suburb or postcode");
    }
    throw error;
  }
};

export const updateSuburbPostcode = async (type: 'suburb' | 'postcode', value: string, updateData: { suburb: string[], postcode: string[] }) => {
  const updateUrl = `${API_URL}/admin/update?${type}=${encodeURIComponent(value)}`;
  try {
    await axios.patch(updateUrl, updateData, getAuthHeader());
    toast.success("Suburb and Postcode updated successfully!");
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      const errors = error.response.data;
      const messages = Object.values(errors).join("");
      toast.error(messages);
    } else {
      toast.error("An error occurred while trying to DELETE the suburb or postcode");
    }
    throw error;
  }
};

export const suburbPostcodeService = {
  fetchResults,
  addSuburbPostcode,
  deleteSuburbPostcode,
  updateSuburbPostcode,
};