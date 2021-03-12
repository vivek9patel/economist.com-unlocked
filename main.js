let loadCustomPage = () => {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", window.location.href, true);

    xhr.onerror = function () {
        document.documentElement.innerHTML = "Error getting Page!";
    };

    xhr.send()

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.documentElement.innerHTML = "Removing the Subscription..."
            removeSubscription(this.responseText);
        }
        else if(this.readyState == 0){
            document.documentElement.innerHTML = "Initiating the Request..."
        }
        else if(this.readyState == 1){
            document.documentElement.innerHTML = "Establishing the Server..."
        }
        else if(this.readyState == 2){
            document.documentElement.innerHTML = "Request Recieved..."
        }
        else if(this.readyState == 3){
            document.documentElement.innerHTML = "Processing the Request..."
        }
        else{
            document.documentElement.innerHTML = "Error Finding the Page!"
        }
    };
}

let removeSubscription = (htmlContentStr)=>{
    let wrapper = document.createElement("DIV");
    wrapper.innerHTML = htmlContentStr;

    let paywalls = wrapper.querySelectorAll(".paywall");
    let subscriptions = wrapper.querySelectorAll(".subscription-benefits");

    paywalls.forEach((paywall) => {
        paywall.remove()
    })
    subscriptions.forEach((subscription) => {
        subscription.remove()
    })

    document.documentElement.innerHTML = "Removing the Ads..."
    removeAds(wrapper.innerHTML)
}

let removeAds = (htmlContentStr) => {
    let wrapper = document.createElement("DIV");
    wrapper.innerHTML = htmlContentStr;

    let adverts = wrapper.querySelectorAll(".advert");
    adverts.forEach((advert) => {
        advert.remove()
    })

    wrapper = addExtenCard(wrapper);

    putNewPage(wrapper)
}

let addExtenCard = (content)=>{
    let card = document.createElement("A");
    let desc = document.createElement("DIV");
    let author = document.createElement("DIV");
    let name = document.createElement("SPAN");

    card.classList.add("exten-card");
    desc.classList.add("exten-desc");
    author.classList.add("exten-auth");
    name.classList.add("exten-name");

    desc.innerHTML = window.location.href == "https://www.economist.com/" ? "Ads are Removed !!!" : "Page is Unlocked!!!";
    author.innerHTML = "By ";
    name.innerHTML = "vivek9patel";

    card.href = "https://www.linkedin.com/in/vivek9patel/";
    card.setAttribute("target", "_blank");

    author.appendChild(name);
    card.appendChild(desc);
    card.appendChild(author);

    content.appendChild(card);
    return content;
}

let putNewPage = (pageHtml) => document.documentElement.innerHTML = pageHtml.innerHTML;

window.stop();
loadCustomPage();