import express from "express";
import multer from "multer";

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/upload", upload.single("avatar"), function (req, res, next) {});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
