import { postListElement } from "./api.js";
import { fetchAndCommentsRender } from "./fetchnrender.js";
import {nameInputElement} from "./main.js";
import {textAreaElement} from "./main.js";

export const postComment = (commentsData) => {
    return postListElement({ name: nameInputElement.value, text: textAreaElement.value })
        .then(() => {
            fetchAndCommentsRender(commentsData);
            nameInputElement.value = "";
            textAreaElement.value = "";
        });
};