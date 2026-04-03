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


const postBtn = document.getElementById(buttonEditName);
const cancelBtn = document.getElementById(buttonCancelName);
const addingForm = document.querySelector(addingFormName);
const articleList = document.querySelector(articleListName);
const openStatBtn = document.getElementById(openStatBtnId);
const dialog = document.getElementById(dialogId);
const articleStatistic = document.querySelector(articleStatisticName);
const articleCountElement = document.getElementById(articleCountElementId);
const closeStatBtn = dialog.querySelector('[data-close]');
const store = new ArticleStore(articleList);


function addPostButtonListener() {
    postBtn.addEventListener('click', togglePostBtn);
    cancelBtn.addEventListener('click', toHideForm)

    let isEdit = false;

    function togglePostBtn() {
        isEdit = !isEdit;
        
        if (!isEdit) {
            addingForm.setAttribute('data-hidden', '');
        } else {
            addingForm.removeAttribute('data-hidden');
        }
    }

    function toHideForm() {
        isEdit = false;
        addingForm.reset();
        addingForm.setAttribute('data-hidden', '');
    }

}
addPostButtonListener();


function handleAddArticleForm() {
    const articleTitle = addingForm.elements['title'].value;
    const articleDescription = addingForm.elements['paper-text'].value;
    if (!addingForm.checkValidity()) {
        return;
    }
    if (!articleTitle || !articleDescription) return;

    const article = new Article(articleTitle, articleDescription);
    store.add(article);
    addingForm.reset();
} 


function event_handlers(){
    addingForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        handleAddArticleForm();
    })
    articleList.addEventListener('click', (event) => {
    if (event.target.closest('[data-delete]')) {
        const articleElem = event.target.closest('.article-item');
        const id = articleElem.dataset.id;
        store.delete(id);
    }
    });
    openStatBtn.addEventListener('click', () => {
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
event_handlers();