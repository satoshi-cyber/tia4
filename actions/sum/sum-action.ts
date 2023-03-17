import get from "lodash.get"
import { SumPayload, TineFactory, TineVar } from "./sum-types"

const tineVar = (path: string) => ({ __value: (ctx: Object) => get(ctx, path) })

const getValue = <T>(ctx: Object, v: T | TineVar<T>) => {
    if (typeof v === 'object' &&
        !Array.isArray(v) &&
        v != null &&
        '__value' in v) {
        return v.__value(ctx)
    }

    return v
}

const sum: TineFactory<SumPayload, number> = ({ a, b }) => {
    return async (ctx) => {
        const valueA = getValue(ctx, a)
        const valueB = getValue(ctx, b)

        if (!valueA || !valueB) {
            return [ctx, undefined, new Error('missing values')]
        }

        const res = valueA + valueB

        return [ctx, res, undefined]
    }
}

const lorem = async () => {

    const [_, result, error] = await sum({ a: tineVar('input.a'), b: 2 })({ input: { a: 1 } })

    console.log({ result, error })

}

lorem()

export default sum
