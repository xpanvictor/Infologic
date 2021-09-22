
let total = document.querySelector('#collector').value;
total = JSON.parse(total)

function deleter(slug){
     let deleteBlog = '/blogs/blog/' + slug + '/delete';
     let permitted = confirm("Are you sure you want to delete the blog:" + slug)
     if (permitted){
          let reallyPermitted = confirm("No going back, are you sure?")
          if (reallyPermitted){
               fetch(deleteBlog, {
                    method: 'delete'
               })
               .then(window.location.reload())
          }
     }
}