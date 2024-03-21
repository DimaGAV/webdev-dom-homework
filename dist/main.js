/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./api.js":
/*!****************!*\
  !*** ./api.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getListElements: () => (/* binding */ getListElements),\n/* harmony export */   login: () => (/* binding */ login),\n/* harmony export */   postListElement: () => (/* binding */ postListElement),\n/* harmony export */   setToken: () => (/* binding */ setToken),\n/* harmony export */   token: () => (/* binding */ token)\n/* harmony export */ });\n/* harmony import */ var _sanitizeHtml_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sanitizeHtml.js */ \"./sanitizeHtml.js\");\n/* harmony import */ var _varexp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./varexp.js */ \"./varexp.js\");\n\r\n\r\n\r\n\r\nconst commentsURL = \"https://wedev-api.sky.pro/api/v2/aleksander-gavrikov/comments\";\r\nconst userURL = \"https://wedev-api.sky.pro/api/user/login\";\r\n\r\nlet token;\r\n\r\nconst setToken = (newToken) => {\r\n    token = newToken;\r\n}\r\n\r\nfunction getListElements() {\r\n    // const loadingElement = document.querySelector(\".loading\");\r\n    return fetch(commentsURL, {\r\n        method: \"GET\",\r\n        headers: {\r\n            Authorization: `Bearer ${token}`,\r\n        },\r\n    })\r\n        .then((response) => {\r\n            // loadingElement.style.display = \"none\";\r\n            return response.json();\r\n        });\r\n}\r\n\r\nfunction postListElement({ name, text }) {\r\n    //POST-запрос с цепочкой промисов (отправка на сервер)\r\n    return fetch(commentsURL, {\r\n        method: \"POST\",\r\n        headers: {\r\n            Authorization: `Bearer ${token}`,\r\n        },\r\n        body: JSON.stringify({\r\n            name: (0,_sanitizeHtml_js__WEBPACK_IMPORTED_MODULE_0__.sanitizeHtml)(name),\r\n            text: (0,_sanitizeHtml_js__WEBPACK_IMPORTED_MODULE_0__.sanitizeHtml)(text),\r\n            forceError: true,\r\n        })\r\n    })\r\n        .then((response) => {\r\n\r\n            if (response.status === 500) {\r\n                throw new Error(\"Сервер упал\");\r\n            }\r\n\r\n            if (response.status === 400) {\r\n                throw new Error(\"Ошибочный запрос\");\r\n            }\r\n            else {\r\n                return response.json()\r\n            }\r\n        })\r\n}\r\n\r\nfunction login({ login, password }) {\r\n    return fetch(userURL, {\r\n      method: \"POST\",\r\n      body: JSON.stringify({\r\n        login,\r\n        password,\r\n      }),\r\n    }).then((response) => {\r\n      return response.json();\r\n    });\r\n  }\n\n//# sourceURL=webpack://webdev-dom-homework/./api.js?");

/***/ }),

/***/ "./editcomment.js":
/*!************************!*\
  !*** ./editcomment.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initEditComments: () => (/* binding */ initEditComments)\n/* harmony export */ });\n/* harmony import */ var _renderComments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderComments.js */ \"./renderComments.js\");\n\r\n// import { userName } from \"./renderLogin.js\";\r\n\r\nfunction initEditComments(commentsData) {\r\n    const textAreaElement = document.getElementById(\"text-input\");\r\n    const editComments = document.querySelectorAll('.comment');\r\n    for (const editComment of editComments) {\r\n        editComment.addEventListener('click', () => {\r\n            const index = editComment.dataset.index;\r\n            const commentAuthor = `QUOTE_BEGIN${commentsData[index].author}:`;\r\n            const commentText = `${commentsData[index].text}QUOTE_END`;\r\n            textAreaElement.value = `${commentAuthor}\\n${commentText}\\n\\n`;\r\n            (0,_renderComments_js__WEBPACK_IMPORTED_MODULE_0__.renderComments)(commentsData, true, true, userName);\r\n        })\r\n    }\r\n}\n\n//# sourceURL=webpack://webdev-dom-homework/./editcomment.js?");

