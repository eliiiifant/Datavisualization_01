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
  createCanvas(windowWidth, 2600);
  noStroke();
  print_links();

  print(table.getRowCount() + ' total rows in table');
  print(table.getColumnCount() + ' total columns in table');
  print('All cities:', table.getColumn('current_city'));

  for (let i = 0; i < table.getRowCount(); i++) {
    const city = table.get(i, 'current_city');
    const meanNied = table.get(i, 'Annual_Precipitation');
    const meanTemp = table.get(i, 'Max_Temperature_of_Warmest_Month');
    
    position = i*200+windowHeight/4;
    durchmesser = convertDegreesToDurchmesser(meanNied);
    durchmesser2 = convertDegreesToDurchmesser2(meanTemp);

    drawNiederschlag(position);
    drawLabel(position, city, meanNied);

    drawTemp(position);
    drawTempLabel(position, city, meanTemp);
  }
}

function convertDegreesToDurchmesser(temp) {
  //size of the ellipse
  const durchmesser = map(temp, 0, 5, 5, 2);
  return durchmesser;
}

function convertDegreesToDurchmesser2(temp) {
  const durchmesser2 = map(temp, 0, 1, 5, 0);
  return durchmesser2;
}

function drawNiederschlag(pos) {
  blendMode(MULTIPLY);
  fill(82, 59, 255);
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

function drawTemp(pos) {
  blendMode(EXCLUSION);
  fill(255, 0, 68);
  ellipse(windowWidth/2, pos, durchmesser2);
  // circle (x, y, dia)
  textFont('Roboto Mono');
  textSize(1);
  textAlign(CENTER);
}

function drawTempLabel(pos, city, temp) {
  fill(0, 0, 0);
  const label = `${city} – ${temp}`;
  text(label, windowWidth/2, pos + 5);
}