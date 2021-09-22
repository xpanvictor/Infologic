

var items = []
const discover = fetch('/api/blogs')
.then(res => res.json())
.then(values => calltopage(values, 'Arts'));


// // Stringify the object
// items = JSON.stringify(items)

let shadow;
const category = {display: document.getElementById('category'),
    pages : document.createElement('div'),
    folder: []
}
const RR = {display: document.getElementById('RR'),
    pages : document.createElement('div'),
    folder: []
}
let pages;

function makearray(shadow, section, isSectionable, folder) {
    folder.length = 0;
    for (var i = 0; i < shadow.length; i++){
        // Create item object
        var sac = shadow[i]
        let item = {};
        for (key in sac){
            item[key] = sac[key]
        }
        if (isSectionable){
            if (item['section'] == section){
                folder.push(i);
            }
        }else{
            folder.push(i);
        }
    }
}

function displaylist(currentpage, unit){
    const limit = 5;
    unit['display'].innerHTML = '';
    currentpage--;
    for(let i = currentpage; i<currentpage+limit ; i++){
        let point = unit['folder'][i]

        // Checking if it exists, +1 cause indexing starts at 0. Zero returns false remenber.
        if (point+1){
            let blogbox = document.createElement('div');
            blogbox.classList.add('blogbox')
            blogbox.setAttribute('data-aos', 'fade-up')
            blogbox.setAttribute('data-aos-duration', '1000')
            let blogimg = document.createElement('div');
            blogimg.classList.add('blogimg')
            let pic = document.createElement('div');
            pic.classList.add('pic')
            let img = document.createElement('img');
            let blogauthor = document.createElement('div');
            blogauthor.classList.add('blogauthor')
            let author = document.createElement('h1');
            let date = document.createElement('h1')
            let btext = document.createElement('div');
            btext.classList.add('btext')
            let blogtext = document.createElement('div');
            blogtext.classList.add('blogtext')
            let h1 = document.createElement('h1');
            let p = document.createElement('p');
            let a = document.createElement('a');

            img.src = shadow[point]['img'];
            author.innerHTML = shadow[point]['author'];
            date.innerHTML = shadow[point]['dateAddedF'];
            blogauthor.style.color = "#786D6D";
            h1.innerHTML = shadow[point]['title'];
            p.innerHTML = shadow[point]['description'];
            a.href = shadow[point]['url'];
            a.innerHTML = "...Read more";
            blogbox.style.paddingBottom = "10px";

            pic.append(img)
            blogauthor.append(author, date)
            blogimg.append(pic, blogauthor)
            blogimg.append()
            blogtext.append(h1, p);
            btext.append(blogtext, a);
            blogbox.append(blogimg, btext)
            unit['display'].append(blogbox, unit['pages'])
        }
    }
}

function makepage(dispobject) {
    const limit = 5;
    let pages = dispobject['pages']
    let unit = dispobject['display']
    let folder = dispobject['folder']
    pages.id = 'pages';
    pages.classList.add('pages')
    pages.innerHTML = '';
    
    let pagetotal = Math.ceil(folder.length / limit);
    for (let i = 1; i <= pagetotal; i++){
        let page = document.createElement('div')
        page.innerHTML = i;
        page.classList.add('number')
        if (i == 1){
            page.classList.add('active')
        }
        page.addEventListener('click', function(){
            let preselected = unit.querySelector('.active')
            if (preselected){
                preselected.classList.remove('active')
            }
            // Sequence d=5        
            currentpage = (5 * i) - 4;
            unit.innerHTML="";
            page.classList.add('active')
            displaylist(currentpage, dispobject);
        });
        pages.appendChild(page)
    }
}
function makeprep(values, section, isSectionable, dispobject) {
    makearray(values, section, isSectionable, dispobject['folder']);
    makepage(dispobject);
    displaylist(1, dispobject);
}
function changetype(shadow, section) {
    makeprep(shadow, section, true, category)
}

function calltopage(values) {
    shadow = values
    makeprep(shadow, 'Arts', true, category);
    makeprep(shadow, '', false, RR);

}
