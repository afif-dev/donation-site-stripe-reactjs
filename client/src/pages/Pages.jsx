import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
const Pages = (props) => {
  const [content, setContent] = useState("");
  const fetchPath = require(`${props.mdpath}`);

  useEffect(() => {
    fetch(fetchPath)
      .then((res) => res.text())
      .then((text) => setContent(text));
  }, [fetchPath]);

  return (
    <div className="prose prose-base dark:prose-invert max-w-full">
      <ReactMarkdown children={content} />
    </div>
  );
};

export default Pages;