/***/ }),

/***/ "./fetchnrender.js":
/*!*************************!*\
  !*** ./fetchnrender.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fetchAndCommentsRender: () => (/* binding */ fetchAndCommentsRender)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _renderComments_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderComments.js */ \"./renderComments.js\");\n\r\n\r\n\r\n\r\n\r\nfunction fetchAndCommentsRender(commentsData, isAuthenticated, isAuthorized, userName) {\r\n    (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getListElements)().then((responseData) => {\r\n\r\n        const appComments = responseData.comments.map((comment) => {\r\n            return {\r\n                author: comment.author.name,\r\n                date: new Date(comment.date).toLocaleDateString('default', { day: '2-digit', month: '2-digit', year: '2-digit' }) + \" \" + new Date(comment.date).toLocaleTimeString().slice(0, -3),\r\n                text: comment.text,\r\n                likes: comment.likes,\r\n                isLiked: false,\r\n            };\r\n        });\r\n\r\n        commentsData = appComments;\r\n\r\n        (0,_renderComments_js__WEBPACK_IMPORTED_MODULE_1__.renderComments)(commentsData, isAuthenticated, isAuthorized, userName);\r\n    });\r\n};\n\n//# sourceURL=webpack://webdev-dom-homework/./fetchnrender.js?");

/***/ }),

/***/ "./handlepostclick.js":
/*!****************************!*\
  !*** ./handlepostclick.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   handlePostClick: () => (/* binding */ handlePostClick)\n/* harmony export */ });\n/* harmony import */ var _postcomment_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./postcomment.js */ \"./postcomment.js\");\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.js */ \"./main.js\");\n// import { addCommentElement, addFormElement } from \"./varexp.js\";\r\n\r\n\r\n\r\n// функция проверки полей и обработка кодов API\r\nconst handlePostClick = () => {\r\n\r\n    const nameInputElement = document.getElementById(\"name-input\");\r\n    const textAreaElement = document.getElementById(\"text-input\");\r\n    const addFormElement = document.querySelector(\".add-form\");\r\n    const addCommentElement = document.getElementById(\"add-comment\");\r\n\r\n\r\n    nameInputElement.classList.remove(\"error\");\r\n    textAreaElement.classList.remove(\"error\");\r\n\r\n    if (!nameInputElement.value || nameInputElement.value.trim().length === 0) {\r\n        nameInputElement.classList.add(\"error\");\r\n        return;\r\n    }\r\n\r\n    else if (!textAreaElement.value || textAreaElement.value.trim().length === 0) {\r\n        textAreaElement.classList.add(\"error\");\r\n        return;\r\n    }\r\n\r\n    // Скрыть форму добавления и показать сообщение о добавлении\r\n    addFormElement.style.display = \"none\";\r\n    addCommentElement.textContent = \"Комментарий добавляется...\";\r\n    addCommentElement.style.display = \"block\";\r\n\r\n    (0,_postcomment_js__WEBPACK_IMPORTED_MODULE_0__.postComment)(textAreaElement.value, nameInputElement.value, _main_js__WEBPACK_IMPORTED_MODULE_1__.isAuthenticated)\r\n\r\n        .catch((error) => {\r\n\r\n            // Обработка ошибки сервера\r\n            if (error.message === \"Сервер упал\") {\r\n                handlePostClick();\r\n            }\r\n\r\n            // Обработка ошибки пользователя\r\n            else if (error.message === \"Ошибочный запрос\") {\r\n                alert(\"Имя и комментарий должны быть не короче 3 символов\");\r\n                showAddForm();\r\n                return;\r\n            }\r\n\r\n            else {\r\n                alert(\"Кажется, у вас сломался интернет, попробуйте позже\");\r\n                showAddForm();\r\n            }\r\n        });\r\n\r\n};\r\n\r\n// Показ заполненной формы\r\nconst showAddForm = () => {\r\n\r\n    const addFormElement = document.querySelector(\".add-form\");\r\n    const addCommentElement = document.getElementById(\"add-comment\");\r\n    addFormElement.style.display = \"flex\";\r\n    addCommentElement.style.display = \"none\";\r\n}\n\n//# sourceURL=webpack://webdev-dom-homework/./handlepostclick.js?");

