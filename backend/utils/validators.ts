    
export const validString = ( obj: unknown, allowEmptyString = false): obj is string => {
    if ( (obj instanceof String || typeof obj === 'string')) {  
        if (allowEmptyString !== true && obj as string === '') return false;
        return true;
    }
    return false;
}

type validIntRange = {
    min: number,
    max: number
}
export const validInt = (obj: unknown, range?: validIntRange): obj is number => {

    if ( Number.isSafeInteger(obj) ) {
        if (range !== undefined) {
            if (obj as number < range.min || obj as number > range.max) return false;
        }
        return true;
    }
    return false;
}