const API_URL = '/api';

export const testConnection = async () => {
  try {
    const response = await fetch(`${API_URL}/test`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getInsects = async () => {
    try {
        const response = await fetch(`${API_URL}/insects`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};
