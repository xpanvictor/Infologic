
let likevalue = document.querySelector('#like')

function liker(what){
     let like = parseInt(document.getElementById('like').innerText)
     if (what === 'add'){
          like++
     }
     else{
          like--
     }

     let likeUrl = window.location.href + '/like';
     fetch(likeUrl, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'   
          },
          body: JSON.stringify({like: like})
     })
     .then(res => res.json())
     .then(like => likevalue.innerText = like)
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
