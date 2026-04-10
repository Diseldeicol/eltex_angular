export class Article {
    static templateId = 'article-card-tmp';
    id = crypto.randomUUID();
    creationDate = new Date();

    constructor(title, description) {
        this.title = title;
        this.description = description;
    }

    static createFromObject(obj) {
        const article = new Article(obj.title, obj.description);
        article.id = obj.id;
        article.creationDate = new Date(obj.creationDate);
        return article;
    }

    getElement() {
        const template = document.getElementById(Article.templateId);
        const cloned = template.content.cloneNode(true);
        const articleElem = cloned.querySelector('article');

        articleElem.querySelector('h4').textContent = this.title;
        articleElem.querySelector('p').textContent = this.description;
        articleElem.querySelector('time').textContent = this.creationDate.toLocaleDateString();
        articleElem.dataset.id = this.id;

        return cloned;
    }
}

export class ArticleStore {
    static STORAGE_KEY = 'blogArticles';

    constructor(container) {
        this.container = container;
        this.articles = [];
        this.load();
        this.render();
    }

    add(article) {
        this.articles.push(article);
        this.save();

        const articleElement = article.getElement();

        if (this.articles.length === 1) {
            this.updateEmptyState();
        }

        this.container.append(articleElement);
    }

    delete(id) {
        this.articles = this.articles.filter((article) => article.id !== id);
        this.save();

        const articleElement = this.container.querySelector(`[data-id="${id}"]`);
        if (articleElement) {
            articleElement.remove();
        }

        this.updateEmptyState();
    }

    save() {
        const data = this.articles.map(a => ({
            id: a.id,
            title: a.title,
            description: a.description,
            creationDate: a.creationDate
        }));
        localStorage.setItem(ArticleStore.STORAGE_KEY, JSON.stringify(data));
    }

    load() {
        const data = JSON.parse(localStorage.getItem(ArticleStore.STORAGE_KEY)) || [];
        this.articles = data.map(obj => Article.createFromObject(obj));
    }

    render() {
        this.container.querySelectorAll('.article-item').forEach(el => el.remove());

        this.updateEmptyState();

        if (this.articles.length === 0) {
            return;
        }

        const articleElements = this.articles.map((article) => article.getElement());
        this.container.append(...articleElements);
    }
    updateEmptyState() {
        const noArticlesElem = document.querySelector('.no-articles');
        const viewMore = document.querySelector('.view-more');

        if (this.articles.length === 0) {
            this.container.style.display = 'none';

            if (noArticlesElem) {
                noArticlesElem.hidden = false;
                noArticlesElem.style.display = 'flex';
            }

            if (viewMore) {
                viewMore.hidden = true;
                viewMore.style.display = 'none';
            }

            return;
        }

        this.container.style.display = 'grid';

        if (noArticlesElem) {
            noArticlesElem.hidden = true;
            noArticlesElem.style.display = 'none';
        }

        if (viewMore) {
            viewMore.hidden = false;
            viewMore.style.display = 'block';
        }
    }
}

