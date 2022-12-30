var slider = document.querySelector('.slide_container');
let isDown = false;
let startX;
let scrollLeft;

window.addEventListener("wheel", function (e) {
  if (e.deltaY > 0) slider.scrollLeft += 100;
  else slider.scrollLeft -= 100;
});
slider.addEventListener('mousedown', e => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', _ => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', _ => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const SCROLL_SPEED = 1;
  const walk = (x - startX) * SCROLL_SPEED;
  slider.scrollLeft = scrollLeft - walk;
  console.log(startX);
});

document.querySelectorAll('.slide_container').forEach((slide) => {

  var btnNext = document.getElementsByClassName("btn_next")[0];
  var btnPrev = document.getElementsByClassName("btn_prev")[0];
  var page = document.getElementsByClassName("slide_pagination")[0];
  const start_slide_flag = document.createElement('div');
  const end_slide_flag = document.createElement('div');
  const items = Array.from(slide.querySelectorAll('.slide_item'));

  
  page.innerHTML = 1 + " / " + items.length;

  slide.prepend(start_slide_flag);
  slide.append(end_slide_flag);

  //Know image is in computer view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.target === start_slide_flag) { btnPrev.disabled = entry.isIntersecting; }
      if(entry.target === end_slide_flag) { btnNext.disabled = entry.isIntersecting; }
    });
  });

  observer.observe(start_slide_flag);
  observer.observe(end_slide_flag);

  //Option for scroll
  const scrollTo = (items) => {
    let offset = getOffset(items);
    const left = document.dir === 'rtl' ? -offset : offset;
    const behavior = 'smooth';
    slide.scrollTo({left, behavior});
  };

  //Set view width
  const getOffset = ($el) => {
    let offset = $el.offsetLeft;
    if (document.dir === 'rtl') {
      offset = slide.offsetWidth - (offset + $el.offsetWidth);
    }
    return offset;
  };

  btnPrev.addEventListener('click', (ev) => {
    ev.preventDefault();
    let item = items[0];
    const scroll = Math.abs(slide.scrollLeft);
    items.forEach((i) => {
      const offset = getOffset(i);
      if (offset - scroll < -1 && offset > getOffset(item)) {
        item = i;
        page.innerHTML = item.children[0].getAttribute('name') + " / " + items.length;
      }
      else { page.innerHTML = item.children[0].getAttribute('name') + " / " + items.length; }
    });
    scrollTo(item);
  });

  btnNext.addEventListener('click', (ev) => {
    ev.preventDefault();
    let item = items[items.length - 1];
    const scroll = Math.abs(slide.scrollLeft);
    items.forEach((i) => {
      const offset = getOffset(i);
      if (offset - scroll > 1 && offset < getOffset(item)) {
        item = i;
        page.innerHTML = item.children[0].getAttribute('name') + " / " + items.length;
      }
      else { page.innerHTML = item.children[0].getAttribute('name') + " / " + items.length; }
    });
    scrollTo(item);
    console.log(item.children[0].getAttribute('name'));
  });
});