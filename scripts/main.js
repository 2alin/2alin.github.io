var myImage = document.querySelector('img');

myImage.onclick = function(){
  var mySrc = myImage.getAttribute('src');
  if(mySrc === 'images/ice-cream.jpg'){
    myImage.setAttribute('src','images/ice-cream-2.jpg');
  } else{
    myImage.setAttribute('src','images/ice-cream.jpg');
  }
}