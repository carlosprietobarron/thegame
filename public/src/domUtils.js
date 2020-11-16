const domUtils = (function du() {
  const deleteEleContent = (elementId) => {
    const tabContent = document.getElementById(elementId);
    while (tabContent.firstChild) {
      tabContent.firstChild.remove();
    }
    tabContent.innerHTML = '';
  };

  const setAttributes = (el, attrs) => {
    for (const key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  };

  const eventFire = (el) => {
    const element = document.getElementById(el);

    element.dispatchEvent(new Event('click'));
  };

  const element = (id) => {
    const el = document.getElementById(id);
    return el;
  };

  const dismissComponent = (id) => {
    const el = document.getElementById(id);
    el.hidden = true;
  };

  const showComponent = (id) => {
    const el = document.getElementById(id);
    el.hidden = false;
  };

  return {
    deleteEleContent, setAttributes, eventFire, element, dismissComponent, showComponent,
  };
}());

export { domUtils };
