console.log('Loading data...');

let table;

const xPosAxis1 = 200; // px
const xPosAxis2 = 200;

// https://p5js.org/reference/#/p5/loadTable
function preload() {
  table = loadTable('future_cities_data_truncated.csv', 'csv', 'header');
}

function print_links() {
  print("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");
}

function setup() {
  noStroke();
  createCanvas(windowWidth, 2600);
  print_links();

  // count the columns
  print(table.getRowCount() + ' total rows in table');
  print(table.getColumnCount() + ' total columns in table');
  print('All cities:', table.getColumn('current_city'));

  for (let i = 0; i < table.getRowCount(); i++) {
    const city = table.get(i, 'current_city');
    const meanTemp = table.get(i, 'Annual_Precipitation');
    const meanTempFuture = table.get(i, 'Max_Temperature_of_Warmest_Month');
    
    position = i*200+windowHeight/4;
    durchmesser = convertDegreesToDurchmesser(meanTemp);
    durchmesser2 = convertDegreesToDurchmesser2(meanTempFuture);

    drawNiederschlag(position);
    drawLabel(position, city, meanTemp);

    drawNiederschlagFuture(position);
    drawLabelFuture(position, city, meanTempFuture);
  }
}


function convertDegreesToDurchmesser(temp) {
  //size of the ellipse
  const durchmesser = map(temp, 0, 5, 5, 2);
  return durchmesser;
}

  function convertDegreesToDurchmesser2(temp) {
    //size of the ellipse
    const durchmesser2 = map(temp, 0, 1, 5, 0);
    return durchmesser2;
  }

function drawNiederschlag(pos) {
  blendMode(MULTIPLY);
  fill(76, 36, 255);
  ellipse(windowWidth/2, pos, durchmesser);
  // circle (x, y, dia)
  textFont('Roboto Mono');
  textSize(150);
  textAlign(CENTER)
}

function drawLabel(pos, city, temp) {
  fill(0, 0, 0);
  const label = `${city}–${temp}`;
  text(label, windowWidth/2, pos + 5);
}


function drawNiederschlagFuture(pos) {
  blendMode(DIFFERENCE);
  fill(255, 0, 68);
  ellipse(windowWidth/2, pos, durchmesser2);
  // circle (x, y, dia)
  textFont('Roboto Mono');
  textSize(1);
  textAlign(CENTER);
}

function drawLabelFuture(pos, city, temp) {
  fill(0, 0, 0);
  const label = `${city} – ${temp}`;
  text(label, windowWidth/2, pos + 5);
}