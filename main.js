// main.js
import { fetchAndCommentsRender } from "./fetchnrender.js";
import { handlePostClick } from "./handlepostclick.js";
import { renderLogin } from "./renderLogin.js";
// import { addCommentElement, addFormElement } from "./varexp.js";

// Объявление переменных
let commentsData = [];
let isAuthenticated = false;
let isAuthorized = false;
export {commentsData};


fetchAndCommentsRender(commentsData, isAuthenticated, isAuthorized);
// renderLogin(handlePostClick);