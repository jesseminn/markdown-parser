import { ParsedTextList, TextContent, ClassName } from './types';

export const parseTripleStars = (input: TextContent): ParsedTextList => {
    const TRIPPLE_STAR_PATTERN = /\*{3}(\S+|\S.*\S)\*{3}/gm;

    if (typeof input === 'string') {
        let execInput = input;
        let execResult = TRIPPLE_STAR_PATTERN.exec(execInput);
        const result: ParsedTextList = [];
        while (execResult) {
            const [fullMatch, innerText] = execResult;
            const [before, ...rest] = execInput.split(fullMatch);
            execInput = rest.join('');
            if (before.length > 0) {
                result.push({
                    content: before,
                });
            }
            result.push({
                content: innerText,
                classNames: [ClassName.EMPHASIS, ClassName.STRONG],
            });
            TRIPPLE_STAR_PATTERN.lastIndex = 0;
            execResult = TRIPPLE_STAR_PATTERN.exec(execInput);
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
        return input.map(itr => {
            return {
                ...itr,
                content: parseTripleStars(itr.content),
            };
        });
    } else {
        return [];
    }
};
