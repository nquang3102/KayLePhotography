function zoomImage(Img)
{
  var picture = Img.src;
  console.log(picture);
  var zoomView = document.getElementsByClassName("zoom_wrapper")[0].children[1];
  zoomView.srcset = picture;
  document.getElementsByClassName("zoom_wrapper")[0].style.display = "flex";
}
function closeZoom()
{
  document.getElementsByClassName("zoom_wrapper")[0].style.display = "none";
}
var btn_scrollTop = document.getElementsByClassName("btn_scrollTop")[0];
window.onscroll = function() { showBtnScroll() };
function showBtnScroll() {
    if(document.documentElement.scrollTop > 20 || document.body.scrollTop > 20) { btn_scrollTop.style.display = "block"; }
    else { btn_scrollTop.style.display = "none"; }
};
function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};