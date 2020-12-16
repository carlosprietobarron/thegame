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

  const createButtonFsy = (text, parentId, id) => {
    const parent = element(parentId);
    const thisbtn = document.createElement('button');
    thisbtn.setAttribute('id', id);
    thisbtn.setAttribute('class', 'fantasy');
    const span1 = document.createElement('span');
    span1.setAttribute('class', 'double');
    const span2 = document.createElement('span');
    span2.textContent = text;
    span2.setAttribute('class', 'text');
    span1.appendChild(span2);
    thisbtn.appendChild(span1);
    parent.appendChild(thisbtn);
    return thisbtn;
  };

  return {
    deleteEleContent, setAttributes, eventFire, element, dismissComponent, showComponent, createButtonFsy,
  };
}());

export { domUtils };