/***/ }),

/***/ "./likebuttons.js":
/*!************************!*\
  !*** ./likebuttons.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   attachLikeButtonHandler: () => (/* binding */ attachLikeButtonHandler)\n/* harmony export */ });\n/* harmony import */ var _renderComments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderComments.js */ \"./renderComments.js\");\n/* harmony import */ var _renderLogin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderLogin.js */ \"./renderLogin.js\");\n\r\n\r\n\r\nfunction attachLikeButtonHandler(commentsData) {\r\n    const likeButtons = document.querySelectorAll('.like-button');\r\n    for (const button of likeButtons) {\r\n        button.addEventListener('click', (event) => {\r\n            event.stopPropagation();\r\n            button.classList.add('-loading-like');\r\n            delay(2000).then(() => {\r\n                const index = parseInt(button.dataset.index);\r\n                const isActive = commentsData[index].isLiked;\r\n\r\n                if (isActive) {\r\n                    commentsData[index].likes--;\r\n                } else {\r\n                    commentsData[index].likes++;\r\n                }\r\n                commentsData[index].isLiked = !isActive;\r\n                (0,_renderComments_js__WEBPACK_IMPORTED_MODULE_0__.renderComments)(commentsData, true, true, _renderLogin_js__WEBPACK_IMPORTED_MODULE_1__.userName);\r\n            });\r\n        });\r\n    }\r\n}\r\n\r\n\r\nfunction delay(interval = 300) {\r\n    return new Promise((resolve) => {\r\n        setTimeout(() => {\r\n            resolve();\r\n        }, interval);\r\n    });\r\n}\n\n//# sourceURL=webpack://webdev-dom-homework/./likebuttons.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   commentsData: () => (/* binding */ commentsData),\n/* harmony export */   isAuthenticated: () => (/* binding */ isAuthenticated)\n/* harmony export */ });\n/* harmony import */ var _fetchnrender_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetchnrender.js */ \"./fetchnrender.js\");\n/* harmony import */ var _renderLogin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderLogin.js */ \"./renderLogin.js\");\n\r\n\r\n\r\n// Объявление переменных\r\nlet commentsData = [];\r\nlet isAuthenticated = false;\r\nlet isAuthorized = false;\r\n\r\n\r\n\r\n(0,_fetchnrender_js__WEBPACK_IMPORTED_MODULE_0__.fetchAndCommentsRender)(commentsData, isAuthenticated, isAuthorized, _renderLogin_js__WEBPACK_IMPORTED_MODULE_1__.userName);\n\n//# sourceURL=webpack://webdev-dom-homework/./main.js?");

/***/ }),

/***/ "./postcomment.js":
/*!************************!*\
  !*** ./postcomment.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   postComment: () => (/* binding */ postComment)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _fetchnrender_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fetchnrender.js */ \"./fetchnrender.js\");\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main.js */ \"./main.js\");\n/* harmony import */ var _renderLogin_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderLogin.js */ \"./renderLogin.js\");\n/* harmony import */ var _varexp_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./varexp.js */ \"./varexp.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nconst postComment = () => {\r\n    const nameInputElement = document.getElementById(\"name-input\");\r\n    const textAreaElement = document.getElementById(\"text-input\");\r\n    return (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.postListElement)({ name: nameInputElement.value, text: textAreaElement.value })\r\n        .then(() => {\r\n            (0,_fetchnrender_js__WEBPACK_IMPORTED_MODULE_1__.fetchAndCommentsRender)(_main_js__WEBPACK_IMPORTED_MODULE_2__.commentsData, true, true, _renderLogin_js__WEBPACK_IMPORTED_MODULE_3__.userName);\r\n            nameInputElement.value = \"\";\r\n            textAreaElement.value = \"\";\r\n        });\r\n};\n\n//# sourceURL=webpack://webdev-dom-homework/./postcomment.js?");

