export function setupLazyLoading(api) {
  // Old IE don't support this API
  if (!("IntersectionObserver" in window)) {
    return;
  }

  const options = {
    rootMargin: "50%"
  };

  let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      let img = entry.target;
      if (entry.isIntersecting) {
        let dataSrc = img.getAttribute("data-src");
        if (dataSrc) {
          img.setAttribute("src", img.getAttribute("data-src"));
          img.classList.remove("d-lazyload-hidden");
        }
        observer.unobserve(entry.target);
      } else {
        img.classList.add("d-lazyload");
        img.classList.add("d-lazyload-hidden");
        img.setAttribute("data-src", img.getAttribute("src"));
        img.setAttribute(
          "src",
          "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
        );
      }
    });
  }, options);

  api.decorateCooked($post => {
    $(".lightbox img", $post).each((_, $img) => observer.observe($img));
  });
}
