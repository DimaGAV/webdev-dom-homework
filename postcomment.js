import { postListElement } from "./api.js";
import { fetchAndCommentsRender } from "./fetchnrender.js";
import { commentsData } from "./main.js";
import { textAreaElement, nameInputElement } from "./varexp.js";

export const postComment = () => {
    return postListElement({ name: nameInputElement.value, text: textAreaElement.value })
        .then(() => {
            fetchAndCommentsRender(commentsData);
            nameInputElement.value = "";
            textAreaElement.value = "";
        });
};