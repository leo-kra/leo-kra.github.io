/**
 * Fetches and displays the latest UK technology news from the News API
 */
function fetchLatestNews() {
    const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=GB&category=technology&language=en&apiKey=${apiKey}`;

    fetch(newsApiUrl)
        .then(response => response.json())
        .then(data => {
            const newsContainer = document.getElementById('news-container');

            newsContainer.innerHTML = '';

            const newsList = document.createElement('ol');
            newsList.setAttribute('start', String((currentPage - 1) * articlesPerPage + 1));

            const articles = data.articles.slice((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage);
            articles.forEach((article, index) => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = article.url;
                link.textContent = article.title;
                listItem.appendChild(link);
                newsList.appendChild(listItem);
            });

            newsContainer.appendChild(newsList);
            updateButtonVisibility(data.articles.length);
        })
        .catch(error => {
            console.error('Error fetching news:', error);
        });
}

/**
 * Button which shows the previous set of articles when clicked
 */
function showPrevious() {
    if (currentPage > 1) {
        currentPage--;
        fetchLatestNews();
    }
}

/**
 * Button which shows the next set of articles when clicked
 */
function showNext() {
    currentPage++;
    fetchLatestNews();
}

/**
 * Adjusts the button visibility based on the current page
 * @param totalArticles - total number of fetched articles from the News API
 */
function updateButtonVisibility(totalArticles) {
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage * articlesPerPage >= totalArticles;
}

const apiKey = '8e13cb77a7674f1c92c6c4d551017fed';
let currentPage = 1;
const articlesPerPage = 1;

/**
 * Calls the fetchLatestNews function when the page loads
 * @type {fetchLatestNews}
 */
window.onload = fetchLatestNews;
