import { renderComments } from "./render.js";
import { fetchAndCommentsRender } from "./fetchnrender.js";
import { postComment } from "./postcomment.js";

// Объявление переменных
export const nameInputElement = document.getElementById("name-input");
export const textAreaElement = document.getElementById("text-input");
export const addFormElement = document.querySelector(".add-form");
export const addCommentElement = document.getElementById("add-comment");

const buttonElement = document.getElementById("write-button");

// Структура данных для комментариев
// let commentsData = [];

// //Функция GET-запроса (получение с сервера)
// function fetchAndCommentsRender() {
//     addCommentElement.style.display = "none";
//     getListElements().then((responseData) => {
//         const appComments = responseData.comments.map((comment) => {
//             return {
//                 author: comment.author.name,
//                 date: new Date(comment.date).toLocaleDateString('default', { day: '2-digit', month: '2-digit', year: '2-digit' }) + " " + new Date(comment.date).toLocaleTimeString().slice(0, -3),
//                 text: comment.text,
//                 likes: comment.likes,
//                 isLiked: false,
//             };
//         });

//         commentsData = appComments;
//         addFormElement.style.display = "flex"; // Показать форму после
//         renderComments(commentsData);
//     });
// };

// const postComment = () => {
//     return postListElement({ name: nameInputElement.value, text: textAreaElement.value })
//         .then(() => {
//             fetchAndCommentsRender(commentsData);
//             nameInputElement.value = "";
//             textAreaElement.value = "";
//         });
// };

// функция проверки полей и обработка кодов API
const handlePostClick = (commentsData) => {

    nameInputElement.classList.remove("error");
    textAreaElement.classList.remove("error");

    if (!nameInputElement.value || nameInputElement.value.trim().length === 0) {
        nameInputElement.classList.add("error");
        return;
    }

    else if (!textAreaElement.value || textAreaElement.value.trim().length === 0) {
        textAreaElement.classList.add("error");
        return;
    }

    // Скрыть форму добавления и показать сообщение о добавлении
    addFormElement.style.display = "none";
    addCommentElement.textContent = "Комментарий добавляется...";
    addCommentElement.style.display = "block";

    postComment(textAreaElement.value, nameInputElement.value)

        .catch((error) => {

            // Обработка ошибки сервера
            if (error.message === "Сервер упал") {
                handlePostClick();
            }

            // Обработка ошибки пользователя
            else if (error.message === "Ошибочный запрос") {
                alert("Имя и комментарий должны быть не короче 3 символов");
                showAddForm();
                return;
            }

            else {
                alert("Кажется, у вас сломался интернет, попробуйте позже");
                showAddForm();
            }
        });

    renderComments(commentsData);
};

buttonElement.addEventListener('click', handlePostClick);

// Показ заполненной формы
function showAddForm() {
    addFormElement.style.display = "flex";
    addCommentElement.style.display = "none";
}

fetchAndCommentsRender();