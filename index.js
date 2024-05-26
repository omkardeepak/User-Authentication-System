import express from "express";
import bodyParser from "body-parser";
import pg from "pg"

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "user_data",
  password: "hamburg4738"
})
db.connect();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/signin", (req, res) => {
  res.render("signin.ejs");
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});


app.post("/signup", async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const fullname = req.body.fullname
  const email = req.body.email
  const age = req.body.age
  const hobby = req.body.hobby
      const [result1, result2] = await Promise.all([
      db.query(`INSERT INTO USERS(username,password) VALUES('${username}','${password}')`),
      db.query(`INSERT INTO USERS_DATA(fullname,email,age,hobby) VALUES('${fullname}','${email}','${age}','${hobby}')`)
    ])
    res.render("signin.ejs")
    
  })


app.post("/signin", async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const user_result = await db.query("SELECT * FROM USERS")
  const result = user_result.rows.forEach(async (detail) => {
      if (detail.username ==username && detail.password==password) {
        console.log(detail.username)
        const linked_result = await db.query(`SELECT u.id,u.username,d.fullname,d.email,d.hobby,d.age FROM users u JOIN users_data d ON u.id = d.id WHERE u.username='${username}'`)
        const userid = linked_result.rows[0].id
        const name = linked_result.rows[0].fullname
        const emailid = linked_result.rows[0].email
        const hobby = linked_result.rows[0].hobby
        const age = linked_result.rows[0].age
        res.render("secrets.ejs", { username: username, userid: userid, name: name, email: emailid, hobby: hobby, age: age });
      }
      else{
        console.log("Error while logging in check email and password")
      }
  })
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
