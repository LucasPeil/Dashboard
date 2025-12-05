export const addCoverEffect = (elementId) => {
  const container = document.getElementById(elementId);
  container.classList.add("coverEffect");
};

export const removeCoverEffect = (elementId) => {
  const container = document.getElementById(elementId);
  container.classList.remove("coverEffect");
};
