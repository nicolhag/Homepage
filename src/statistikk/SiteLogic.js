var mean;
var variance, estVariance;

var currNr;

var input = [document.getElementById("input1"), document.getElementById("input2")];

input[0].onkeyup = function(e){
    currNr = 0;
    update( makeArray(0));
};

input[1].onkeyup = function(e){
    currNr = 1;
    update(makeArray(1));
};

function update(numbersList){
    clearLst();
    addSum(numbersList);

    addLine(''); addLine("MÅL PÅ SENTRALTENDENS");
    addMean(numbersList);
    addMedian(numbersList);
    addMode(numbersList);

    addLine(''); addLine("MÅL PÅ SPREDNING");
    addRange(numbersList);
    addVariance(numbersList);
    addStdDeviation(numbersList);

    addLine(''); addLine("KORRELASJON");
    addCorrelation( makeArray(0), makeArray(1));
}

function makeArray(boxNr) {
    var numbers = input[boxNr].value.trim().split(" ");

    var i;
    for(i=0; i < numbers.length; i++) {
        numbers[i] = numbers[i].replace(/,/g, '.');
    }

    return numbers;
}

function clearLst(){
    var myNode = document.getElementById("info_liste"+currNr);
    myNode.innerHTML = '';
}

function addSum(array){
    var sum = 0;
    var i;
    for (i = 0; i < array.length; i++) {
        sum += parseFloat(array[i]);
    }
    sum = sum.toFixed(1);
    addElement('Sum: ', sum);
}

function addMedian(values) {


    values.sort( function(a,b) {return a - b;} );

    var half = Math.floor(values.length/2);

    var median;
    if(values.length % 2)
        median = parseFloat(values[half]);
    else
        median = (parseFloat(values[half-1]) + parseFloat(values[half])) / 2.0;

    addElement('Median: ', median);

}


function addMode(array)
{
    if(array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
        var el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }


    addElement('Typetall: ', maxEl);
}

function addMean(array){
    var sum = 0;
    var i;
    for (i = 0; i < array.length; i++) {
        sum += parseFloat(array[i]);
    }
    mean = (sum/array.length).toFixed(3);
    addElement('Gjennomsnitt: ', mean );
}


function addRange(arr){
    var i;
    var min = arr[0];
    var max = arr[0];

    for (i = 0; i < arr.length ; i++){
        console.log('max: ' + max);
        console.log('min: ' + min);
        console.log('arr.length: ' + arr.length);
        if (parseFloat(arr[i]) < min){
            min = arr[i];
        }
        if (parseFloat(arr[i]) > max){
            max = arr[i];
        }
    }
    var range = max-min;
    addElement('Range: ', range.toFixed(3));
}


function addVariance(array){

    var variansDelSum = 0.0;
    var i;
    for (i = 0; i<array.length; i++){
        var delSum = parseFloat(array[i]) - mean;
        variansDelSum += (delSum*delSum);
    }
    variance = (variansDelSum / array.length).toFixed(3);
    estVariance = (variansDelSum / (array.length-1)).toFixed(3);

    addElement('Varians: ', variance);
    addElement('Varians (estimert): ', estVariance);
}

function addStdDeviation(array){
    addElement('Standardavvik: ', Math.sqrt(variance).toFixed(3));
    addElement('Standardavvik (estimert): ', Math.sqrt(estVariance).toFixed(3));
}

function addElement(text, nr){
    var para = document.createElement("li");
    if (isNaN(nr)) nr = "-";
    var node = document.createTextNode(text + nr);
    para.appendChild(node);

    var element = document.getElementById("info_liste" + currNr);
    element.appendChild(para);
}

function addLine(text){
    var para = document.createElement("li");
    var node = document.createTextNode(text);
    para.appendChild(node);
    var element = document.getElementById("info_liste" + currNr);
    element.appendChild(para);
}


function addCorrelation(x, y){

    if(x.length != y.length) {
        addElement('Korrelasjon (Pearsons r) mellom datasett: ', '');
        return;
    }

    var xSquared = squaredSum(x);
    var ySquared = squaredSum(y);
    var sumOfXY = summateXTimesY(x, y);

    var xSum = sum(x);
    var ySum = sum(y);

    var pearsonsR = (sumOfXY - ( (xSum * ySum) / x.length )) / Math.sqrt( (xSquared - (xSum*xSum / x.length)) * (ySquared - (ySum*ySum / x.length))  );

    addElement('Korrelasjon (Pearsons r) mellom datasett: ', pearsonsR.toFixed(3));
}

function sum(arr){
    var i;
    var sum = 0;

    for (i = 0; i < arr.length; i++){
        sum += parseFloat(arr[i]);
    }
    return sum;
}

function squaredSum(arr1){

    var i;
    var sum = 0;
    for (i = 0; i < arr1.length; i++){
        sum += parseFloat(arr1[i]) * parseFloat(arr1[i]);
    }
    return sum;
}

function summateXTimesY(arr1, arr2){
    var i;
    var sum = 0;
    for (i = 0; i < arr1.length; i++){
        sum += parseFloat(arr1[i]) * parseFloat(arr2[i])
    }
    return sum;
}


(function() {
    currNr = 0;
    update(makeArray(0));
    currNr = 1;
    update(makeArray(1));

})();