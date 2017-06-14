console.log('JS Loaded');


// Cache the window and the DOM elements
const $window = $(window);
const $header = $('header');
const $links = $('nav a');
const $dropdown = $('.dropdown');
const $menu = $('.menu');

function updateHeader() {
  // Grab the height of the window (the height of the hero image)
  const viewportHeight = $window.height();
  // Grab the value of how far down the user has scrolled
  const scrollTop = $window.scrollTop();

  // Check if we need to add or remove the 'translucent' class to the header
  if(scrollTop >= viewportHeight - $header.height()) {
    $header.addClass('translucent');
  } else {
    $header.removeClass('translucent');
  }
}

function scrollToSection() {
  // Grab the 'href' from the link that has just been clicked
  const section = $(this).attr('href');

  // Use jQuery animate to scroll the body to the correct section
  // 1000 is the number of milliseonds it should take to complete the animation
  $('body').animate({
    scrollTop: $(section).offset().top - 40
  }, 1000, () => {
    // If the window with is less than 575px, slide the dropdown links back up
    if ($window.width() < 575) {
      $dropdown.slideToggle();
    }
  });
}

function toggleMenu() {
  // Hide the menu if it's visible, show it if it's hidden
  $dropdown.slideToggle();
}

function displayLinks() {
  // If the window width is greater than or equal to 575px show the links
  // This is needed if the links have been hidden on a smaller screen, and then the window is resized
  if ($window.width() >= 575) {
    $dropdown.show();
  }
}

// Event listeners
$window.on('scroll', updateHeader).trigger('scroll');
$window.on('resize', displayLinks);
$links.on('click', scrollToSection);
$menu.on('click', toggleMenu);
