import TeamIdNotDefinedError from "../../error/teamIdNotDefinedError";
import TeamNotFoundError from "../../error/teamNotFoundError";
import TeamRepository from "../teamRepository";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const uuid = uuidv4();
const fileSystem = fs;
const dbFilePath = "./src/module/team/repository/json/__tests__/mockTeams.json";

const repository = new TeamRepository(uuid, fileSystem, dbFilePath);
describe("teamRepository", () => {
  test("create - should create a new team ", async () => {
    const newTeam = { name: "new team" };
    const createdTeam = await repository.create(newTeam);
    const teams = await repository.getData();
    const teamIndex = teams.findIndex((team) => team.id == createdTeam.id);
    expect(teamIndex).toBeGreaterThan(-1);
    expect(createdTeam).toEqual(teams[teamIndex]);
  });

  test("update - should edit a team ", async () => {
    const teams = await repository.getData();
    const lastCreatedTeam = teams[teams.length - 1];
    const editedTeam = await repository.update(lastCreatedTeam.id, {
      name: "edited team",
    });
    const teamIndex = teams.findIndex((team) => team.id == editedTeam.id);
    expect(teamIndex).toBeGreaterThan(-1);
  });

  test("getData - should return parsed content when the file is read successfully", async () => {
    const teams = await repository.getAll();
    expect(teams[0]).toEqual({ id: 1, name: "new team1" });
  });

  test("getData - should return empty array when the file is not a valid JSON or the path is invalid", async () => {
    const invalidJsonFilePath = "./invalidFile.json";
    const repositoryWithInvalidFile = new TeamRepository(
      uuid,
      fileSystem,
      invalidJsonFilePath
    );

    const teams = await repositoryWithInvalidFile.getAll();
    expect(teams).toEqual([]);
  });

  test("getById - should return a team with the given id", async () => {
    const expectedContent = { id: 1, name: "new team1" };
    const team = await repository.getById(1);
    expect(team).toEqual(expectedContent);
  });

  test("getById - should throw an error if the team is not found", () => {
    expect(async () => {
      await repository.getById(5);
    }).rejects.toThrow(TeamNotFoundError);
  });

  test("delete - should throw an error if the id parameter is not defined", () => {
    expect(async () => {
      await repository.delete(undefined);
    }).rejects.toThrow(TeamIdNotDefinedError);
  });

  test("delete - should delete a team", () => {
    const teams = repository.getData();
    const lastTeam = teams.length - 1;

    expect(async () => {
      await repository.delete(teams[lastTeam].id);
    }).not.toThrow();
  });
});
