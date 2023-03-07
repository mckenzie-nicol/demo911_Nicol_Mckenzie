function displayHikeInformation(){
    //reteive the documnet id from the url
    console.log("inside")
    let params = new URL(window.location.href) 
    let ID = params.searchParams.get("docID");
    console.log(ID)

    db.collection("hikes").doc(ID).get().then( thisHike =>{
        hikeInfo = thisHike.data();
        hikeCode = hikeInfo.code;
        hikeName = hikeInfo.name;


        document.getElementById("hikeName").innerHTML=hikeName;
        let imgEvent = document.querySelector(".hike-img");
        imgEvent.src = "../images/" + hikeCode + ".jpg";
    }

    )

}   

displayHikeInformation();

function saveHikeDocumentIDAndRedirect() {
    let params = new URL(window.location.href) 
    let ID = params.searchParams.get("docID");
    localStorage.setItem("hikeID", ID);
    window.location.href = "review.html";
}

function populateReviews() {
    let hikeCardTemplate = document.getElementById("reviewCardTemplate");
    let hikeCardGroup = document.getElementById("reviewCardGroup");

    //let params = new URL(window.location.href) //get the url from the searbar
    //let hikeID = params.searchParams.get("docID");
    var hikeID = localStorage.getItem("hikeID");

    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection("reviews").where("hikeID", "==", hikeID).get()
        .then(allReviews => {
            reviews = allReviews.docs;
            console.log(reviews);
            reviews.forEach(doc => {
                var title = doc.data().title; //gets the name field
                var level = doc.data().level; //gets the unique ID field
                var season = doc.data().season;
                var description = doc.data().description; //gets the length field
                var flooded = doc.data().flooded;
                var scrambled = doc.data().scrambled;
                var time = doc.data().timestamp.toDate();
                console.log(time)

                let reviewCard = hikeCardTemplate.content.cloneNode(true);
                reviewCard.querySelector('.title').innerHTML = title;     //equiv getElementByClassName
                reviewCard.querySelector('.time').innerHTML = new Date(time).toLocaleString();    //equiv getElementByClassName
                reviewCard.querySelector('.level').innerHTML = `level: ${level}`;
                reviewCard.querySelector('.season').innerHTML = `season: ${season}`;
                reviewCard.querySelector('.scrambled').innerHTML = `scrambled: ${scrambled}`;  //equiv getElementByClassName
                reviewCard.querySelector('.flooded').innerHTML = `flooded: ${flooded}`;  //equiv getElementByClassName
                reviewCard.querySelector('.description').innerHTML = `Description: ${description}`;
                hikeCardGroup.appendChild(reviewCard);
            })
        })
}
populateReviews();