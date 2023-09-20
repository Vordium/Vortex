// api/1inch.js

export default async (req, res) => {
    try {
      const { url } = req.query;
      const response = await fetch(url); // Use the built-in fetch function
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  