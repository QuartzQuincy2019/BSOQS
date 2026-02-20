// 4 generate.js
const destination = document.getElementById("BlogSpace");
function generateCardHead(date, user, signname, role = "") {
    var today_mjd = dateToMJD(new Date());
    var cardHead = document.createElement("div");
    cardHead.classList.add("card_head");

    var avatar = document.createElement("img");
    avatar.src = "./data/users/avatars/" + user.codeName + ".png";
    avatar.alt = user.signName + "'s Avatar";
    avatar.title = user.signName;
    avatar.classList.add("avatar");
    var cardHeadInfo = document.createElement("div");
    cardHeadInfo.classList.add("card_head_info");

    var postDate = document.createElement("div");
    postDate.classList.add("post_date");
    let mjd = dateToMJD(date);
    let daydiff = today_mjd - mjd;
    let daydiffText = "";
    if (daydiff == 0) {
        daydiffText = "Today";
    } else if (daydiff == 1) {
        daydiffText = "Yesterday";
    } else {
        daydiffText = daydiff + " days ago";
    }
    postDate.title = daydiffText;
    postDate.textContent = date + " | " + mjd;

    var postUser = document.createElement("div");
    postUser.classList.add("post_user");
    postUser.textContent = signname;

    cardHeadInfo.appendChild(postDate);
    cardHeadInfo.appendChild(postUser);

    if (role) {
        var postRole = document.createElement("div");
        postRole.classList.add("post_role");
        postRole.textContent = role;
        cardHeadInfo.appendChild(postRole);
    }
    cardHead.appendChild(avatar);
    cardHead.appendChild(cardHeadInfo);
    return cardHead;
}

function generateOverview(blog) {
    var overviewArea = document.createElement("div");
    overviewArea.id = blog.id + "_overview";

    // -------------------------
    let p1 = document.createElement("p");
    let mjd = dateToMJD(blog.date);
    p1.innerHTML = "<strong>" + blog.date + "</strong>" + " | " + mjd;
    let today = dateToMJD(new Date());
    let daydiff = today - mjd;
    let daydiffText = "";
    if (daydiff == 0) {
        daydiffText = "Today";
    } else if (daydiff == 1) {
        daydiffText = "Yesterday";
    } else {
        daydiffText = daydiff + " days ago";
    }
    p1.innerHTML += " (" + daydiffText + ")";
    let p2 = document.createElement("div");
    p2.innerHTML += "By";
    blog.authors.forEach(authorInfo => {
        let p2i = document.createElement("img");
        p2i.classList.add("overViewAvatar");
        p2i.src = "./data/users/avatars/" + authorInfo.user.codeName + ".png";
        let p2a = document.createElement("span");
        p2a.innerHTML = authorInfo.user.signName;
        p2.append(p2i, p2a)
    });
    let p3 = generateTopicArea(blog);
    overviewArea.append(p1, p2, p3);
    return overviewArea;
}

function generateTopicArea(blog) {
    var topicArea = document.createElement("p");
    topicArea.classList.add("topicArea");
    for (var j = 0; j < blog.topics.length; j++) {
        let topic = document.createElement("span");
        topic.classList.add("topic");
        topic.innerHTML = blog.topics[j];
        topicArea.appendChild(topic);
    }
    return topicArea;
}

function generatePostBody(blog) {
    var bodyArea = document.createElement("div");
    bodyArea.id = blog.id + "_body";
    // header block
    var headerBlock = document.createElement("div");
    headerBlock.classList.add("header_block");
    for (var j = 0; j < blog.authors.length; j++) {
        headerBlock.appendChild(generateCardHead(blog.date, blog.authors[j].user, blog.authors[j].user.signName, blog.authors[j].role));
    }
    bodyArea.appendChild(headerBlock);
    bodyArea.appendChild(generateTopicArea(blog));
    bodyArea.appendChild(document.createElement("hr"));
    var totalInnerHTML = "";
    for (var k = 0; k < blog.contents.length; k++) {
        let text = parseMixed(blog.contents[k]);
        totalInnerHTML += text;
    }
    bodyArea.innerHTML += totalInnerHTML;
    return bodyArea;
}

function generateHeadTitle(blog) {
    let thisId = blog.id;
    var headTitle = document.createElement("h1");
    headTitle.classList.add("headTitle");
    headTitle.id = blog.id + "_h1";
    if (isLatestBlog(blog.id)) {
        headTitle.classList.add("latest");
    }
    headTitle.textContent = blog.title;
    headTitle.onclick = () => {
        togglePost(thisId);
    }
    return headTitle;
}

function generateFoldedPost(blog) {
    var card = document.createElement("div");
    card.id = blog.id + "_card";
    card.classList.add("card");
    card.innerHTML = "";
    card.appendChild(generateHeadTitle(blog));
    card.appendChild(generateOverview(blog));
    destination.appendChild(card);
}

for (var i = 0; i < blogs.length; i++) {
    generateFoldedPost(blogs[i]);
}
for (var i = 0; i < blogs.length; i++) {
    var h1 = document.getElementById(blogs[i].id + "_h1");
    h1.classList.add("folded");
}



unfoldPost(getLatestBlog().id);


document.querySelectorAll('.headTitle').forEach(el => {
    listenSticky(el,
        (el) => el.classList.add('is-sticky'),
        (el) => el.classList.remove('is-sticky')
    );
});