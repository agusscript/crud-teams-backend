import Team from "../entity/team.js";

function fromDataToEntity({
  id,
  name,
  "short-name": shortName,
  tla,
  "crest-url": crestUrl,
  address,
  phone,
  website,
  email,
  founded,
  "club-colors": clubColors,
  venue,
}) {
  return new Team({
    id,
    name,
    shortName,
    tla,
    crestUrl,
    address,
    phone,
    website,
    email,
    founded,
    clubColors,
    venue,
  });
}

export default fromDataToEntity;
