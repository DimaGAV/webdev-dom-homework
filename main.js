import { fetchAndCommentsRender } from "./fetchnrender.js";
import { renderLogin } from "./renderLogin.js";

// Объявление переменных
let commentsData = [];
export {commentsData};


// fetchAndCommentsRender(commentsData);
renderLogin({ fetchAndCommentsRender });