/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import configureDI from "./config/di.js";
import { init as initTeamModule } from "./module/team/module.js";

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const container = configureDI();
app.use(container.get("Session"));

initTeamModule(app, container);

app.listen(PORT);
console.log(`Listening on port ${PORT}`);
