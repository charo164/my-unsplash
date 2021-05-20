import fs from "fs";

const photos = async (req, res) => {
  if (req.method === "GET") {
    const query = req.query;
    if (query.pwd !== process.env.password)
      return res.status(200).json({ error: "403", message: "Incorrect password !" });
    try {
      let photos = JSON.parse(fs.readFileSync("photos.json"));
      photos = photos.filter((p) => p.url !== query.url);
      fs.writeFileSync("photos.json", JSON.stringify(photos));
      fs.rmSync("public/" + query.url);
      res.status(200).json({ img: photos });
    } catch (error) {
      console.log(error);
      res.status(200).json({ error: "500", message: "Error !" });
    }
  } else {
    res.status(200).json({ error: "syntax error !" });
  }
};

export default photos;
