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
  console.log(bodyObject);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Add any other headers as needed
    },
    body: JSON.stringify(bodyObject),
  };

  try {
    const postResponse = await fetchData(url, options);
    return postResponse;
  } catch (error) {
    // Handle the error
  }
};

export const getRequest = async (url) => {
  try {
    const getResponse = await fetchData(url);
    return getResponse;
  } catch (error) {
    // Handle the error
  }
};