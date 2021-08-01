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
