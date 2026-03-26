const buttonEditName = 'button-edit';
const addingFormName = '.adding-form';
const buttonCancelName = 'article-cancel-button'

const postBtn = document.getElementById(buttonEditName);
const cancelBtn = document.getElementById(buttonCancelName);
const addingForm = document.querySelector(addingFormName);


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
        addingForm.setAttribute('data-hidden', '');
    }

}
addPostButtonListener();



const articleListName = '.article-grid';
const articleCardTemplateId = 'article-card-tmp';
const articleList = document.querySelector(articleListName);
const articleCardTemplate = document.getElementById(articleCardTemplateId);

const addArticleButtonId = 'article-post-button';
const addArticleButton = document.getElementById(addArticleButtonId);
const addForm = document.querySelector('.adding-form');

addForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const clonedTemplateNode = articleCardTemplate.content.cloneNode(true);

    articleList.append(clonedTemplateNode);
})


const openStatBtnId = 'button-stat';
const dialogId = 'confirmDialog';
const articleCardClassName ='article-item';
const articleStatisticName='.article-statistic';
const articleCountElementId = 'article-count'

const openStatBtn = document.getElementById(openStatBtnId);
const dialog = document.getElementById(dialogId);
const articles = document.getElementsByClassName(articleCardClassName);
const articleStatistic = document.querySelector(articleStatisticName);
const articleCountElement = document.getElementById(articleCountElementId);

openStatBtn.addEventListener('click', () => {
    const articlesCount = articles.length
    articleCountElement.textContent = articlesCount;
    dialog.showModal();
});


const closeStatBtn = dialog.querySelector('[data-close]');
closeStatBtn.addEventListener('click', () => {
    dialog.close('x');
});

dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close('backdrop');
});
