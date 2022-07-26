import { faker } from "@faker-js/faker";

function email() {
  return faker.internet.email();
}
function password() {
  return faker.internet.password();
}
function url() {
  return faker.internet.url();
}
function name() {
  return faker.name;
}
export default {
  email,
  password,
  url,
  name,
};
