import axiosConfig from "./axiosConfig";
import { baseUrl } from "./baseUrl";

export const getRecipe = async () => {
  return await axiosConfig("get", baseUrl + "recipe", "");
};

export const postRecipe = async (reqbody) => {
  return await axiosConfig("post", baseUrl + "recipe", reqbody);
};

export const patchRecipe = async (id, reqbody) => {
  return await axiosConfig("patch", baseUrl + "recipe/" + id, reqbody);
};

export const deleteRecipe = async (id) => {
  return await axiosConfig("delete", baseUrl + "recipe/" + id, "");
};
