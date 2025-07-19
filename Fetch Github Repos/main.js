// Setting Variables

let theInput = document.querySelector(".get-repos input");
let getBtn = document.querySelector(".get-button");
let reopsData = document.querySelector(".show-data");

getBtn.onclick = function () {
  getRepos();
};

// Get repos function

function getRepos() {
  if (theInput.value == "") {
    reopsData.innerHTML = "<span>Please write GitHub username.</span>";
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((res) => {
        return res.json();
      })
      .then((repos) => {
        // Empty The container
        reopsData.innerHTML = "";

        repos.forEach((repo) => {
          // Create main Div
          let mainDiv = document.createElement("div");

          // Create Repo Name
          let repoName = document.createTextNode(repo.name);

          // Append repoName in mainDiv as a child
          mainDiv.appendChild(repoName);

          // Create URL Anchor 
          let theUrl = document.createElement("a");

          // Create URL text to Anchor tag
          let theUrlText = document.createTextNode("Visit " );

          // Append the Url Text to Anchor tag
          theUrl.appendChild(theUrlText);

          // Add the href 
          theUrl.href = `https://github.com/${theInput.value}/${repo.name}`

          // Set Attr Blan
          theUrl.setAttribute("target", "_blank")

          // Append theUrl to the mainDiv as a child
          mainDiv.appendChild(theUrl)

          // Create Stars Count span
          let starsSpan = document.createElement("span");

          // Create the Stars count text
          let starsText = document.createTextNode(`Stars ⇒ ${repo.stargazers_count}`);

          // Append starsText ot starsSpan
          starsSpan.appendChild(starsText);

          // Append the starsSpan to the mainDiv as a child
          mainDiv.appendChild(starsSpan);

          // Add class repo-box to the mainDiv
          mainDiv.className = "repo-box";

          // Append the mainDiv to reposData
          reopsData.appendChild(mainDiv);
        });
      });
  }
}
