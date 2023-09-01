/* import "./styles.css"; */
const line = [
    { weight: 100, floor: 6 },
    { weight: 300, floor: 2 },
    { weight: 80, floor: 2 },
    { weight: 100, floor: 5 },
    { weight: 120, floor: 3 },
    { weight: 160, floor: 4 },
    { weight: 120, floor: 6 },
    { weight: 250, floor: 2 },
    { weight: 180, floor: 5 },
    { weight: 120, floor: 4 }
  ];
  const maxpeople = 2;
  const maxWeights = 400;
  const nofofFloor = 6;
  
  function getNoOfTime(data, maxpeople, maxWeights, nofofFloor) {
    var noOfTime = 0;
    for (var i = 0; i < data.length; i++) {
      var j = i + 1;
      console.log(i);
      if (j < data.length && i < data.length) {
        console.log(data[i].weight, data[j].weight);
        var sum = data[i].weight + data[j].weight;
        console.log("sum", sum);
        if (sum <= maxWeights) {
          noOfTime = noOfTime + 1;
          i++;
        } else {
          console.log("else");
          noOfTime = noOfTime + 1;
          i = j - 1;
          j = i;
        }
      } else {
        noOfTime = noOfTime + 1;
      }
    }
    console.log("noOfTime", noOfTime);
  }
  
  getNoOfTime(line, maxpeople, maxWeights, nofofFloor);
  