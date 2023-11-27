import Team from "../entity/team.js";

function fromDataToEntity(teamData) {
  return new Team(
    teamData.id,
    teamData.name,
    {id: 2072, name: teamData.country},
    teamData.shortName,
    teamData.tla,
    teamData.crestUrl,
    teamData.address,
    teamData.phone,
    teamData.website,
    teamData.email,
    teamData.founded,
    teamData.clubColors,
    teamData.venue,
  );
}

export default fromDataToEntity;
