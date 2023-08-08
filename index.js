const url = 'https://jsonplaceholder.typicode.com';

// Асинхронна функція для отримання поста за його ідентифікатором
async function getPostById(postId) {
  try {
    const response = await fetch(`${url}/posts/${postId}`);
    if (!response.ok) throw new Error('Пост не знайдено');
    const post = await response.json();
    return post;
  } catch (error) {
    throw new Error('Помилка при отриманні поста');
  }
}

// Асинхронна функція для отримання коментарів по ідентифікатору поста
async function getCommentsByPostId(postId) {
  try {
    const response = await fetch(`${url}/posts/${postId}/comments`);
    if (!response.ok) throw new Error('Коментарі не знайдено');
    const comments = await response.json();
    return comments;
  } catch (error) {
    throw new Error('Помилка при отриманні коментарів');
  }
}

// Додаємо обробник події для кнопки "Пошук"
document.getElementById('searchBtn').addEventListener('click', async () => {
  try {
    const postIdValue = document.getElementById('numPostId').value;
    const postContainer = document.getElementById('post');
    const postTitle = document.getElementById('postTitle');
    const postBody = document.getElementById('postBody');
    const postIdSpan = document.getElementById('postId');
    const commentsBtn = document.getElementById('commentsBtn');
    const commentsContainer = document.getElementById('comments');
    const commentList = document.getElementById('commentList');

    // Перевіряємо, чи вірний діапазон ідентифікатору поста
    if (postIdValue >= 1 && postIdValue <= 100) {
      const post = await getPostById(postIdValue);

      // Відображаємо отриманий пост
      postContainer.style.display = 'block';
      postIdSpan.textContent = post.id;
      postTitle.textContent = post.title;
      postBody.textContent = post.body;

      // Додаємо обробник події для кнопки "Коментарі"
      commentsBtn.addEventListener('click', async () => {
        try {
          const comments = await getCommentsByPostId(postIdValue);
          commentsContainer.style.display = 'block';

          // Генеруємо HTML для списку коментарів
          const commentsHtml = comments.map(comment => `<li>${comment.body}</li>`).join('');
          commentList.innerHTML = commentsHtml;
        } catch (error) {
          alert('Помилка при отриманні коментарів');
        }
      });
    } else {
      throw new Error('Некоректний ID поста');
    }
  } catch (error) {
    alert('Помилка: ' + error.message);
  }
});
