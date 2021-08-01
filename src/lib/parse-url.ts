import { ParsedTextList, TextContent, ClassName } from './types';

export const parseUrl = (input: TextContent): ParsedTextList => {
    // Match Markdown-style links, `[phrase](url)`
    const LINK_PATTERN = /\[(.+?)\]\((.+?)\)/gm;

    if (typeof input === 'string') {
        let execInput = input;
        let execResult = LINK_PATTERN.exec(execInput);
        const result: ParsedTextList = [];
        while (execResult) {
            const [fullMatch, linkText, linkUrl] = execResult;

            const [before, ...rest] = execInput.split(fullMatch);
            execInput = rest.join('');
            if (before.length > 0) {
                result.push({
                    content: before,
                });
            }
            result.push({
                content: linkText,
                classNames: [ClassName.URL],
                url: linkUrl,
            });
            LINK_PATTERN.lastIndex = 0; // Reset last matched index!
            execResult = LINK_PATTERN.exec(execInput);
        }
        if (result.length > 0) {
            if (execInput.length > 0) {
                result.push({
                    content: execInput,
                });
            }
            return result;
        } else {
            return [{ content: input }];
        }
    } else if (Array.isArray(input)) {
        // text is ParsedText[]
        return input.map(itr => {
            return {
                ...itr,
                content: parseUrl(itr.content),
            };
        });
    } else {
        return [];
    }
};
