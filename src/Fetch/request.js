import React, { useEffect } from 'react';

export const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to let the calling code handle it
  }
};

export const postRequest = async (url  , bodyObject) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Add any other headers as needed
    },
    body: JSON.stringify(bodyObject),
  };

  try {
    const data = await fetchData(url, options);
    console.log('POST Response:', data);
  } catch (error) {
    // Handle the error
  }
};

export const getRequest = async (url) => {
  try {
    const data = await fetchData(url);
    console.log('GET Response:', data);
  } catch (error) {
    // Handle the error
  }
};