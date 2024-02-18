export const makeDelay = (timeDelay: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeDelay));
}