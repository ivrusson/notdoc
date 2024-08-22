import Layout from "@/components/layout";
import Editor from "@/components/editor/advanced-editor";
import { ThemeToggle } from "@/components/theme-toggle";
import { Suspense, useEffect, useState } from "react";
import { JSONContent, useEditor } from "novel";

import { useQuery } from "react-query";
import { getFile } from "./services/api/files";

const defaultValue = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "This is an example for the editor",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 1,
      },
      content: [
        {
          type: "text",
          text: "H1",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "H2",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 3,
      },
      content: [
        {
          type: "text",
          text: "H3",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "text",
        },
      ],
    },
    {
      type: "bulletList",
      attrs: {
        tight: true,
      },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "new idea",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "idea",
                },
              ],
            },
          ],
        },
      ],
    },
    { type: "horizontalRule" },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "text",
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://public.blob.vercel-storage.com/pJrjXbdONOnAeZAZ/banner-2wQk82qTwyVgvlhTW21GIkWgqPGD2C.png",
        alt: "banner.png",
        title: "banner.png",
        width: null,
        height: null,
      },
    },
  ],
};

function App() {
  const [value, setValue] = useState<JSONContent>();
  console.log(value);

  const query = useQuery("file", () => getFile("1"));

  useEffect(() => {
    console.log(query.data);
  }, [query.data]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Editor initialValue={query.data} onChange={setValue} />
    </Suspense>
  );
}

export default App;
