import "quill/dist/quill.bubble.css";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import the styles

const toolbarOptions = {
  container: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
  mention: {
    allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
    mentionDenotationChars: ["@"],
    source: (searchTerm, renderList) => {
      const mentions = [
        { id: 1, value: "John Doe" },
        { id: 2, value: "Jane Doe" },
        { id: 3, value: "Jim Doe" },
        { id: 4, value: "Jimmy Doe" },
        { id: 5, value: "Joe Doe" },
      ];
      if (searchTerm.length === 0) {
        renderList(mentions, searchTerm);
      } else {
        const matches = mentions.filter((mention) =>
          mention.value.toLowerCase().includes(searchTerm.toLowerCase())
        );
        renderList(matches, searchTerm);
      }
    },
  },
  emoji: {
    toolbar: ["emojiMart"],
  },
  imageResize: {
    displaySize: true,
  },
  autoformat: {
    trigger: ":",
    whitelist: ["smile", "wink", "laugh", "sad", "angry", "cool"],
    allowSpaceAfterTrigger: true,
  },
};

const Content = (props) => {
  return (
    <ReactQuill
      value={props.value}
      onChange={props.onChange}
      theme={props.theme}
      modules={{
        toolbar: toolbarOptions,
      }}
    />
  );
};

export default Content;
