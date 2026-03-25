const buttonPostArticleName = 'button-post-article';
const addingFormName = '.adding-form'

const postBtn = document.getElementById(buttonPostArticleName);
const addingForm = document.querySelector(addingFormName);


function addPostButtonListener() {
    postBtn.addEventListener('click', togglePostBtn);

    let isEdit = false;

    function togglePostBtn() {
        isEdit = !isEdit;
        
        if (!isEdit) {
            addingForm.setAttribute('data-hidden', '');
        } else {
            addingForm.removeAttribute('data-hidden');
        }
    }

}
addPostButtonListener();