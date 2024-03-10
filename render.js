export function renderComments(commentsData) {

    const listElement = document.getElementById("list");

    listElement.innerHTML = commentsData.map((comment, index) => {
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

    attachLikeButtonHandler();
    initEditComments();
}

function attachLikeButtonHandler() {
    const likeButtons = document.querySelectorAll('.like-button');
    for (const button of likeButtons) {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            button.classList.add('-loading-like');
            delay(2000).then(() => {
                const index = parseInt(button.dataset.index);
                const isActive = commentsData[index].isLiked;
                if (isActive) {
                    commentsData[index].likes--;
                } else {
                    commentsData[index].likes++;
                }
                commentsData[index].isLiked = !isActive;
                renderComments(commentsData);
            });
        });
    }
}


function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}

function initEditComments() {
    const editComments = document.querySelectorAll('.comment');
    for (const editComment of editComments) {
        editComment.addEventListener('click', () => {
            const index = editComment.dataset.index;
            const commentAuthor = `QUOTE_BEGIN${commentsData[index].author}:`;
            const commentText = `${commentsData[index].text}QUOTE_END`;
            textAreaElement.value = `${commentAuthor}\n${commentText}\n\n`;
            renderComments(commentsData);
        })
    }
}