/***/ }),

/***/ "./renderComments.js":
/*!***************************!*\
  !*** ./renderComments.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderComments: () => (/* binding */ renderComments)\n/* harmony export */ });\n/* harmony import */ var _likebuttons_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./likebuttons.js */ \"./likebuttons.js\");\n/* harmony import */ var _editcomment_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editcomment.js */ \"./editcomment.js\");\n/* harmony import */ var _handlepostclick_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./handlepostclick.js */ \"./handlepostclick.js\");\n/* harmony import */ var _renderLogin_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderLogin.js */ \"./renderLogin.js\");\n\r\n\r\n\r\n\r\nfunction renderComments(commentsData, isAuthenticated, isAuthorized, userName) {\r\n\r\n    const appElement = document.getElementById(\"app\");\r\n    const commentsHtml = commentsData\r\n        .map((comment, index) => {\r\n            const textWithHTML = comment.text.replaceAll(\"QUOTE_BEGIN\", \"<div class='quote'>\").replaceAll(\"QUOTE_END\", \"</div>\");\r\n            return `\r\n            <li data-index=\"${index}\" class=\"comment\">\r\n                <div class=\"comment-header\">\r\n                    <div>${comment.author}</div>\r\n                    <div>${comment.date}</div>\r\n                </div>\r\n                <div class=\"comment-body\">\r\n                    <div class=\"comment-text\">${textWithHTML}</div>\r\n                </div>\r\n                <div class=\"comment-footer\">\r\n                    <div class=\"likes\">\r\n                        <span class=\"likes-counter\">${comment.likes}</span>\r\n                        <button class=\"like-button ${comment.isLiked ? '-active-like' : ''}\" data-index=\"${index}\"></button>\r\n                    </div>\r\n                </div>\r\n            </li>\r\n        `;\r\n        }).join('');\r\n\r\n\r\n    const addFormHtml = isAuthenticated ? `\r\n        <div class=\"add-form\">\r\n            <input id=\"name-input\" type=\"text\" class=\"add-form-name\" value = \"${userName}\" readonly />\r\n            <textarea id=\"text-input\" type=\"textarea\" class=\"add-form-text\" placeholder=\"Введите Ваш коментарий\" rows=\"4\"></textarea>\r\n            <div class=\"add-form-row\">\r\n                <button id=\"write-button\" class=\"add-form-button\">Написать</button>\r\n            </div>\r\n        </div>` : '';\r\n\r\n    const appHtml = `\r\n<div class=\"container\">\r\n    <ul id=\"list\" class=\"comments\">${commentsHtml}</ul>\r\n    <div id=\"add-comment\" class=\"add-comment-text ${isAuthorized ? 'hidden' : ''}\">Чтобы добавить комментарий, <span class = \"authorize-word\">авторизуйтесь</span></div>\r\n    ${addFormHtml}\r\n  </div>\r\n`;\r\n    appElement.innerHTML = appHtml;\r\n\r\n\r\n    const authorizeWordElement = document.querySelector(\".authorize-word\");\r\n    authorizeWordElement.addEventListener('click', _renderLogin_js__WEBPACK_IMPORTED_MODULE_3__.renderLogin);\r\n\r\n\r\n    const buttonElement = document.getElementById(\"write-button\");\r\n    if (buttonElement) {\r\n        buttonElement.addEventListener('click', _handlepostclick_js__WEBPACK_IMPORTED_MODULE_2__.handlePostClick);\r\n    }\r\n\r\n    (0,_likebuttons_js__WEBPACK_IMPORTED_MODULE_0__.attachLikeButtonHandler)(commentsData);\r\n    (0,_editcomment_js__WEBPACK_IMPORTED_MODULE_1__.initEditComments)(commentsData);\r\n}\n\n//# sourceURL=webpack://webdev-dom-homework/./renderComments.js?");

/***/ }),

