import { Article } from './article-storage.js';
import { ArticleStore } from './article-storage.js';

const buttonEditName = 'button-edit';
const addingFormName = '.adding-form';
const buttonCancelName = 'article-cancel-button';
const articleListName = '.article-grid';
const articleCardTemplateId = 'article-card-tmp';
const addArticleButtonId = 'article-post-button';
const openStatBtnId = 'button-stat';
const dialogId = 'confirmDialog';
const articleCardClassName ='article-item';
const articleStatisticName='.article-statistic';
const articleCountElementId = 'article-count';
const louderName = '.spinner-wrapper'
const btnViewMoreName = '.view-more'


const postBtn = document.getElementById(buttonEditName);
const cancelBtn = document.getElementById(buttonCancelName);
const addingForm = document.querySelector(addingFormName);
const articleList = document.querySelector(articleListName);
const openStatBtn = document.getElementById(openStatBtnId);
const dialog = document.getElementById(dialogId);
const articleStatistic = document.querySelector(articleStatisticName);
const articleCountElement = document.getElementById(articleCountElementId);
const closeStatBtn = dialog.querySelector('[data-close]');
const loader = document.querySelector(louderName)
const viewMore = document.querySelector(btnViewMoreName);

let store = null;
let isLoading = false;

function setFormDisabled(disabled) {
    const fields = addingForm.querySelectorAll('input, textarea, button');
    fields.forEach((field) => {
        field.disabled = disabled;
    });

    postBtn.disabled = disabled;
    openStatBtn.disabled = disabled;
}
function openForm() {
    addingForm.style.display = 'block';
    addingForm.removeAttribute('data-hidden');
}

function closeForm() {
    addingForm.setAttribute('data-hidden', '');
    setTimeout(() => {
        if (addingForm.hasAttribute('data-hidden')) {
            addingForm.style.display = 'none';
        }
    }, 250);
}
function initStoreWithDelay() {
    if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
    }
    isLoading = true;
    showLoader();
    articleList.style.display = 'none';
    setFormDisabled(true);

    const loadArticlesPromise = new Promise((resolve) => {
        setTimeout(() => {
            resolve(articleList);
        }, 4000);
    });

    loadArticlesPromise
        .then((list) => {
            store = new ArticleStore(list);
        })
        .finally(() => {
            hideLoader();
            setFormDisabled(false);
            isLoading = false;
        });
}

function showLoader() {
    if (loader) {
        loader.classList.add('spinner-wrapper_visible');
    }
}

function hideLoader() {
    if (loader) {
        loader.classList.remove('spinner-wrapper_visible');
    }
}

function addPostButtonListener() {
    postBtn.addEventListener('click', togglePostBtn);
    cancelBtn.addEventListener('click', toHideForm)

    function togglePostBtn() {
        if (isLoading) return;
        const isEdit = addingForm.hasAttribute('data-hidden');

        if (isEdit) {
            openForm();
        } else {
            closeForm();
        }
    }

    function toHideForm() {
        if (isLoading) return;

        addingForm.reset();
        closeForm();
    }

}
addPostButtonListener();


function handleAddArticleForm() {
    if (isLoading) return;
    
    const articleTitle = addingForm.elements['title'].value;
    const articleDescription = addingForm.elements['paper-text'].value;
    if (!addingForm.checkValidity()) {
        return;
    }
    if (!articleTitle || !articleDescription) return;

    const article = new Article(articleTitle, articleDescription);
    isLoading = true;
    showLoader();
    setFormDisabled(true);
    loader.scrollIntoView({
                behavior: 'auto',
                block: 'center'
            });
    const addArticlePromise = new Promise((resolve) => {
        setTimeout(() => {
            resolve(article);
        }, 1500);
    });

    addArticlePromise
        .then((newArticle) => {
            store.add(newArticle);
            addingForm.reset();
            closeForm();
        })
        .finally(() => {
            hideLoader();
            setFormDisabled(false);
            isLoading = false;
        });
} 


function eventHandlers(){
    addingForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        handleAddArticleForm();
    })
    articleList.addEventListener('click', (event) => {
    if (isLoading || !store) return;
    if (event.target.closest('[data-delete]')) {
        const articleElem = event.target.closest('.article-item');
        if (!articleElem) return;
        const id = articleElem.dataset.id;
        store.delete(id);
    }
    });
    openStatBtn.addEventListener('click', () => {
        if (!store || isLoading) return;
        const articlesCount = store.articles.length;
        articleCountElement.textContent = articlesCount;
        dialog.showModal();
    });
    closeStatBtn.addEventListener('click', () => {
        dialog.close('x');
    });

    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) dialog.close('backdrop');
    });

}
eventHandlers();
initStoreWithDelay();