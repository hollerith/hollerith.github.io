function render(chart){
  chart.$has = [...Data[chart._step].items.map(Item), ...[legend] ] ;
}

async function load(path){

  let response = await fetch(path); // order depends*
  let text = await response.text();
  let csv = ParseCSV(text); 

  csv.shift(0); // remove headings
  csv = csv.filter((row) => { return row[2] > MIN });

  let ids = [];
  let items = [];
  let id;
  
  for (let [key, name, value] of csv) {
    //console.log(`${key} = ${name} : ${value}`);
    if (key) {
        if (!ids.includes(key)) {
          ids.push(key);
          if (items.length) {
            Data.push({"id": id, "items": items })
            items = [];
          }
          id = key;
        }
        items.push({ "name": name, "total": value });
    }
  }
  Data.push({"id": id, "items": items });

  race();
}

async function race(){
  var legend = document.querySelector('#legend-text1');
  var chart = document.querySelector('#chart');
  if (chart && chart._step < Data.length-1) {
    chart._step++;
    legend.$has = [legendbox, legendtext()];
    chart.$update();
    setTimeout(race, RATE);
  }
}

const legendbox = {
  "$type": "rect",
  "id": "legend-background",
  "class": "legendbox",
  "x": "0",
  "y": "0",
  "width": "80",
  "height": "40"
}

const legendtext = () => {
  var chart = document.querySelector('#chart'); 
  if (chart) {
    var step = TOP + chart._step;
  } else {
    var step = "";
  }

  return {
    "$type": "text",
    "id": "legend-text1",
    "class": "legendtext",
    "x": "10",
    "y": "30",
    "$text": step
  }    
}

var legend = {
  "id": "legend",
  "$type": "g",
  "xmlns": "http://www.w3.org/2000/svg",
  "transform": "translate(750, 0)",
  "$has": [legendbox, legendtext()],
}

var Item = function(item, index){
  return {
    "$type": "g",
    "class": "bar",
    "$has": [
      {
        "$type": "rect",
        "width": `${Math.abs(item.total/DPI)}`,
        "height": `${FAT-1}`,
        "y": `${index*FAT}`
      },
      {
        "$type": "text",
        "x": `${Math.abs(item.total/DPI)+2}`,
        "y": `${(index*FAT)+(FAT/2)}`,
        "dy": ".35em",
        "$text": ` ${item.total} ${item.name}`
      }
    ]
  }
}

var header = {
  "$type": "header",
  "$has": [
    {
      "$type": "div",
      "class": "container",
      "$has": [
        {
          "$type": "a",
          "id": "a-title",
          "href": "/",
          "$has": [
            {
              "$type": "h1",
              "$text": "hollerith"
            }
          ]
        }
      ]
    }
  ]
}

var caption = {
  "id": "caption",
  "$type": "figcaption",
  "$text": CAP || "Not set"
}

var chart = {
  "id": "chart",
  "$type": "svg",
  "class": "chart",
  "width": "1024",
  "height": "700",
  "role": "img",
  "$has": [legend],
  "_step": -1,
  "$init": function(){
    load(URL);
  },
  "$update": function(){
    render(this);
  },
}

var root = {
  "id": "root",
  "$type": "div",
  "class": "container",
  "$has": [  
    {
      "$type": "figure",
      "$has": [ caption, chart ]  
    }
  ]
}

var body = {
  "$cell": true,
  "$has": [ header, root ]
}

