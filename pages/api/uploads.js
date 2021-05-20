import fs from "fs";

const uploader = (photo) => {
  return new Promise((resolve, reject) => {
    if (photo.label?.length < 3) reject({ error: "short label !" });
    const url = photo?.url;
    const ext = "." + url.split(".")[url.split(".").length - 1];
    const name = Date.now() + Math.floor(Math.random() * 1000) + ext;
    const destUrl = "public/img/uploads/" + name;
    if (!fs.existsSync("public/img/uploads")) fs.mkdirSync("public/img/uploads");
    require("https")
      .get(url, (res) => {
        const isImage = res.headers["content-type"].search("image") !== -1;
        if (isImage) {
          res.pipe(require("fs").createWriteStream(destUrl));
          resolve({ url: destUrl.replace("public/", "") });
        } else {
          reject({ error: "invalid type !" });
        }
      })
      .on("error", (err) => {
        reject({ error: err.code });
      });
  });
};

const uploads = async (req, res) => {
  if (req.method === "POST") {
    const photo = req.body;
    const upload = await uploader(photo)
      .then((results) => {
        photo.url = results.url;
        if (fs.existsSync("photos.json")) {
          const photos = JSON.parse(fs.readFileSync("photos.json"));
          photos.push(photo);
          fs.writeFileSync("photos.json", JSON.stringify(photos));
          return results;
        } else {
          fs.writeFileSync("photos.json", JSON.stringify([photo]));
          return results;
        }
      })
      .catch((err) => {
        console.log(err)
        return { error: err };
      });
    res.status(200).json(upload);
  } else {
    res.status(403).json({ error: "syntax error !" });
  }
};

export default uploads;
