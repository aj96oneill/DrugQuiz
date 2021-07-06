const p1 = document.getElementById('p1');
const p2 = document.getElementById('p2');
const p3 = document.getElementById('p3');
const first = document.getElementById('first');
const second = document.getElementById('second');
const third = document.getElementById('third');
const order = document.getElementById('order');
const shuffle = document.getElementById('shuffle');
const generic = document.getElementById('generic');
const brand = document.getElementById('brand');

const settings = JSON.parse(localStorage.getItem("settings")) || {
    "difficulty": "p1",
    "number": "first",
    "shuffled": false,
    "question": "generic" 
};

updateDificulty = (e) => {
    e.preventDefault();
    console.log("First way: " + e['path'][0]["id"]);
    console.log("Second: " + e.target);
    settings.difficulty = e['path'][0]["id"];
    localStorage.setItem("settings", JSON.stringify(settings));

    switch (e['path'][0]["id"]){
        case "p1" :
            p1.classList.add('selected');
            p2.classList.remove('selected');
            p3.classList.remove('selected');
            break;
        case "p2":
            p1.classList.remove('selected');
            p2.classList.add('selected');
            p3.classList.remove('selected');
            break;
        case "p3":
            p1.classList.remove('selected');
            p2.classList.remove('selected');
            p3.classList.add('selected');
            break;
    }
    
};
updateDrugNumber = (e) => {
    e.preventDefault();
    settings.number = e['path'][0]["id"];
    localStorage.setItem("settings", JSON.stringify(settings));

    switch (e['path'][0]["id"]){
        case "first" :
            first.classList.add('selected');
            second.classList.remove('selected');
            third.classList.remove('selected');
            break;
        case "second":
            first.classList.remove('selected');
            second.classList.add('selected');
            third.classList.remove('selected');
            break;
        case "third":
            first.classList.remove('selected');
            second.classList.remove('selected');
            third.classList.add('selected');
            break;
    }
};
updateOrder = (e) => {
    e.preventDefault();
    settings.shuffled = e['path'][0]["id"] == "order" ? false : true;
    localStorage.setItem("settings", JSON.stringify(settings));

    switch (e['path'][0]["id"]){
        case "order":
            order.classList.add('selected');
            shuffle.classList.remove('selected');
            break;
        case "shuffle":
            order.classList.remove('selected');
            shuffle.classList.add('selected');
            break;
    }

};
updateQuestion = (e) => {
    e.preventDefault();
    settings.question = e['path'][0]["id"];
    localStorage.setItem("settings", JSON.stringify(settings));

    switch (e['path'][0]["id"]){
        case "generic":
            generic.classList.add('selected');
            brand.classList.remove('selected');
            break;
        case "brand":
            generic.classList.remove('selected');
            brand.classList.add('selected');
            break;
    }
};

resetSettings = (e) => {
    e.preventDefault();
    if(confirm("Are you sure you want to reset your settings back to default?")){
        localStorage.setItem("settings", JSON.stringify({
            "difficulty": "p1",
            "number": "first",
            "shuffled": false,
            "question": "generic" 
        }));
        window.location.assign('/settings.html');
    };
};

switch (settings.difficulty){
    case "p1" :
        p1.classList.add('selected');
        p2.classList.remove('selected');
        p3.classList.remove('selected');
        break;
    case "p2":
        p1.classList.remove('selected');
        p2.classList.add('selected');
        p3.classList.remove('selected');
        break;
    case "p3":
        p1.classList.remove('selected');
        p2.classList.remove('selected');
        p3.classList.add('selected');
        break;
}
switch (settings.number){
    case "first" :
        first.classList.add('selected');
        second.classList.remove('selected');
        third.classList.remove('selected');
        break;
    case "second":
        first.classList.remove('selected');
        second.classList.add('selected');
        third.classList.remove('selected');
        break;
    case "third":
        first.classList.remove('selected');
        second.classList.remove('selected');
        third.classList.add('selected');
        break;
}

switch (settings.shuffled){
    case false:
        order.classList.add('selected');
        shuffle.classList.remove('selected');
        break;
    case true:
        order.classList.remove('selected');
        shuffle.classList.add('selected');
        break;
}

switch (settings.question){
    case "generic":
        generic.classList.add('selected');
        brand.classList.remove('selected');
        break;
    case "brand":
        generic.classList.remove('selected');
        brand.classList.add('selected');
        break;
}
