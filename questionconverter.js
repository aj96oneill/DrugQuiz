if(!JSON.parse(localStorage.getItem("drugData"))){
    console.log("I ran");
    let allData = [];
    let obj = {
        "number": 0,
        "generic": "",
        "brand": "",
        "indication": "",
        "therapeudic_class": "",
        "signatura": ""
    };
    let unfilteredData = [];
    fetch('questionsdata.txt')
    .then(response => response.text())
    .then(text => {
        unfilteredData = text.split("\r\n");
        filter();
    }).catch((err) => {
        console.error(err);
    });

    filter = () =>{
        unfilteredData.forEach(element => {
            let holder = element.split("\t");
            holderObj = Object.assign({}, obj);
            holderObj.number = holder[0];
            holderObj.generic = holder[1];
            holderObj.brand = holder[2];
            holderObj.indication = holder[3].replace(/["]+/g, '');
            holderObj.therapeudic_class = holder[4].replace(/["]+/g, '');
            holderObj.signatura = holder[5].replace(/["]+/g, '');
            allData.push(holderObj);
        });
        localStorage.setItem("drugData", JSON.stringify(allData));
        //console.log(allData);
    };
}
