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
function youtubeUrl() {
  return "https://www.youtube.com/watch?v=uaebgEChyDQ&t=2380s";
}
function nameSong() {
  return faker.music.songName();
}
export default {
  email,
  password,
  url,
  nameSong,
  youtubeUrl,
};