/***/ "./renderLogin.js":
/*!************************!*\
  !*** ./renderLogin.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderLogin: () => (/* binding */ renderLogin),\n/* harmony export */   userName: () => (/* binding */ userName)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _fetchnrender_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fetchnrender.js */ \"./fetchnrender.js\");\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main.js */ \"./main.js\");\n\r\n\r\n\r\n\r\nlet userName;\r\n\r\nconst renderLogin = () => {\r\n    const appElement = document.getElementById(\"app\");\r\n    const loginHtml = `\r\n  <div class=\"container\">\r\n        <div class=\"authorize-form\">\r\n            <h3>Форма входа</h3>\r\n                <input id=\"login-input\" type=\"text\" class=\"authorize-form-login\" placeholder=\"Введите логин\" />\r\n                <input id=\"password-input\" type=\"text\" class=\"authorize-form-password\" placeholder=\"Введите пароль\" />\r\n            <button id=\"login-button\" class=\"authorize-form-button\">Войти</button>\r\n            <!-- <p>Зарегистрироваться</p> -->\r\n        </div>\r\n    </div>\r\n  `;\r\n\r\n    appElement.innerHTML = loginHtml;\r\n    \r\n    \r\n    const setName = (newName) => {\r\n        userName = newName;\r\n    }\r\n\r\n    const loginInputElement = document.getElementById(\"login-input\");\r\n    const passwordInputElement = document.getElementById(\"password-input\");\r\n    const enterButtonElement = document.getElementById(\"login-button\");\r\n\r\n    enterButtonElement.addEventListener(\"click\", () => {\r\n        (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.login)({\r\n            login: loginInputElement.value,\r\n            password: passwordInputElement.value,\r\n        })\r\n            .then((responseData) => {\r\n                console.log(_api_js__WEBPACK_IMPORTED_MODULE_0__.token);\r\n                (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.setToken)(responseData.user.token);\r\n                console.log(_api_js__WEBPACK_IMPORTED_MODULE_0__.token);\r\n                setName(responseData.user.name);\r\n                (0,_fetchnrender_js__WEBPACK_IMPORTED_MODULE_1__.fetchAndCommentsRender)(_main_js__WEBPACK_IMPORTED_MODULE_2__.commentsData, true, true, userName);\r\n\r\n            })\r\n            .catch((error) => {\r\n                console.error(\"Ошибка входа:\", error);\r\n                alert(\"Неправильный логин или пароль\");\r\n            });\r\n    });\r\n\r\n};\r\n\r\n\n\n//# sourceURL=webpack://webdev-dom-homework/./renderLogin.js?");

/***/ }),

/***/ "./sanitizeHtml.js":
/*!*************************!*\
  !*** ./sanitizeHtml.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   sanitizeHtml: () => (/* binding */ sanitizeHtml)\n/* harmony export */ });\nfunction sanitizeHtml(value) {\r\n    return value.replaceAll(\"&\", \"&amp;\")\r\n          .replaceAll(\"<\", \"&lt;\")\r\n          .replaceAll(\">\", \"&gt;\")\r\n          .replaceAll('\"', \"&quot;\")\r\n}\n\n//# sourceURL=webpack://webdev-dom-homework/./sanitizeHtml.js?");

/***/ }),

/***/ "./varexp.js":
/*!*******************!*\
  !*** ./varexp.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addCommentElement: () => (/* binding */ addCommentElement),\n/* harmony export */   addFormElement: () => (/* binding */ addFormElement),\n/* harmony export */   loadingElement: () => (/* binding */ loadingElement),\n/* harmony export */   nameInputElement: () => (/* binding */ nameInputElement),\n/* harmony export */   textAreaElement: () => (/* binding */ textAreaElement)\n/* harmony export */ });\n// varexp.js\r\nconst nameInputElement = document.getElementById(\"name-input\");\r\nconst textAreaElement = document.getElementById(\"text-input\");\r\nconst addFormElement = document.querySelector(\".add-form\");\r\nconst addCommentElement = document.getElementById(\"add-comment\");\r\nconst loadingElement = document.querySelector(\".loading\");\r\n\n\n//# sourceURL=webpack://webdev-dom-homework/./varexp.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;