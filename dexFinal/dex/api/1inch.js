// api/1inch.js

export default async (req, res) => {
    try {
      const { url } = req.query;
  
      // Retrieve the API key from the environment variable
      const apiKey = process.env.INCH_API_KEY;
  
      // Check if the API key is available
      if (!apiKey) {
        throw new Error("API key not found in environment variables");
      }
  
      // Define the headers with the API key
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      };
  
      // Make the fetch request with the headers
      const response = await fetch(url, { headers });
  
      if (!response.ok) {
        // Handle non-OK responses if needed
        throw new Error(`Request failed with status ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Response data:", data); // Add this line for logging
  
      res.status(200).json(data);
    } catch (error) {
      console.error("Error:", error); // Add this line for logging
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  