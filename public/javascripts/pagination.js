

var items = []
const discover = fetch('http://localhost:5000/api/blogs')
.then(res => res.json())
.then(values => makeprep(values));


let title = '<%= title %>'

var items = []

function makearray(values) {
    for (var i = 0; i < values.length; i++){
        var sac = JSON.stringify(values[i])
        items.push(sac);
    }
}

function displaylist(currentpage){
    const list = document.getElementById('list');

    const limit = 5;
    currentpage--;
    for(let i = currentpage; i<currentpage+limit ; i++){
        let item = document.createElement('div')
        if (items[i]){
            item.innerHTML = items[i];
            item.classList.add('listitem')
            list.appendChild(item)
        }
    }
}

function makepage() {
    const pages = document.getElementById('pages');
    const limit = 5;
    
    let pagetotal = Math.ceil(items.length / limit)
    for (let i = 1; i <= pagetotal; i++){
        let page = document.createElement('div')
        page.innerHTML = i;
        page.classList.add('number')
        if (i == 1){
            page.classList.add('active')
        }
        page.addEventListener('click', function(){
            let preselected = document.querySelector('.active')
            if (preselected){
                preselected.classList.remove('active')
            }
            // Sequence d=5        
            currentpage = (5 * i) - 4;
            list.innerHTML="";
            page.classList.add('active')
            displaylist(currentpage);
        });
        pages.appendChild(page)
    }
}

function makeprep(values) {
    makearray(values);
    makepage();
    displaylist(1);
}