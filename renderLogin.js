import { login, setToken, token } from "./api.js";
import { fetchAndCommentsRender } from "./fetchnrender.js";
import { handlePostClick } from "./handlepostclick.js";
import { commentsData } from "./main.js";
import { renderComments } from "./renderComments.js";

export const renderLogin = () => {
    const appElement = document.getElementById("app");
    const loginHtml = `
  <div class="container">
        <div class="authorize-form">
            <h3>Форма входа</h3>
                <input id="login-input" type="text" class="authorize-form-login" placeholder="Введите логин" />
                <input id="password-input" type="text" class="authorize-form-password" placeholder="Введите пароль" />
            <button id="login-button" class="authorize-form-button">Войти</button>
            <!-- <p>Зарегистрироваться</p> -->
        </div>
    </div>
  `;

    appElement.innerHTML = loginHtml;

    const loginInputElement = document.getElementById("login-input");
    const passwordInputElement = document.getElementById("password-input");
    const buttonElement = document.getElementById("login-button");

    buttonElement.addEventListener("click", () => {
        login({
            login: loginInputElement.value,
            password: passwordInputElement.value,
        })
            .then((responseData) => {
                console.log(token);
                setToken(responseData.user.token);
                console.log(token);
            })
            .then(() => {
                // renderComments(commentsData);
                fetchAndCommentsRender();
                const buttonElement = document.getElementById("write-button");
                console.log(buttonElement);
                // const addFormElement = document.querySelector(".add-form");
                // addFormElement.style.display = "flex";
            })
            .then(() => {
                buttonElement.addEventListener('click', handlePostClick);
            })
    });
};