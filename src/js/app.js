
$(() => {

  // Cache the window and the DOM elements
  const $window = $(window);
  const $dropdown = $('.dropdown');
  const $menu = $('.menu');

  function toggleMenu() {
    // Hide the menu if it's visible, show it if it's hidden
    $dropdown.slideToggle();
  }

  function displayLinks() {
    // If the window width is greater than or equal to 575px show the links
    // This is needed if the links have been hidden on a smaller screen, and then the window is resized
    if ($window.width() >= 760) {
      $dropdown.show();
    }
  }

  // Event listeners
  $window.on('resize', displayLinks);
  $menu.on('click', toggleMenu);

});
