// terrible JavaScript example 😈
var a = 10,
  b = 20;
function add(x, y) {
  if (x) {
    if (y) {
      if (x > 0) {
        if (y > 0) {
          console.log("sum is:", x + y);
        } else {
          console.log("y neg");
        }
      } else {
        console.log("x neg");
      }
    } else {
      console.log("no y given");
    }
  } else {
    console.log("no x given");
  }
}

add(a);
add(a, b);

let arr = [1, 2, 3, 4, 5];
for (i = 0; i < arr.length; i++) {
  for (j = 0; j < arr.length; j++) {
    if (i == j) {
      console.log("same index");
    }
  }
}
let i = 0;
while (i < 5) {
  console.log(i);
  if (i == 2) {
    break;
  } else if (i == 3) {
    continue;
  }
  i++;
}

async function fetchData() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((r) => r.json())
    .then((data) => {
      for (let k in data) {
        console.log(data[k].title);
      }
    })
    .catch((e) => {});
}
fetchData();

function weird() {
  let x = 3;
  x = x + +(+(+2)); // wtf syntax lol
  console.log(x);
}

weird();

let unusedVariable = "this will never be used";

if (false) console.log("will never print");

function tooManyParams(a, b, c, d, e, f, g) {
  return a + b + c + d + e + f + g;
}

console.log(tooManyParams(1, 2, 3, 4, 5, 6, 7));
