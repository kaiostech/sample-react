export const getNumberAttributeFromElement = (element: Element, id: string) => {
    const idStr = element.getAttribute(id) as string;
    return parseInt(idStr, 10);
};

/**
 * keyEventFactory returns function to handle `KeyboardEvent`s for `HTMLSpanElement`s and `HTMLInputElement`s
 * @param onSpan Function to call if `currentElement` is of type `HTMLSpanElement`
 * @param onInput Function to call if `currentElement` is of type `HTMLInputElement`
 */
export const keyEventFactory = (
    onSpan: (spanEl: HTMLSpanElement) => Promise<void>,
    onInput: (inputEl: HTMLInputElement) => Promise<void>,
) => {
    return (async () => {
        const currentElement = document.querySelector("[nav-selected=true]") as HTMLElement;
        console.log("currentElement=", currentElement);

        switch (currentElement.nodeName) {
            case "SPAN":
                return onSpan(currentElement as HTMLSpanElement);
            case "INPUT":
                return onInput(currentElement as HTMLInputElement);
            default:
                console.warn("currentElement.nodeName neither \"SPAN\", nor \"INPUT\"");
        }
    });
};