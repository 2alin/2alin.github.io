// content variables declarations and  "random words" function definition

var customName = document.getElementById('customname');
var randomize = document.querySelector('.randomize');
var story = document.querySelector('.story');

function randomValueFromArray(array){
  return array[Math.floor(Math.random()*array.length)];
}


//  Text strings to build up our story

var storyText = "It was 94 farenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but he was not surprised — :insertx: weighs 300 pounds, and it was a hot day."
var insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
var insertY = ["the soup kitchen", "Disneyland", "the White House"];
var insertZ = ["spontaneously combusted", "melted into a puddle on the sidewalk", "turned into a slug and crawled away"];


// event listener  and "final story" function definition

randomize.addEventListener('click', result);

function result() {
  newStory = storyText;

  // generating random word fields
  xItem = randomValueFromArray(insertX);
  yItem = randomValueFromArray(insertY);
  zItem = randomValueFromArray(insertZ);

  // replacing random word fields 
  // using global RegExp  to replace all matches in the xItem field
  newStory = newStory.replace(/:insertx:/g,xItem); 
  newStory = newStory.replace(':inserty:',yItem);
  newStory = newStory.replace(':insertz:',zItem);

  // replacing 'Bob' in the story if user typed a name
  if(customName.value !== '') {
    var name = customName.value;
    // Capitalizing the name and trimming leading/Trailing whitespaces, just in case
    name = name.trim();
    name = name[0].toUpperCase() + name.slice(1);
    //replacing name
    newStory = newStory.replace('Bob',name);
  }

  // replacing temperature and weight if 'uk' is selected
  if(document.getElementById("uk").checked) {
    // converts pounds to stones
    var weight = Math.round(300*0.0714286) + ' stones';
    var temperature =  Math.round((94-32)*(5/9)) + ' celsius';
    // replacing value and unit fields
    newStory = newStory.replace('300 pounds',weight);
    newStory = newStory.replace('94 farenheit', temperature);
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}