import Env from "./Env";
const buildAvatarUrl = fileName => {
  return Env.host + "/student/file/" + fileName;
};

export { buildAvatarUrl };
