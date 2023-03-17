export type TineFactory<P, T> = (payload: P) => (ctx: Object) => Promise<[Object, T?, Error?]>

export type TineVar<T> = { __value: (ctx: Object) => T | undefined }
export interface SumPayload {
    a: number | TineVar<number>
    b: number | TineVar<number>
}
