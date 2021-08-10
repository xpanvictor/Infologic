
// Fix Line 119 (// document.querySelector('#textField').innerHTML = '<%- (typeof(blog) === 'undefined' ? '' : blog.story) %>';)

const responsive = {
  1: {
    items: 1
  },
  480: {
    items: 2
  },
  760: {
    items: 3
  },
  960: {
    items: 4
  }
};
function ctalk(){
  talk.style.display="none";
}

$(document).ready(function(){

  $nav = $('.navv');
  $toggleCollapse = $('.toggle-collapse');
  $toggleicon = $('.fa-bars');

  // Click event
  $toggleCollapse.click(function(){
    $nav.toggleClass('collapse-bar');
    if (($toggleCollapse).find('svg').attr('data-icon') == 'bars') {
      ($toggleCollapse).find('svg').attr('data-icon', 'window-close');
    } else {
      ($toggleCollapse).find('svg').attr('data-icon', 'bars');
    }
  });
  
  // AOS instance
  $(function(){
    AOS.init();
  });
  $('#posts').on('load', function(){
    AOS.init();
  });
  //  --------------- Nav toggles____________
 // Click event for about
 $toggleAbout = $('.togabout');
 var about = document.getElementById("about");
   about.style.display="none";
 $toggleAbout.click(function(){
   if (about.style.display==="none"){
     about.style.display="block";
     talk.style.display="none";
     contact.style.display="none";
   }else{
     about.style.display="none";
   }
 })
 //click event for discussion
 $toggleTalk = $('.togtalk');
 var talk = document.getElementById("talk");
 talk.style.display="none";
  $toggleTalk.click(function(){
 if (talk.style.display==="none"){
   talk.style.display="block";
   about.style.display="none";
   contact.style.display="none";
 }else{
   talk.style.display="none";
 }
})

//  click event for contact
$toggleContact = $('.togcontact');
 var contact = document.getElementById("contact");
   contact.style.display="none";
 $toggleContact.click(function(){
   if (contact.style.display==="none"){
     contact.style.display="block";
     talk.style.display="none";
     about.style.display="none";
   }else{
     contact.style.display="none";
   }
 })
//  Scroll up
$('.go-up span').click(function(){
  $('html, body').animate({
    scrollTop: 0
  }, 1000);
})
// ______________Nav toggles ---------------
 // Finding out the source of horizontal scroll problem: solved
 var docWidth = document.documentElement.offsetWidth;
 [].forEach.call(
   document.querySelectorAll('*'),
   function(el){
     if (el.offsetWidth > docWidth){
       console.log(el);
     }
   }
 )

  // owl-carousel object
  $('.owl-carousel').owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    responsive: responsive
  });

});

var showingSourceCode = false;
var isInEditMode = true;
var textField = document.getElementById('textField');

//Pls Fix this asap !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
// document.querySelector('#textField').innerHTML = '<%- (typeof(blog) === 'undefined' ? '' : blog.story) %>';
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function sand(){
  document.querySelector(".sand").remove();
}
function enableEditMode() {
  textField.contentEditable = 'true';
}

function execCmd(command) {
  document.execCommand(command, false, null);
}

function execCommandWithArg(command, arg) {
  document.execCommand(command, false, arg);
}

function toggleSource() {
  if (showingSourceCode) {
    document.getElementById('textField').innerHTML =
      document.getElementById('textField').textContent;
    document.querySelector("#sub").disabled = false;
    showingSourceCode = false;
  } else {
    document.getElementById('textField').textContent =
      document.getElementById('textField').innerHTML;
    document.querySelector("#sub").disabled = true;
    showingSourceCode = true;
  }
}

//  The login/register transition functionality
    // Buttons definitions
    const regbtn = document.querySelector('#regbtn');
    const logbtn = document.querySelector('#logbtn');
    // Pages definitions
    const regpage = document.querySelector('#register');
    const logpage = document.querySelector('#login');
    // Events functions definitions
    function regopen(){
      logpage.classList.add('hide');
      regpage.classList.remove('hide');
      regbtn.classList.add('highlight');
      logbtn.classList.remove('highlight');
    }
    function logopen(){
      logpage.classList.remove('hide');
      regpage.classList.add('hide');
      logbtn.classList.add('highlight');
      regbtn.classList.remove('highlight');
    }
    // Events handlers
    regbtn.addEventListener('click', regopen);
    logbtn.addEventListener('click', logopen);
    
// End of functionality