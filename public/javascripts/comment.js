
let likevalue = document.querySelector('#like')
let count = 0;

function liker(){
     let like = parseInt(document.getElementById('like').innerText)
     let likeUrl = window.location.href + '/like/' + like;
     let dislikeUrl = window.location.href + '/dislike/' + like;
     
     if (count == 0){
          fetch(likeUrl, {
               method: 'get',
          })
          .then(res => res.json())
          .then(like => {likevalue.innerText = like[0];
                    if (like[1]){ document.querySelector('#liker').style.backgroundColor = 'blue'}})
          count++
     }
     else{
          fetch(dislikeUrl, {
               method: 'get',
          })
          .then(res => res.json())
          .then(like => {likevalue.innerText = like[0];
               document.querySelector('#liker').style.backgroundColor = 'white'})
          count = 0
     }
}

let comments = document.querySelector('#comments')
let elements = [...comments.children]
let unwantedcomments = elements.slice(5,)
function limitComment(){
     unwantedcomments.forEach(e => {
          e.style.display = 'none';
     });
}
function showAllComments(){
     unwantedcomments.forEach(e => {
          e.style.display = 'block';
     });
     document.querySelector('#showAllC').style.display = 'none'
}
limitComment()
