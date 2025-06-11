export const scrollToTop = () => {
  window.requestAnimationFrame(() => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
  });
};
