import fs from "fs";

const photos = async (req, res) => {
  if (req.method === "GET") {
    const q = req.query.q?.toLowerCase();
    if (fs.existsSync("photos.json")) {
      const photos = JSON.parse(fs.readFileSync("photos.json"));
      res
        .status(200)
        .json({ img: photos.filter((p) => p.label.toLowerCase().search(q) !== -1) });
    } else {
      res.status(200).json({ img: [] });
    }
  } else {
    res.status(403).json({ error: "syntax error !" });
  }
};

export default photos;
