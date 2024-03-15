import { attachLikeButtonHandler } from "./likebuttons.js";
import { initEditComments } from "./editcomment.js";
import { handlePostClick } from "./handlepostclick.js";

export function renderComments(commentsData) {

    // const listElement = document.getElementById("list");
    const buttonElement = document.getElementById("write-button");
    const appElement = document.getElementById("app");
    const commentsHtml = commentsData
        .map((comment, index) => {
            const textWithHTML = comment.text.replaceAll("QUOTE_BEGIN", "<div class='quote'>").replaceAll("QUOTE_END", "</div>");
            return `
            <li data-index="${index}" class="comment">
                <div class="comment-header">
                    <div>${comment.author}</div>
                    <div>${comment.date}</div>
                </div>
                <div class="comment-body">
                    <div class="comment-text">${textWithHTML}</div>
                </div>
                <div class="comment-footer">
                    <div class="likes">
                        <span class="likes-counter">${comment.likes}</span>
                        <button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-index="${index}"></button>
                    </div>
                </div>
            </li>
        `;
        }).join('');

const appHtml = `
<div class="container">
    <div class="loading">Пожалуйста подождите, загружаю комментарии...</div>
    <ul id="list" class="comments">${commentsHtml}</ul>
    <div id="add-comment" class="add-comment-text">Комментарий добавляется...</div>
    <div class="add-form">
      <input id="name-input" type="text" class="add-form-name" placeholder="Введите ваше имя" />
      <textarea id="text-input" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
        rows="4"></textarea>
      <div class="add-form-row">
        <button id="write-button" class="add-form-button">Написать</button>
        <a href="./login.html">Переход на форму</a>
      </div>
    </div>
  </div>
`;
appElement.innerHTML = appHtml;
    buttonElement.addEventListener('click', handlePostClick);

    attachLikeButtonHandler(commentsData);
    initEditComments(commentsData);
}