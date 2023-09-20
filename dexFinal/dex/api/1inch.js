// api/1inch.js

export default async (req, res) => {
    try {
      const { url } = req.query;
  
      // Define the headers with your API key
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer REACT_APP_1INCH_KEY",
      };
  
      // Make the fetch request with the headers
      const response = await fetch(url, { headers });
  
      if (!response.ok) {
        // Handle non-OK responses if needed
        throw new Error(`Request failed with status ${response.status}`);
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  