const serverURL = "http://localhost:3000";

export const apiModule = {
  apiGet: async (urn) => {
    try {
      const response = await fetch(serverURL + urn, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API response:", data);
      return data; // 데이터를 반환
    } catch (error) {
      console.error("Error:", error);
      throw error; // 에러를 호출 측으로 전파
    }
  },
};
