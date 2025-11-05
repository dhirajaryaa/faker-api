import fs from "fs/promises";
import path from "path";

const root = process.cwd();

export const loadJSON = async (filePath) => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

export const POSTS = await loadJSON(path.join(root, "data/posts.json"));
export const TODOS = await loadJSON(path.join(root, "data/todos.json"));
export const USERS = await loadJSON(path.join(root, "data/users.json"));
