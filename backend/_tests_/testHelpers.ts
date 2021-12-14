import { GraphQLFormattedError } from "graphql";

export const makeHeaders = (token: string | null) => {
    return {
        req: {
            headers: {
                authorization: token || ''
            }
        }
    }
}

export const graphQLAuthError = (errors : readonly GraphQLFormattedError [] | undefined) => {
    expect(errors).toBeDefined();
    return expect(errors).toEqual(
        expect.arrayContaining([
            expect.objectContaining({ message: 'Access denied'})
        ])
    );
}