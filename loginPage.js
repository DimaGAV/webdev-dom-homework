import { login, setToken, token } from "./api.js";

export const renderLogin = () => {
    const appElement = document.getElementById("app");
    const loginHtml = `
  <div class="container">
        <div class="authorize-form">
            <h3>Форма входа</h3>
                <input id="login-input" type="text" class="authorize-form-login" placeholder="Введите логин" />
                <input id="password-input" type="text" class="authorize-form-password" placeholder="Введите пароль" />
            <button id="login-button" class="authorize-form-button">Войти</button>
            <a href="./index.html">Переход на комменты</a>
            <!-- <p>Зарегистрироваться</p> -->
        </div>
    </div>
  `;

    appElement.innerHTML = loginHtml;

    const buttonElement = document.getElementById("login-button");
    const loginInputElement = document.getElementById("login-input");
    const passwordInputElement = document.getElementById("password-input");

    buttonElement.addEventListener("click", () => {
        login({
            login: loginInputElement.value,
            password: passwordInputElement.value,
        }).then((responseData) => {
            console.log(token);
            setToken(responseData.user.token);
            console.log(token);
        });
    });
};