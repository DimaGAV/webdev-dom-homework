import { fetchAndCommentsRender } from "./fetchnrender.js";
import { renderLogin } from "./loginPage.js";

// Объявление переменных
let commentsData = [];
export {commentsData};


fetchAndCommentsRender(commentsData);
// renderLogin(fetchAndCommentsRender);