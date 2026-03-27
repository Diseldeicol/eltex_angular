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
const articleCardTemplate = document.getElementById(articleCardTemplateId);
const addArticleButton = document.getElementById(addArticleButtonId);
const openStatBtn = document.getElementById(openStatBtnId);
const dialog = document.getElementById(dialogId);
const articles = document.getElementsByClassName(articleCardClassName);
const articleStatistic = document.querySelector(articleStatisticName);
const articleCountElement = document.getElementById(articleCountElementId);
const closeStatBtn = dialog.querySelector('[data-close]');


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
    const articleTitleField = addingForm.elements['title'];
    const articleDescriptionField = addingForm.elements['paper-text'];
    
    if (!addingForm.checkValidity()) {
        return;
    }

    const clonedTemplateNode = articleCardTemplate.content.cloneNode(true);

    clonedTemplateNode.querySelector('h4').textContent = articleTitleField.value;
    
    articleList.append(clonedTemplateNode);
    addingForm.reset();
}


function event_handlers(){
    addingForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        handleAddArticleForm();
    })
    articleList.addEventListener('click', (event) =>{
    if (event.target.getAttribute('data-delete') == ''){
        event.target.parentElement.remove();
    }
    })

    openStatBtn.addEventListener('click', () => {
        const articlesCount = articles.length
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