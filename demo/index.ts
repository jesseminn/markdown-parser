import { mapMarkdownToHTMLElement } from './src/map-markdown-to-html-element';

const text = `*JavaScript*, often abbreviated as **JS**, is a ***programming language*** that conforms to the [ECMAScript specification](https://en.wikipedia.org/wiki/ECMAScript). Reference: [*Wikipedia*](https://en.wikipedia.org/wiki/JavaScript)`;

const markdownElement = mapMarkdownToHTMLElement(text);

document.body.append(markdownElement);
