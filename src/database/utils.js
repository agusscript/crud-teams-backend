const fs = require("fs");

async function saveToDatabase(data) {
  await fs.writeFileSync("./database/teams.json", JSON.stringify(data, null, 2), {
    encoding: "utf8",
  });
}

module.exports = {
  saveToDatabase,
};
