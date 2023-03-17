import { SumPayload } from "./sum-types"

const sum = ({ a, b }: SumPayload) => {
    return (ctx: Object, next: (ctx: Object, res: any) => void) => {
        next(ctx, a + b)
    }
}

export default sum
