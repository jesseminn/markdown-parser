import { ClassName, ParsedTextList, TextContent } from './types';

export const parseSingleStar = (input: TextContent): ParsedTextList => {
    const SINGLE_STAR_PATTERN = /\*{1}(\S+|\S.*\S)\*{1}/gm;

    if (typeof input === 'string') {
        let execInput = input;
        let execResult = SINGLE_STAR_PATTERN.exec(execInput);
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
                classNames: [ClassName.EMPHASIS],
            });
            SINGLE_STAR_PATTERN.lastIndex = 0;
            execResult = SINGLE_STAR_PATTERN.exec(execInput);
        }
        if (result.length > 0) {
            // Append the lastest not-mathced text to the end
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
                content: parseSingleStar(itr.content),
            };
        });
    } else {
        return [];
    }
};
