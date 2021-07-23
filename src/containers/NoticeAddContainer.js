import React, { useState } from 'react';
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "../styles/mdeStyle.css";

/* const loadSuggestions = (text) => new Promise((accept) => {
    setTimeout(() => {
      const suggestions = [
        {
          preview: "Andre",
          value: "@andre"
        },
        {
          preview: "Angela",
          value: "@angela"
        },
        {
          preview: "David",
          value: "@david"
        },
        {
          preview: "Louise",
          value: "@louise"
        }
      ].filter((i) => i.preview.toLowerCase().includes(text.toLowerCase()));
      accept(suggestions);
    }, 250);
  }); */

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const NoticeAddContainer = () => {
  const [value, setValue] = useState("**Hello world!!!**");
  const [selectedTab, setSelectedTab] = useState("write");

  return (
    <div className="container">
      <ReactMde
        value={value}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        // loadSuggestions={loadSuggestions}
        childProps={{
          writeButton: {
            tabIndex: -1
          }
        }}
      />
    </div>
  );
}

export default NoticeAddContainer;

