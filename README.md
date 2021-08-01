# Markdown parser

A markdown parser which returns a plain, language-agnostic syntax tree.

## Usage

```ts
const markdown = `*JavaScript*, often abbreviated as **JS**, is a ***programming language*** that conforms to the [ECMAScript specification](https://en.wikipedia.org/wiki/ECMAScript). Reference: [*Wikipedia*](https://en.wikipedia.org/wiki/JavaScript)`;

const parsed = parseMarkdown(markdown);
```

The parsed result is a flattened array of object:

```ts
const parsed: ParsedTextList = [
    {
        content: 'JavaScript',
        classNames: [ClassName.EMPHASIS],
        url: undefined,
    },
    {
        content: ', often abbreviated as ',
        classNames: [],
        url: undefined,
    },
    {
        content: 'JS',
        classNames: [ClassName.STRONG],
        url: undefined,
    },
    {
        content: ', is a ',
        classNames: [],
        url: undefined,
    },
    {
        content: 'programming language',
        classNames: [ClassName.EMPHASIS, ClassName.STRONG],
        url: undefined,
    },
    {
        content: ' that conforms to the ',
        classNames: [],
        url: undefined,
    },
    {
        content: 'ECMAScript specification',
        classNames: [ClassName.URL],
        url: 'https://en.wikipedia.org/wiki/ECMAScript',
    },
    {
        content: '. Reference: ',
        classNames: [],
        url: undefined,
    },
    {
        content: 'Wikipedia',
        classNames: [ClassName.EMPHASIS, ClassName.URL],
        url: 'https://en.wikipedia.org/wiki/JavaScript',
    },
];
```

You can wrote a simple mapping function to map the parsed result to the format you want, e.g. to HTML:

```ts
import { parseMarkdown } from 'markdown-parser';

export const mapMarkdownToHTMLElement = (markdown: string) => {
    const parsed = parseMarkdown(markdown);

    const p = document.createElement('p');

    parsed.forEach(parsedText => {
        const elementName = typeof parsedText.url === 'string' && parsedText.url.length > 0 ? 'a' : 'span';
        const element = document.createElement(elementName);

        element.innerText = parsedText.content as string;
        if (elementName === 'a') {
            element.setAttribute('href', parsedText.url || '');
        }

        if (Array.isArray(parsedText.classNames)) {
            element.classList.add(...parsedText.classNames);
        }

        p.append(element);
    });

    return p;
};

const markdownElement = mapMarkdownToHTMLElement(text);

document.body.append(markdownElement);
```
