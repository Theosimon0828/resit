
import {renderSearch} from "./renderSearch.js";

const container = document.querySelector(".container");
const search = document.querySelector("input");
const logoutBut  = document.getElementsByClassName("logedInNavs")[0];
const logintBut = document.getElementsByClassName("logedOutNavs")[0];
const saved_token = localStorage.getItem('token');

async function callPosts(){

    // GET SAVED TOKEN

   
    if(saved_token != null) {
        logintBut.style.display = "none";
    }else {
        logoutBut.style.display = "none";
    }

    const url = "https://semproj2.theosim.com/wp-json/wp/v2/posts";
    const res = await fetch(url);    
    const json = await res.json();

    container.innerHTML="";
       for(let i=0; i<json.length; i++)

       {
            if( saved_token != null ){
                //SHOW BUTTONS IF LOGGED IN
                const html = `

                    <div class="card">
                    <div class="card-header">${json[i].title.rendered}</div>
                    <div class="card-body">
                    <p class="card-text">${json[i].content.rendered}</p>
                    
                    <a onclick='editPostRedirect(${json[i].id});' class="btn btn-primary">Edit</a>
                    <a onclick='deletePost(${json[i].id});' class="btn btn-primary">Delete</a>
                
                    </div>
                    </div>


                `
                container.innerHTML += html;  
            }else{
            
                const html = `

                <div class="card">
                <div class="card-header">${json[i].title.rendered}</div>
                <div class="card-body">
                <p class="card-text">${json[i].content.rendered}</p>
                
          
            
                </div>
                </div>


                `
                container.innerHTML += html;  
            }
            
        
        }


        search.addEventListener("click", inputTitle);

        function inputTitle(){   
     
        search.onkeyup = function(event){

        const searchInput = event.target.value.trim().toLowerCase();
   
        const filteredSearch = json.filter(function(search){

        if (search.title.rendered.toLowerCase().startsWith(searchInput)){
            return true;
        }
            });
        container.innerHTML ="";

    // refreshes the HTML after the filter
        renderSearch(filteredSearch);
            };
     }
}
window.logout = function logout() {
    console.log("logout");
    localStorage.clear();
    window.location.replace("http://localhost:8000/index.html");
}

window.addPost = function addPost() {

    const title = document.getElementById('title').value
    const content = document.getElementById('content').value

    $.ajax({
        url: "https://semproj2.theosim.com/wp-json/wp/v2/posts",
        type: "POST",
        headers: { "Authorization": 'Bearer ' + saved_token },
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            "title": title,
            "content": content,
            "status": "publish",
        }),
        error: function(err) {
            alert('failed to add a post');
        },
        success: function(data) {
          window.location.replace("http://localhost:8000/index.html");
        }
      });

}

window.deletePost = function deletePost(id) {
    console.log('delete');

    const url_string = "https://semproj2.theosim.com/wp-json/wp/v2/posts/" + id
    console.log(url_string);
    console.log(id);
    $.ajax({
        url: url_string,
        type: "delete",
        headers: { "Authorization": 'Bearer ' + saved_token },
        contentType: "application/json",
        error: function(err) {
            alert("error not deleted");
        },
        success: function(data) {
          window.location.replace("http://localhost:8000/index.html");
        }
      });
}
window.editPostRedirect = function editPostRedirect(id) {
    console.log('Edit Post');

      localStorage.setItem('editId', id);
      window.location.replace("http://localhost:8000/editpost.html");
 
} 

window.editPost = function editPost() {
    console.log('Edit Post');

    const editId = localStorage.getItem('editId');
 
    const title = document.getElementById('title').value
    const content = document.getElementById('content').value

  
    $.ajax({
        url: "https://semproj2.theosim.com/wp-json/wp/v2/posts/" + editId,
        type: "PUT",
        headers: { "Authorization": 'Bearer ' + saved_token },
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            "title": title,
            "content": content,
            "status": "publish",
        }),
        error: function(err) {
            alert('post not edited');
        },
        success: function(data) {
          console.log("Success!");
          window.location.replace("http://localhost:8000/index.html");
        }
      });

} 

callPosts();

