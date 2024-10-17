import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";

import { statuses } from "./data";

const tasks = Array.from({ length: 100 }, () => ({
  id: `SUBS-${faker.number.int({ min: 10, max: 999 })}`,
  channel_name: faker.person.fullName(),
  status: faker.helpers.arrayElement(statuses).value,
  auto_renew: faker.datatype.boolean(),
  expires_at: faker.date.soon({ days: 10 }),
  remaining: faker.lorem.words({ min: 1, max: 4 }),
}));

fs.writeFileSync(
  path.join(__dirname, "subs.json"),
  JSON.stringify(tasks, null, 2),
);

console.log("✅ Tasks data generated.");
