async function getDadJoke() {
  try {
    const response = await fetch('https://icanhazdadjoke.com/', {
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.joke;

  } catch (error) {
    console.error('Error fetching data:', error);
    return 'Oops! Something went wrong, please try again later.';
  }
}

function createHTMLElement(htmlString) {
  const template = document.createElement('template');
  template.innerHTML = htmlString.trim();
  return template.content.firstChild;
}

const containerElement = document.querySelector('.dad-joke-and-user-container');
const tellMeAJokeButton = document.querySelector('.tell-me-a-joke-btn');

const userRequestHTML = `
  <div class="user-request" style="display: flex;">
    <div class="user-message">
      <p>Tell me a joke</p>
    </div>
    <img src="icons/user.svg" alt="user profile picture">
  </div>
`;

tellMeAJokeButton.addEventListener('click', async () => {
  const userMessageElement = createHTMLElement(userRequestHTML);
  containerElement.appendChild(userMessageElement);

  const loadingJokeHTML = `
    <div class="dad-joke" style="display: flex;">
      <img src="icons/dad.svg" alt="dad profile picture">
      <div class="dad-joke-message">
        <p class="dad-joke-text">...</p>
      </div>
    </div>
  `;

  const dadJokeElement = createHTMLElement(loadingJokeHTML);
  containerElement.appendChild(dadJokeElement);
  const jokeText = await getDadJoke();
  dadJokeElement.querySelector('.dad-joke-text').textContent = jokeText;
});
