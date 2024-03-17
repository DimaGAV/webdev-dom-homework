// fetchnrender.js
import { getListElements } from "./api.js";
import { addCommentElement, addFormElement, } from "./varexp.js";
import { renderComments } from "./renderComments.js";


export function fetchAndCommentsRender(commentsData) {
    // 
    // addCommentElement.style.display = "none";
    getListElements().then((responseData) => {
        
        const appComments = responseData.comments.map((comment) => {
            return {
                author: comment.author.name,
                date: new Date(comment.date).toLocaleDateString('default', { day: '2-digit', month: '2-digit', year: '2-digit' }) + " " + new Date(comment.date).toLocaleTimeString().slice(0, -3),
                text: comment.text,
                likes: comment.likes,
                isLiked: false,
            };
        });

        commentsData = appComments;
        // const addFormElement = document.querySelector(".add-form");
        // addFormElement.style.display = "flex"; // Показать форму после
        renderComments(commentsData);
    });
};