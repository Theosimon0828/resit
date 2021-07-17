export function renderSearch(render){
    const saved_token = localStorage.getItem('token');
    const post = document.querySelector(".posts");
    post.innerHTML = "";
    post.innerHTML =`<div class="posts"> <h1>Posts</h1></div>`


    render.forEach(function(json){
        console.log(json.title);
        if( saved_token != null ){
            //SHOW BUTTONS IF LOGGED IN
            const html =  
            `            
                        <div class="card">
                        <div class="card-header">${json.title.rendered}</div>
                        <div class="card-body">
                        <p class="card-text">${json.content.rendered}</p>
                        <a onclick='editPostRedirect(${json.id});' class="btn btn-primary">Edit</a>
                        <a onclick='deletePost(${json.id});' class="btn btn-primary">Delete</a>
                        </div>
                        </div>
            ` 
            post.innerHTML += html;
        }else{
            const html =  
            `            
                        <div class="card">
                        <div class="card-header">${json.title.rendered}</div>
                        <div class="card-body">
                        <p class="card-text">${json.content.rendered}</p>
                    
                        </div>
                        </div>
            ` 
            post.innerHTML += html;
        }

    }
    )}