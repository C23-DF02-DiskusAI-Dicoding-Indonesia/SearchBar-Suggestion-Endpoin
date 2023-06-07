const form = document.getElementById("searchForm");
const input = document.getElementById("message");
const suggestions = document.getElementById("suggestions");
const prediction = document.getElementById("prediction");

// Function to make asynchronous request to Flask server for search suggestions
async function getSearchSuggestions(searchTerm) {
  const response = await fetch("/suggest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ searchTerm }),
  });
  const data = await response.json();
  return data.suggestions;
}

// Function to display search suggestions in the dropdown list
function showSuggestions(suggestionsArray) {
  suggestions.innerHTML = "";
  suggestionsArray.forEach((suggestion) => {
    const option = document.createElement("div");
    option.classList.add("suggestion");
    option.textContent = suggestion;
    option.addEventListener("click", () => {
      input.value = suggestion;
      suggestions.innerHTML = "";
      form.submit();
    });
    suggestions.appendChild(option);
  });
}

// Event listener for input changes
input.addEventListener("input", async () => {
  const searchTerm = input.value.trim();
  if (searchTerm) {
    const suggestionsArray = await getSearchSuggestions(searchTerm);
    showSuggestions(suggestionsArray);
  } else {
    suggestions.innerHTML = "";
  }
});

// Event listener for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = input.value.trim();
  if (searchTerm) {
    form.submit();
  }
});
