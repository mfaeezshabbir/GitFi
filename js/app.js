//https://api.github.com/users/user_name/repos
//

const user_img = document.querySelector(".user_img");
const userName = document.querySelector(".user_name h1");
const followers_ = document.querySelector(".followers_ span");
const follow_ = document.querySelector(".follow_ span");
const repo_details = document.querySelector(".repo_details");
const btn_submit = document.querySelector(".btn_submit");


let user_name = '';

//when user writer user name in text box
function inputFunction() {
    let input_user = document.querySelector(".input_user").value.trim();
    //trim method will replace before and after white space of given calue

    if (input_user.length <= 0) {
        alert("Please enter github user name");
        document.querySelector(".input_user").value = "";
        document.querySelector(".input_user").focus();
        return false;
    } else {
        user_name = input_user.split("").join("");
        //if everything is ok run fetch user funciton
        fetchUser(); // this funciton is not made yet

        //clear the input box and focused it for next
        document.querySelector(".input_user").value = "";
        document.querySelector(".input_user").focus();
    }
};

btn_submit.addEventListener("click", function () {
    inputFunction()
});

// if user press enter it should be submit 
document.querySelector(".input_user").addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
        //alert("you have pressed enter key");
        inputFunction()
    }
})

//fetching user from github api
function fetchUser() {
    fetch(`https://api.github.com/users/${user_name}`)
        .then(response => response.json())
        .then(function (data) {
            //I not testing live because unregistered user can hit data only 60 time per hour
            console.log(data);
            if (data.message === "Not Found") {
                alert("No user found by this username");
                return false;
            } else {
                user_img.innerHTML = `<img src="${data.avatar_url}">`;
                userName.innerHTML = data.login;
				user_img.onclick = ()=>{window.open(`https://github.com/${Username.value}`, '_blank').focus();}
                followers_.innerHTML = data.followers;
                follow_.innerHTML = data.following;

            }
        })

    //fetching repo
    fetch(`https://api.github.com/users/${user_name}/repos`)
        .then(response => response.json())
        .then(function (repo_data) {
            console.log(repo_data);
            //if user type random name which is user but not have repository
            if (repo_data.length <= 0) {
                repo_details.innerHTML = `
                
                <div class="item_">
                    <div class="repo_name">No Repo Found</div>                
                </div>
                
                `
            } else {
                //when you type random user name if user and repo both not found
                if (repo_data.message === "Not Found") {
                    repo_details.innerHTML = `
                    <div class="item_">
                        <div class="repo_name">Null</div>
                        <div class="repo_details_">
                            <div class="info_ star">
                                <i class="fa fa-star-o"></i>-
                            </div>
                            <div class="info_ fork">
                                <p><i class="fa fa-code-fork"></i>--</p>
                            </div>
                            <div class="info_ size">
                                <p><i class="fa fa-file"></i>---</p>
                            </div>
                        </div>
                    </div>                
                    `
                    user_img.innerHTML = `<img src="images/github_logo.png">`;
                    userName.innerHTML = `Null`;
                    followers_.innerHTML = "Null";
                    follow_.innerHTML = "Null";
                } else {
                    let repo_Data = repo_data.map(item => {
                        console.log(item);
                        return (
                            `
                            <div class="item_">
                                <div class="repo_name">${item.name}</div>
                                <div class="repo_details_">
                                    <div class="info_ star">
                                        <i class="fa fa-star-o"></i>
                                        ${item.watchers}
                                    </div>
                                    <div class="info_ fork">
                                        <p><i class="fa fa-code-fork"></i>
                                        ${item.forks}
                                        </p>
                                    </div>
                                    <div class="info_ size">
                                        <p><i class="fa fa-file"></i>
                                        ${item.size}kb
                                        </p>
                                    </div>
                                </div>
                            </div> 
                            `
                        );
                    })
               
                    repo_details.innerHTML = repo_Data.slice(0, 8).join("");

                }
            }

        });
}