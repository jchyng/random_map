const serverURL = "http://localhost:3000";

export const apiModule = {
  apiGet: async (urn, options = {}) => {
    try {
      const url = new URL(urn, serverURL);
      console.log("url:", url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API response:", data);
      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
};
