$(document).ready(function (){
  Handlebars.registerPartial(
    'authorPartial',
    document.getElementById('author-partial-template').innerHTML
  );

  Handlebars.registerHelper('displayCommit',function(){
    return new Handlebars.SafeString('<strong>' + this.author.login + ' ' + this.commit.author.name + '</strong> - ' + this.commit.message);
  });
});

function searchRepositories(){
  const searchTerms = $('#searchTerms').val()
  const url = `https://api.github.com/search/repositories?q=${searchTerms}`;

  $.get(url).done(function(response){
    // console.log(response.items);
    const repos = response.items//JSON.parse(response.items);
    const src = document.getElementById('repository-template').innerHTML;
    const template = Handlebars.compile(src);

    $("#results").html(template(repos));
  }).fail(function(error){
      displayError();
  });
}

function showCommits(el){
  const url = `https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`;
  $.get(url).done(function(response){
    // console.log(response);
    const commits = response//JSON.parse(response);
    const src = document.getElementById('commit-template').innerHTML;
    const template = Handlebars.compile(src);
    $('#details').html(template(commits));
  }).fail(error => {
    displayError();
  });
}

function displayError(){
    $("#errors").html("I'm sorry, there's been an error. Please try again.");
}
