const fs = require("fs");

function saveToDatabase(data) {
  fs.writeFileSync("./database/teams.json", JSON.stringify(data, null, 2), {
    encoding: "utf8",
  });
}

module.exports = {
  saveToDatabase,
};
