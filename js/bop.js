// 2 bop.js
function getBlog(blogId) {
    for (const blog of blogs) {
        if (blog.id == blogId) return blog;
    }
}
function getLatestBlog() {
    var sorted = blogs.toSorted((a, b) => {
        let aDate = dateStringToMJD(a.date);
        let bDate = dateStringToMJD(b.date);
        return bDate - aDate;
    });
    return sorted[0];
}

function isLatestBlog(blogId) {
    var latestId = getLatestBlog().id;
    if (blogId === latestId) {
        return true;
    } else {
        return false;
    }
}

blogs.forEach(blog => {
    if (!blog.id) {
        blog.id = blog.date + blog.title;
    }
});

var displayStatus = {}
blogs.forEach(blog => {
    displayStatus[blog.id] = false;
});

/**
 * 折叠帖子
 * @param {string} id 
 */
function foldPost(id) {
    var card = document.getElementById(id + "_card");
    var h1 = document.getElementById(id + "_h1");
    var body = document.getElementById(id + "_body");
    card.removeChild(body);
    card.appendChild(generateOverview(getBlog(id)));
    h1.classList.remove("unfolded");
    h1.classList.add("folded");
    displayStatus[id] = false;
}

/**
 * 展开帖子
 * @param {string} id 
 */
function unfoldPost(id) {
    var card = document.getElementById(id + "_card");
    var h1 = document.getElementById(id + "_h1");
    var overview = document.getElementById(id + "_overview");
    card.removeChild(overview);
    card.appendChild(generatePostBody(getBlog(id)));
    h1.classList.remove("folded");
    h1.classList.add("unfolded");
    displayStatus[id] = true;
}

function togglePost(id) {
    if (displayStatus[id]) {
        foldPost(id);
        displayStatus[id] = false;
    } else {
        unfoldPost(id);
        displayStatus[id] = true;
    }
}