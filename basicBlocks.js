const basicBlocks = [
  {
    container: { type: "div", class: "listItem", id: "itemText" },
    image: { type: "img", class: "icon", src: "/assets/text.png" },
    divider: { type: "div", class: "listItemDivider" },
    title: { type: "h4", class: "listItemTitle", text: "Text" },
    para: {
      type: "p",
      class: "listItemPara",
      text: "Just start writing with plain text.",
    },
  },
  {
    container: { type: "div", class: "listItem", id: "itemH1" },
    image: { type: "img", class: "icon", src: "/assets/h1.png" },
    divider: { type: "div", class: "listItemDivider" },
    title: { type: "h4", class: "listItemTitle", text: "Heading 1" },
    para: {
      type: "p",
      class: "listItemPara",
      text: "Big section heading.",
    },
  },
  {
    container: { type: "div", class: "listItem", id: "itemH2" },
    image: { type: "img", class: "icon", src: "/assets/h2.png" },
    divider: { type: "div", class: "listItemDivider" },
    title: { type: "h4", class: "listItemTitle", text: "Heading 2" },
    para: {
      type: "p",
      class: "listItemPara",
      text: "Medium section heading.",
    },
  },
];

export default basicBlocks;
