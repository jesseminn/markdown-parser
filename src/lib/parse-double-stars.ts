import { ClassName, ParsedTextList, TextContent } from './types';

export const parseDoubleStars = (input: TextContent): ParsedTextList => {
    const DOUBLE_STAR_PATTERN = /\*{2}(\S+|\S.*\S)\*{2}/gm;

    if (typeof input === 'string') {
        let execInput = input;
        let execResult = DOUBLE_STAR_PATTERN.exec(execInput);
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
                classNames: [ClassName.STRONG],
            });
            DOUBLE_STAR_PATTERN.lastIndex = 0;
            execResult = DOUBLE_STAR_PATTERN.exec(execInput);
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
                content: parseDoubleStars(itr.content),
            };
        });
    } else {
        return [];
    }
};
