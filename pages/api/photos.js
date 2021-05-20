import fs from "fs";

const photos = async (req, res) => {
  if (req.method === "GET") {
    if (fs.existsSync("photos.json")) {
      const photos = fs.readFileSync("photos.json");
      res.status(200).json(photos);
    } else {
      res.status(200).json([]);
    }
  } else {
    res.status(403).json({ error: "syntax error !" });
  }
};

export default photos;
