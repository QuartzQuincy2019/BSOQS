// 4 generate.js
const destination = document.getElementById("BlogSpace");
var currentPage = 1;

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
    postDate.classList.add("post_date", "agave");
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
    overviewArea.classList.add("overview");

    // -------------------------
    function generateEditionDateInfo(_date, showDecoratedDiff, startText = "") {
        let p1 = document.createElement("p");
        p1.classList.add("agave", "EditionDateInfo");
        let mjd = dateToMJD(_date);
        let bdText = "", ageText = "";
        if (_date.slice(-5) == '10-03') {
            bdText = " class='nebucoffee'";
            ageText = " (" + (Number(_date.slice(0, 4)) - 2007) + ")";
        };
        p1.innerHTML = startText + bdText + _date + ageText + " | " + mjd;
        let today = dateToMJD(new Date());
        let daydiff = today - mjd;
        let daydiffText = "";
        let classText = "";
        if (daydiff == 0) {
            daydiffText = "Today";
        } else if (daydiff == 1) {
            daydiffText = "Yesterday";
        } else {
            daydiffText = daydiff + " days ago";
        }
        if (daydiff <= 7) {
            classText = "nebucoffee";
        } else if (daydiff <= 30) {
            classText = "mooncoffee";
        } else {
            classText = "weak";
        }

        if (showDecoratedDiff) {
            p1.innerHTML += "&nbsp;<span class='DecoratedDiff " + classText + "'>(" + daydiffText + ")</span>";
        } else {
            p1.innerHTML += "&nbsp;<span class='DecoratedDiff weak'>(" + daydiffText + ")</span>";
        }
        return p1;
    }
    let p1 = generateEditionDateInfo(blog.date, true, "Published: ");
    overviewArea.appendChild(p1);
    if (blog.hasOwnProperty("edited") && blog.edited != "") {
        var pEdited = generateEditionDateInfo(blog.edited, false, "Last Edited: ");
        overviewArea.appendChild(pEdited);
    }
    //
    let p2 = document.createElement("div");
    p2.classList.add("OverviewAuthorsArea");
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
    overviewArea.append(p2, p3);
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

function topicInCatagory(topic) {
    for (const catagory of CATAGORIZED_TOPICS) {
        if (catagory.inclusion.includes(topic)) return catagory;
    }
    return false;
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
    var bodyHr1 = document.createElement("hr");
    bodyHr1.classList.add("body_hr1");
    var bodyHr2 = document.createElement("hr");
    bodyHr2.classList.add("body_hr2");
    bodyArea.append(bodyHr2, bodyHr1);
    var totalInnerHTML = "";
    var totalText = blog.contents.join(" ");
    totalInnerHTML += parseMixed(totalText);
    bodyArea.innerHTML += totalInnerHTML;
    bodyArea.innerHTML.replaceAll(/(\<tbody\>)|(\<\/tbody\>)/gm, "");
    return bodyArea;
}

function generateCardHeadTitle(blog, isFolded = true) {
    let thisId = blog.id;
    var headTitle = document.createElement("h1");
    headTitle.classList.add("CardHeadTitle");
    headTitle.id = blog.id + "_h1";
    var titleAnchor = document.createElement("a");
    titleAnchor.href = "#" + headTitle.id;
    titleAnchor.name = headTitle.id;
    headTitle.appendChild(titleAnchor);
    if (isLatestBlog(blog.id)) {
        headTitle.classList.add("latest");
    }
    if (isFolded) {
        headTitle.classList.add("folded");
    } else {
        headTitle.classList.add("unfolded");
    }
    titleAnchor.textContent = blog.title;
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
    card.appendChild(generateCardHeadTitle(blog));
    card.appendChild(generateOverview(blog));
    destination.appendChild(card);
}
