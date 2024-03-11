import { fetchAndCommentsRender } from "./fetchnrender.js";

// Объявление переменных
let commentsData = [];
export {commentsData};
export const nameInputElement = document.getElementById("name-input");
export const textAreaElement = document.getElementById("text-input");
export const addFormElement = document.querySelector(".add-form");
export const addCommentElement = document.getElementById("add-comment");

fetchAndCommentsRender();