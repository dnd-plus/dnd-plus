import { createSelector } from 'reselect'

type Selector<R> = () => R

type OutputSelector<R, C> = Selector<R> & {
  resultFunc: C
  recomputations: () => number
  resetRecomputations: () => number
}

type ParametricSelector<P, R> = (props: P, ...args: any[]) => R

type OutputParametricSelector<P, R, C> = ParametricSelector<P, R> & {
  resultFunc: C
  recomputations: () => number
  resetRecomputations: () => number
}

export type StatelessSelector = typeof createStatelessSelector

/* homogeneous selector parameter types */

/* one selector */
// prettier-ignore
export function createStatelessSelector<R1, T>(
  selector: Selector<R1>,
  combiner: (res: R1) => T,
): OutputSelector<T, (res: R1) => T>;
// prettier-ignore
export function createStatelessSelector<P, R1, T>(
  selector: ParametricSelector<P, R1>,
  combiner: (res: R1) => T,
): OutputParametricSelector<P, T, (res: R1) => T>;

/* two selectors */
// prettier-ignore
export function createStatelessSelector<R1, R2, T>(
  selector1: Selector<R1>,
  selector2: Selector<R2>,
  combiner: (res1: R1, res2: R2) => T,
): OutputSelector<T, (res1: R1, res2: R2) => T>;
// prettier-ignore
export function createStatelessSelector<P, R1, R2, T>(
  selector1: ParametricSelector<P, R1>,
  selector2: ParametricSelector<P, R2>,
  combiner: (res1: R1, res2: R2) => T,
): OutputParametricSelector<P, T, (res1: R1, res2: R2) => T>;

/* three selectors */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, T>(
  selector1: Selector<R1>,
  selector2: Selector<R2>,
  selector3: Selector<R3>,
  combiner: (res1: R1, res2: R2, res3: R3) => T,
): OutputSelector<T, (res1: R1, res2: R2, res3: R3) => T>;
// prettier-ignore
export function createStatelessSelector<P, R1, R2, R3, T>(
  selector1: ParametricSelector<P, R1>,
  selector2: ParametricSelector<P, R2>,
  selector3: ParametricSelector<P, R3>,
  combiner: (res1: R1, res2: R2, res3: R3) => T,
): OutputParametricSelector<P, T, (res1: R1, res2: R2, res3: R3) => T>;

/* four selectors */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, T>(
  selector1: Selector<R1>,
  selector2: Selector<R2>,
  selector3: Selector<R3>,
  selector4: Selector<R4>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4) => T,
): OutputSelector<T, (res1: R1, res2: R2, res3: R3, res4: R4) => T>;
// prettier-ignore
export function createStatelessSelector<P, R1, R2, R3, R4, T>(
  selector1: ParametricSelector<P, R1>,
  selector2: ParametricSelector<P, R2>,
  selector3: ParametricSelector<P, R3>,
  selector4: ParametricSelector<P, R4>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4) => T,
): OutputParametricSelector<P, T, (res1: R1, res2: R2, res3: R3, res4: R4) => T>;

/* five selectors */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, T>(
  selector1: Selector<R1>,
  selector2: Selector<R2>,
  selector3: Selector<R3>,
  selector4: Selector<R4>,
  selector5: Selector<R5>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T,
): OutputSelector<T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T>;
// prettier-ignore
export function createStatelessSelector<P, R1, R2, R3, R4, R5, T>(
  selector1: ParametricSelector<P, R1>,
  selector2: ParametricSelector<P, R2>,
  selector3: ParametricSelector<P, R3>,
  selector4: ParametricSelector<P, R4>,
  selector5: ParametricSelector<P, R5>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T,
): OutputParametricSelector<P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T>;

/* six selectors */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, R6, T>(
  selector1: Selector<R1>,
  selector2: Selector<R2>,
  selector3: Selector<R3>,
  selector4: Selector<R4>,
  selector5: Selector<R5>,
  selector6: Selector<R6>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T,
): OutputSelector<T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T>;
// prettier-ignore
export function createStatelessSelector<P, R1, R2, R3, R4, R5, R6, T>(
  selector1: ParametricSelector<P, R1>,
  selector2: ParametricSelector<P, R2>,
  selector3: ParametricSelector<P, R3>,
  selector4: ParametricSelector<P, R4>,
  selector5: ParametricSelector<P, R5>,
  selector6: ParametricSelector<P, R6>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T,
): OutputParametricSelector<P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T>;

/* seven selectors */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, R6, R7, T>(
  selector1: Selector<R1>,
  selector2: Selector<R2>,
  selector3: Selector<R3>,
  selector4: Selector<R4>,
  selector5: Selector<R5>,
  selector6: Selector<R6>,
  selector7: Selector<R7>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7) => T,
): OutputSelector<T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7) => T>;
// prettier-ignore
export function createStatelessSelector<P, R1, R2, R3, R4, R5, R6, R7, T>(
  selector1: ParametricSelector<P, R1>,
  selector2: ParametricSelector<P, R2>,
  selector3: ParametricSelector<P, R3>,
  selector4: ParametricSelector<P, R4>,
  selector5: ParametricSelector<P, R5>,
  selector6: ParametricSelector<P, R6>,
  selector7: ParametricSelector<P, R7>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7) => T,
): OutputParametricSelector<P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7) => T>;

/* eight selectors */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, R6, R7, R8, T>(
  selector1: Selector<R1>,
  selector2: Selector<R2>,
  selector3: Selector<R3>,
  selector4: Selector<R4>,
  selector5: Selector<R5>,
  selector6: Selector<R6>,
  selector7: Selector<R7>,
  selector8: Selector<R8>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8) => T,
): OutputSelector<T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8) => T>;
// prettier-ignore
export function createStatelessSelector<P, R1, R2, R3, R4, R5, R6, R7, R8, T>(
  selector1: ParametricSelector<P, R1>,
  selector2: ParametricSelector<P, R2>,
  selector3: ParametricSelector<P, R3>,
  selector4: ParametricSelector<P, R4>,
  selector5: ParametricSelector<P, R5>,
  selector6: ParametricSelector<P, R6>,
  selector7: ParametricSelector<P, R7>,
  selector8: ParametricSelector<P, R8>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8) => T,
): OutputParametricSelector<P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8) => T>;

/* nine selectors */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, R6, R7, R8, R9, T>(
  selector1: Selector<R1>,
  selector2: Selector<R2>,
  selector3: Selector<R3>,
  selector4: Selector<R4>,
  selector5: Selector<R5>,
  selector6: Selector<R6>,
  selector7: Selector<R7>,
  selector8: Selector<R8>,
  selector9: Selector<R9>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9) => T,
): OutputSelector<T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9) => T>;
// prettier-ignore
export function createStatelessSelector<P, R1, R2, R3, R4, R5, R6, R7, R8, R9, T>(
  selector1: ParametricSelector<P, R1>,
  selector2: ParametricSelector<P, R2>,
  selector3: ParametricSelector<P, R3>,
  selector4: ParametricSelector<P, R4>,
  selector5: ParametricSelector<P, R5>,
  selector6: ParametricSelector<P, R6>,
  selector7: ParametricSelector<P, R7>,
  selector8: ParametricSelector<P, R8>,
  selector9: ParametricSelector<P, R9>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9) => T,
): OutputParametricSelector<P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9) => T>;

/* ten selectors */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, T>(
  selector1: Selector<R1>,
  selector2: Selector<R2>,
  selector3: Selector<R3>,
  selector4: Selector<R4>,
  selector5: Selector<R5>,
  selector6: Selector<R6>,
  selector7: Selector<R7>,
  selector8: Selector<R8>,
  selector9: Selector<R9>,
  selector10: Selector<R10>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9, res10: R10) => T,
): OutputSelector<T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9, res10: R10) => T>;
// prettier-ignore
export function createStatelessSelector<P, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, T>(
  selector1: ParametricSelector<P, R1>,
  selector2: ParametricSelector<P, R2>,
  selector3: ParametricSelector<P, R3>,
  selector4: ParametricSelector<P, R4>,
  selector5: ParametricSelector<P, R5>,
  selector6: ParametricSelector<P, R6>,
  selector7: ParametricSelector<P, R7>,
  selector8: ParametricSelector<P, R8>,
  selector9: ParametricSelector<P, R9>,
  selector10: ParametricSelector<P, R10>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9, res10: R10) => T,
): OutputParametricSelector<P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9, res10: R10) => T>;

/* eleven selectors */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, T>(
  selector1: Selector<R1>,
  selector2: Selector<R2>,
  selector3: Selector<R3>,
  selector4: Selector<R4>,
  selector5: Selector<R5>,
  selector6: Selector<R6>,
  selector7: Selector<R7>,
  selector8: Selector<R8>,
  selector9: Selector<R9>,
  selector10: Selector<R10>,
  selector11: Selector<R11>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T,
): OutputSelector<T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T>;
// prettier-ignore
export function createStatelessSelector<P, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, T>(
  selector1: ParametricSelector<P, R1>,
  selector2: ParametricSelector<P, R2>,
  selector3: ParametricSelector<P, R3>,
  selector4: ParametricSelector<P, R4>,
  selector5: ParametricSelector<P, R5>,
  selector6: ParametricSelector<P, R6>,
  selector7: ParametricSelector<P, R7>,
  selector8: ParametricSelector<P, R8>,
  selector9: ParametricSelector<P, R9>,
  selector10: ParametricSelector<P, R10>,
  selector11: ParametricSelector<P, R11>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T,
): OutputParametricSelector<P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T>;

/* twelve selectors */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, T>(
  selector1: Selector<R1>,
  selector2: Selector<R2>,
  selector3: Selector<R3>,
  selector4: Selector<R4>,
  selector5: Selector<R5>,
  selector6: Selector<R6>,
  selector7: Selector<R7>,
  selector8: Selector<R8>,
  selector9: Selector<R9>,
  selector10: Selector<R10>,
  selector11: Selector<R11>,
  selector12: Selector<R12>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T,
): OutputSelector<T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T>;
// prettier-ignore
export function createStatelessSelector<P, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, T>(
  selector1: ParametricSelector<P, R1>,
  selector2: ParametricSelector<P, R2>,
  selector3: ParametricSelector<P, R3>,
  selector4: ParametricSelector<P, R4>,
  selector5: ParametricSelector<P, R5>,
  selector6: ParametricSelector<P, R6>,
  selector7: ParametricSelector<P, R7>,
  selector8: ParametricSelector<P, R8>,
  selector9: ParametricSelector<P, R9>,
  selector10: ParametricSelector<P, R10>,
  selector11: ParametricSelector<P, R11>,
  selector12: ParametricSelector<P, R12>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T,
): OutputParametricSelector<P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T>;

/* array argument */

/* one selector */
// prettier-ignore
export function createStatelessSelector<R1, T>(
  selectors: [Selector<R1>],
  combiner: (res: R1) => T,
): OutputSelector<T, (res: R1) => T>;
// prettier-ignore
export function createStatelessSelector<P, R1, T>(
  selectors: [ParametricSelector<P, R1>],
  combiner: (res: R1) => T,
): OutputParametricSelector<P, T, (res: R1) => T>;

/* two selectors */
// prettier-ignore
export function createStatelessSelector<R1, R2, T>(
  selectors: [Selector<R1>,
    Selector<R2>],
  combiner: (res1: R1, res2: R2) => T,
): OutputSelector<T, (res1: R1, res2: R2) => T>;
// prettier-ignore
export function createStatelessSelector<P, R1, R2, T>(
  selectors: [ParametricSelector<P, R1>,
    ParametricSelector<P, R2>],
  combiner: (res1: R1, res2: R2) => T,
): OutputParametricSelector<P, T, (res1: R1, res2: R2) => T>;

/* three selectors */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, T>(
  selectors: [Selector<R1>,
    Selector<R2>,
    Selector<R3>],
  combiner: (res1: R1, res2: R2, res3: R3) => T,
): OutputSelector<T, (res1: R1, res2: R2, res3: R3) => T>;
// prettier-ignore
export function createStatelessSelector<P, R1, R2, R3, T>(
  selectors: [ParametricSelector<P, R1>,
    ParametricSelector<P, R2>,
    ParametricSelector<P, R3>],
  combiner: (res1: R1, res2: R2, res3: R3) => T,
): OutputParametricSelector<P, T, (res1: R1, res2: R2, res3: R3) => T>;

/* four selectors */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, T>(
  selectors: [Selector<R1>,
    Selector<R2>,
    Selector<R3>,
    Selector<R4>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4) => T,
): OutputSelector<T, (res1: R1, res2: R2, res3: R3, res4: R4) => T>;
// prettier-ignore
export function createStatelessSelector<P, R1, R2, R3, R4, T>(
  selectors: [ParametricSelector<P, R1>,
    ParametricSelector<P, R2>,
    ParametricSelector<P, R3>,
    ParametricSelector<P, R4>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4) => T,
): OutputParametricSelector<P, T, (res1: R1, res2: R2, res3: R3, res4: R4) => T>;

/* five selectors */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, T>(
  selectors: [Selector<R1>,
    Selector<R2>,
    Selector<R3>,
    Selector<R4>,
    Selector<R5>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T,
): OutputSelector<T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T>;
// prettier-ignore
export function createStatelessSelector<P, R1, R2, R3, R4, R5, T>(
  selectors: [ParametricSelector<P, R1>,
    ParametricSelector<P, R2>,
    ParametricSelector<P, R3>,
    ParametricSelector<P, R4>,
    ParametricSelector<P, R5>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T,
): OutputParametricSelector<P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T>;

/* six selectors */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, R6, T>(
  selectors: [Selector<R1>,
    Selector<R2>,
    Selector<R3>,
    Selector<R4>,
    Selector<R5>,
    Selector<R6>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T,
): OutputSelector<T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T>;
// prettier-ignore
export function createStatelessSelector<P, R1, R2, R3, R4, R5, R6, T>(
  selectors: [ParametricSelector<P, R1>,
    ParametricSelector<P, R2>,
    ParametricSelector<P, R3>,
    ParametricSelector<P, R4>,
    ParametricSelector<P, R5>,
    ParametricSelector<P, R6>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T,
): OutputParametricSelector<P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T>;

/* seven selectors */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, R6, R7, T>(
  selectors: [Selector<R1>,
    Selector<R2>,
    Selector<R3>,
    Selector<R4>,
    Selector<R5>,
    Selector<R6>,
    Selector<R7>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7) => T,
): OutputSelector<T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7) => T>;
// prettier-ignore
export function createStatelessSelector<P, R1, R2, R3, R4, R5, R6, R7, T>(
  selectors: [ParametricSelector<P, R1>,
    ParametricSelector<P, R2>,
    ParametricSelector<P, R3>,
    ParametricSelector<P, R4>,
    ParametricSelector<P, R5>,
    ParametricSelector<P, R6>,
    ParametricSelector<P, R7>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7) => T,
): OutputParametricSelector<P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7) => T>;

/* eight selectors */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, R6, R7, R8, T>(
  selectors: [Selector<R1>,
    Selector<R2>,
    Selector<R3>,
    Selector<R4>,
    Selector<R5>,
    Selector<R6>,
    Selector<R7>,
    Selector<R8>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8) => T,
): OutputSelector<T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8) => T>;
// prettier-ignore
export function createStatelessSelector<P, R1, R2, R3, R4, R5, R6, R7, R8, T>(
  selectors: [ParametricSelector<P, R1>,
    ParametricSelector<P, R2>,
    ParametricSelector<P, R3>,
    ParametricSelector<P, R4>,
    ParametricSelector<P, R5>,
    ParametricSelector<P, R6>,
    ParametricSelector<P, R7>,
    ParametricSelector<P, R8>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8) => T,
): OutputParametricSelector<P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8) => T>;

/* nine selectors */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, R6, R7, R8, R9, T>(
  selectors: [Selector<R1>,
    Selector<R2>,
    Selector<R3>,
    Selector<R4>,
    Selector<R5>,
    Selector<R6>,
    Selector<R7>,
    Selector<R8>,
    Selector<R9>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9) => T,
): OutputSelector<T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9) => T>;
// prettier-ignore
export function createStatelessSelector<P, R1, R2, R3, R4, R5, R6, R7, R8, R9, T>(
  selectors: [ParametricSelector<P, R1>,
    ParametricSelector<P, R2>,
    ParametricSelector<P, R3>,
    ParametricSelector<P, R4>,
    ParametricSelector<P, R5>,
    ParametricSelector<P, R6>,
    ParametricSelector<P, R7>,
    ParametricSelector<P, R8>,
    ParametricSelector<P, R9>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9) => T,
): OutputParametricSelector<P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9) => T>;

/* ten selectors */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, T>(
  selectors: [Selector<R1>,
    Selector<R2>,
    Selector<R3>,
    Selector<R4>,
    Selector<R5>,
    Selector<R6>,
    Selector<R7>,
    Selector<R8>,
    Selector<R9>,
    Selector<R10>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9, res10: R10) => T,
): OutputSelector<T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9, res10: R10) => T>;
// prettier-ignore
export function createStatelessSelector<P, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, T>(
  selectors: [ParametricSelector<P, R1>,
    ParametricSelector<P, R2>,
    ParametricSelector<P, R3>,
    ParametricSelector<P, R4>,
    ParametricSelector<P, R5>,
    ParametricSelector<P, R6>,
    ParametricSelector<P, R7>,
    ParametricSelector<P, R8>,
    ParametricSelector<P, R9>,
    ParametricSelector<P, R10>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9, res10: R10) => T,
): OutputParametricSelector<P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9, res10: R10) => T>;

/* eleven selectors */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, T>(
  selectors: [Selector<R1>,
    Selector<R2>,
    Selector<R3>,
    Selector<R4>,
    Selector<R5>,
    Selector<R6>,
    Selector<R7>,
    Selector<R8>,
    Selector<R9>,
    Selector<R10>,
    Selector<R11>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T,
): OutputSelector<T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T>;
// prettier-ignore
export function createStatelessSelector<P, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, T>(
  selectors: [ParametricSelector<P, R1>,
    ParametricSelector<P, R2>,
    ParametricSelector<P, R3>,
    ParametricSelector<P, R4>,
    ParametricSelector<P, R5>,
    ParametricSelector<P, R6>,
    ParametricSelector<P, R7>,
    ParametricSelector<P, R8>,
    ParametricSelector<P, R9>,
    ParametricSelector<P, R10>,
    ParametricSelector<P, R11>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T,
): OutputParametricSelector<P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T>;

/* twelve selectors */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, T>(
  selectors: [Selector<R1>,
    Selector<R2>,
    Selector<R3>,
    Selector<R4>,
    Selector<R5>,
    Selector<R6>,
    Selector<R7>,
    Selector<R8>,
    Selector<R9>,
    Selector<R10>,
    Selector<R11>,
    Selector<R12>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T,
): OutputSelector<T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T>;
// prettier-ignore
export function createStatelessSelector<P, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, T>(
  selectors: [ParametricSelector<P, R1>,
    ParametricSelector<P, R2>,
    ParametricSelector<P, R3>,
    ParametricSelector<P, R4>,
    ParametricSelector<P, R5>,
    ParametricSelector<P, R6>,
    ParametricSelector<P, R7>,
    ParametricSelector<P, R8>,
    ParametricSelector<P, R9>,
    ParametricSelector<P, R10>,
    ParametricSelector<P, R11>,
    ParametricSelector<P, R12>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T,
): OutputParametricSelector<P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T>;

/* heterogeneous selector parameter types */

/* one selector */
// prettier-ignore
export function createStatelessSelector<R1, T>(
  selector1: Selector<R1>,
  combiner: (res1: R1) => T,
): OutputSelector<T, (res1: R1) => T>;
// prettier-ignore
export function createStatelessSelector<P1, R1, T>(
  selector1: ParametricSelector<P1, R1>,
  combiner: (res1: R1) => T,
): OutputParametricSelector<P1, T, (res1: R1) => T>;

/* two selector */
// prettier-ignore
export function createStatelessSelector<R1, R2, T>(
  selector1: Selector<R1>,
  selector2: Selector<R2>,
  combiner: (res1: R1, res2: R2) => T,
): OutputSelector< T, (res1: R1, res2: R2) => T>;
// prettier-ignore
export function createStatelessSelector<P1, P2, R1, R2, T>(
  selector1: ParametricSelector<P1, R1>,
  selector2: ParametricSelector<P2, R2>,
  combiner: (res1: R1, res2: R2) => T,
): OutputParametricSelector< P1 & P2, T, (res1: R1, res2: R2) => T>;

/* three selector */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, T>(
  selector1: Selector<R1>,
  selector2: Selector<R2>,
  selector3: Selector<R3>,
  combiner: (res1: R1, res2: R2, res3: R3) => T,
): OutputSelector<  T, (res1: R1, res2: R2, res3: R3) => T>;
// prettier-ignore
export function createStatelessSelector<P1, P2, P3, R1, R2, R3, T>(
  selector1: ParametricSelector<P1, R1>,
  selector2: ParametricSelector<P2, R2>,
  selector3: ParametricSelector<P3, R3>,
  combiner: (res1: R1, res2: R2, res3: R3) => T,
): OutputParametricSelector<  P1 & P2 & P3, T, (res1: R1, res2: R2, res3: R3) => T>;

/* four selector */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, T>(
  selector1: Selector<R1>,
  selector2: Selector<R2>,
  selector3: Selector<R3>,
  selector4: Selector<R4>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4) => T,
): OutputSelector<   T, (res1: R1, res2: R2, res3: R3, res4: R4) => T>;
// prettier-ignore
export function createStatelessSelector<P1, P2, P3, P4, R1, R2, R3, R4, T>(
  selector1: ParametricSelector<P1, R1>,
  selector2: ParametricSelector<P2, R2>,
  selector3: ParametricSelector<P3, R3>,
  selector4: ParametricSelector<P4, R4>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4) => T,
): OutputParametricSelector<   P1 & P2 & P3 & P4, T, (res1: R1, res2: R2, res3: R3, res4: R4) => T>;

/* five selector */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, T>(
  selector1: Selector<R1>,
  selector2: Selector<R2>,
  selector3: Selector<R3>,
  selector4: Selector<R4>,
  selector5: Selector<R5>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T,
): OutputSelector<    T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T>;
// prettier-ignore
export function createStatelessSelector<P1, P2, P3, P4, P5, R1, R2, R3, R4, R5, T>(
  selector1: ParametricSelector<P1, R1>,
  selector2: ParametricSelector<P2, R2>,
  selector3: ParametricSelector<P3, R3>,
  selector4: ParametricSelector<P4, R4>,
  selector5: ParametricSelector<P5, R5>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T,
): OutputParametricSelector<    P1 & P2 & P3 & P4 & P5, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T>;

/* six selector */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, R6, T>(
  selector1: Selector<R1>,
  selector2: Selector<R2>,
  selector3: Selector<R3>,
  selector4: Selector<R4>,
  selector5: Selector<R5>,
  selector6: Selector<R6>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T,
): OutputSelector<     T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T>;
// prettier-ignore
export function createStatelessSelector<P1, P2, P3, P4, P5, P6, R1, R2, R3, R4, R5, R6, T>(
  selector1: ParametricSelector<P1, R1>,
  selector2: ParametricSelector<P2, R2>,
  selector3: ParametricSelector<P3, R3>,
  selector4: ParametricSelector<P4, R4>,
  selector5: ParametricSelector<P5, R5>,
  selector6: ParametricSelector<P6, R6>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T,
): OutputParametricSelector<     P1 & P2 & P3 & P4 & P5 & P6, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T>;

/* seven selector */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, R6, R7, T>(
  selector1: Selector<R1>,
  selector2: Selector<R2>,
  selector3: Selector<R3>,
  selector4: Selector<R4>,
  selector5: Selector<R5>,
  selector6: Selector<R6>,
  selector7: Selector<R7>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7) => T,
): OutputSelector<      T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7) => T>;
// prettier-ignore
export function createStatelessSelector<P1, P2, P3, P4, P5, P6, P7, R1, R2, R3, R4, R5, R6, R7, T>(
  selector1: ParametricSelector<P1, R1>,
  selector2: ParametricSelector<P2, R2>,
  selector3: ParametricSelector<P3, R3>,
  selector4: ParametricSelector<P4, R4>,
  selector5: ParametricSelector<P5, R5>,
  selector6: ParametricSelector<P6, R6>,
  selector7: ParametricSelector<P7, R7>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7) => T,
): OutputParametricSelector<      P1 & P2 & P3 & P4 & P5 & P6 & P7, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7) => T>;

/* eight selector */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, R6, R7, R8, T>(
  selector1: Selector<R1>,
  selector2: Selector<R2>,
  selector3: Selector<R3>,
  selector4: Selector<R4>,
  selector5: Selector<R5>,
  selector6: Selector<R6>,
  selector7: Selector<R7>,
  selector8: Selector<R8>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8) => T,
): OutputSelector<       T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8) => T>;
// prettier-ignore
export function createStatelessSelector<P1, P2, P3, P4, P5, P6, P7, P8, R1, R2, R3, R4, R5, R6, R7, R8, T>(
  selector1: ParametricSelector<P1, R1>,
  selector2: ParametricSelector<P2, R2>,
  selector3: ParametricSelector<P3, R3>,
  selector4: ParametricSelector<P4, R4>,
  selector5: ParametricSelector<P5, R5>,
  selector6: ParametricSelector<P6, R6>,
  selector7: ParametricSelector<P7, R7>,
  selector8: ParametricSelector<P8, R8>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8) => T,
): OutputParametricSelector<       P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8) => T>;

/* nine selector */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, R6, R7, R8, R9, T>(
  selector1: Selector<R1>,
  selector2: Selector<R2>,
  selector3: Selector<R3>,
  selector4: Selector<R4>,
  selector5: Selector<R5>,
  selector6: Selector<R6>,
  selector7: Selector<R7>,
  selector8: Selector<R8>,
  selector9: Selector<R9>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9) => T,
): OutputSelector<        T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9) => T>;
// prettier-ignore
export function createStatelessSelector<P1, P2, P3, P4, P5, P6, P7, P8, P9, R1, R2, R3, R4, R5, R6, R7, R8, R9, T>(
  selector1: ParametricSelector<P1, R1>,
  selector2: ParametricSelector<P2, R2>,
  selector3: ParametricSelector<P3, R3>,
  selector4: ParametricSelector<P4, R4>,
  selector5: ParametricSelector<P5, R5>,
  selector6: ParametricSelector<P6, R6>,
  selector7: ParametricSelector<P7, R7>,
  selector8: ParametricSelector<P8, R8>,
  selector9: ParametricSelector<P9, R9>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9) => T,
): OutputParametricSelector<        P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9) => T>;

/* ten selector */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, T>(
  selector1: Selector<R1>,
  selector2: Selector<R2>,
  selector3: Selector<R3>,
  selector4: Selector<R4>,
  selector5: Selector<R5>,
  selector6: Selector<R6>,
  selector7: Selector<R7>,
  selector8: Selector<R8>,
  selector9: Selector<R9>,
  selector10: Selector<R10>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10) => T,
): OutputSelector<         T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10) => T>;
// prettier-ignore
export function createStatelessSelector<P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, T>(
  selector1: ParametricSelector<P1, R1>,
  selector2: ParametricSelector<P2, R2>,
  selector3: ParametricSelector<P3, R3>,
  selector4: ParametricSelector<P4, R4>,
  selector5: ParametricSelector<P5, R5>,
  selector6: ParametricSelector<P6, R6>,
  selector7: ParametricSelector<P7, R7>,
  selector8: ParametricSelector<P8, R8>,
  selector9: ParametricSelector<P9, R9>,
  selector10: ParametricSelector<P10, R10>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10) => T,
): OutputParametricSelector<         P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10) => T>;

/* eleven selector */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, T>(
  selector1: Selector<R1>,
  selector2: Selector<R2>,
  selector3: Selector<R3>,
  selector4: Selector<R4>,
  selector5: Selector<R5>,
  selector6: Selector<R6>,
  selector7: Selector<R7>,
  selector8: Selector<R8>,
  selector9: Selector<R9>,
  selector10: Selector<R10>,
  selector11: Selector<R11>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T,
): OutputSelector<          T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T>;
// prettier-ignore
export function createStatelessSelector<P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, T>(
  selector1: ParametricSelector<P1, R1>,
  selector2: ParametricSelector<P2, R2>,
  selector3: ParametricSelector<P3, R3>,
  selector4: ParametricSelector<P4, R4>,
  selector5: ParametricSelector<P5, R5>,
  selector6: ParametricSelector<P6, R6>,
  selector7: ParametricSelector<P7, R7>,
  selector8: ParametricSelector<P8, R8>,
  selector9: ParametricSelector<P9, R9>,
  selector10: ParametricSelector<P10, R10>,
  selector11: ParametricSelector<P11, R11>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T,
): OutputParametricSelector<          P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T>;

/* twelve selector */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, T>(
  selector1: Selector<R1>,
  selector2: Selector<R2>,
  selector3: Selector<R3>,
  selector4: Selector<R4>,
  selector5: Selector<R5>,
  selector6: Selector<R6>,
  selector7: Selector<R7>,
  selector8: Selector<R8>,
  selector9: Selector<R9>,
  selector10: Selector<R10>,
  selector11: Selector<R11>,
  selector12: Selector<R12>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T,
): OutputSelector<           T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T>;
// prettier-ignore
export function createStatelessSelector<P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, T>(
  selector1: ParametricSelector<P1, R1>,
  selector2: ParametricSelector<P2, R2>,
  selector3: ParametricSelector<P3, R3>,
  selector4: ParametricSelector<P4, R4>,
  selector5: ParametricSelector<P5, R5>,
  selector6: ParametricSelector<P6, R6>,
  selector7: ParametricSelector<P7, R7>,
  selector8: ParametricSelector<P8, R8>,
  selector9: ParametricSelector<P9, R9>,
  selector10: ParametricSelector<P10, R10>,
  selector11: ParametricSelector<P11, R11>,
  selector12: ParametricSelector<P12, R12>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T,
): OutputParametricSelector<           P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11 & P12, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T>;

/* array argument */

/* one selector */
// prettier-ignore
export function createStatelessSelector<R1, T>(
  selectors: [Selector<R1>],
  combiner: (res1: R1) => T,
): OutputSelector<T, (res1: R1) => T>;
// prettier-ignore
export function createStatelessSelector<P1, R1, T>(
  selectors: [ParametricSelector<P1, R1>],
  combiner: (res1: R1) => T,
): OutputParametricSelector<P1, T, (res1: R1) => T>;

/* two selector */
// prettier-ignore
export function createStatelessSelector<R1, R2, T>(
  selectors: [Selector<R1>, Selector<R2>],
  combiner: (res1: R1, res2: R2) => T,
): OutputSelector< T, (res1: R1, res2: R2) => T>;
// prettier-ignore
export function createStatelessSelector<P1, P2, R1, R2, T>(
  selectors: [ParametricSelector<P1, R1>, ParametricSelector<P2, R2>],
  combiner: (res1: R1, res2: R2) => T,
): OutputParametricSelector< P1 & P2, T, (res1: R1, res2: R2) => T>;

/* three selector */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, T>(
  selectors: [Selector<R1>, Selector<R2>, Selector<R3>],
  combiner: (res1: R1, res2: R2, res3: R3) => T,
): OutputSelector<  T, (res1: R1, res2: R2, res3: R3) => T>;
// prettier-ignore
export function createStatelessSelector<P1, P2, P3, R1, R2, R3, T>(
  selectors: [ParametricSelector<P1, R1>, ParametricSelector<P2, R2>, ParametricSelector<P3, R3>],
  combiner: (res1: R1, res2: R2, res3: R3) => T,
): OutputParametricSelector<  P1 & P2 & P3, T, (res1: R1, res2: R2, res3: R3) => T>;

/* four selector */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, T>(
  selectors: [Selector<R1>, Selector<R2>, Selector<R3>, Selector<R4>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4) => T,
): OutputSelector<   T, (res1: R1, res2: R2, res3: R3, res4: R4) => T>;
// prettier-ignore
export function createStatelessSelector<P1, P2, P3, P4, R1, R2, R3, R4, T>(
  selectors: [ParametricSelector<P1, R1>, ParametricSelector<P2, R2>, ParametricSelector<P3, R3>, ParametricSelector<P4, R4>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4) => T,
): OutputParametricSelector<   P1 & P2 & P3 & P4, T, (res1: R1, res2: R2, res3: R3, res4: R4) => T>;

/* five selector */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, T>(
  selectors: [Selector<R1>, Selector<R2>, Selector<R3>, Selector<R4>, Selector<R5>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T,
): OutputSelector<    T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T>;
// prettier-ignore
export function createStatelessSelector<P1, P2, P3, P4, P5, R1, R2, R3, R4, R5, T>(
  selectors: [ParametricSelector<P1, R1>, ParametricSelector<P2, R2>, ParametricSelector<P3, R3>, ParametricSelector<P4, R4>, ParametricSelector<P5, R5>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T,
): OutputParametricSelector<    P1 & P2 & P3 & P4 & P5, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T>;

/* six selector */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, R6, T>(
  selectors: [Selector<R1>, Selector<R2>, Selector<R3>, Selector<R4>, Selector<R5>, Selector<R6>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T,
): OutputSelector<     T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T>;
// prettier-ignore
export function createStatelessSelector<P1, P2, P3, P4, P5, P6, R1, R2, R3, R4, R5, R6, T>(
  selectors: [ParametricSelector<P1, R1>, ParametricSelector<P2, R2>, ParametricSelector<P3, R3>, ParametricSelector<P4, R4>, ParametricSelector<P5, R5>, ParametricSelector<P6, R6>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T,
): OutputParametricSelector<     P1 & P2 & P3 & P4 & P5 & P6, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T>;

/* seven selector */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, R6, R7, T>(
  selectors: [Selector<R1>, Selector<R2>, Selector<R3>, Selector<R4>, Selector<R5>, Selector<R6>, Selector<R7>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7) => T,
): OutputSelector<      T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7) => T>;
// prettier-ignore
export function createStatelessSelector<P1, P2, P3, P4, P5, P6, P7, R1, R2, R3, R4, R5, R6, R7, T>(
  selectors: [ParametricSelector<P1, R1>, ParametricSelector<P2, R2>, ParametricSelector<P3, R3>, ParametricSelector<P4, R4>, ParametricSelector<P5, R5>, ParametricSelector<P6, R6>, ParametricSelector<P7, R7>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7) => T,
): OutputParametricSelector<      P1 & P2 & P3 & P4 & P5 & P6 & P7, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7) => T>;

/* eight selector */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, R6, R7, R8, T>(
  selectors: [Selector<R1>, Selector<R2>, Selector<R3>, Selector<R4>, Selector<R5>, Selector<R6>, Selector<R7>, Selector<R8>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8) => T,
): OutputSelector<       T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8) => T>;
// prettier-ignore
export function createStatelessSelector<P1, P2, P3, P4, P5, P6, P7, P8, R1, R2, R3, R4, R5, R6, R7, R8, T>(
  selectors: [ParametricSelector<P1, R1>, ParametricSelector<P2, R2>, ParametricSelector<P3, R3>, ParametricSelector<P4, R4>, ParametricSelector<P5, R5>, ParametricSelector<P6, R6>, ParametricSelector<P7, R7>, ParametricSelector<P8, R8>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8) => T,
): OutputParametricSelector<       P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8) => T>;

/* nine selector */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, R6, R7, R8, R9, T>(
  selectors: [Selector<R1>, Selector<R2>, Selector<R3>, Selector<R4>, Selector<R5>, Selector<R6>, Selector<R7>, Selector<R8>, Selector<R9>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9) => T,
): OutputSelector<        T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9) => T>;
// prettier-ignore
export function createStatelessSelector<P1, P2, P3, P4, P5, P6, P7, P8, P9, R1, R2, R3, R4, R5, R6, R7, R8, R9, T>(
  selectors: [ParametricSelector<P1, R1>, ParametricSelector<P2, R2>, ParametricSelector<P3, R3>, ParametricSelector<P4, R4>, ParametricSelector<P5, R5>, ParametricSelector<P6, R6>, ParametricSelector<P7, R7>, ParametricSelector<P8, R8>, ParametricSelector<P9, R9>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9) => T,
): OutputParametricSelector<        P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9) => T>;

/* ten selector */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, T>(
  selectors: [Selector<R1>, Selector<R2>, Selector<R3>, Selector<R4>, Selector<R5>, Selector<R6>, Selector<R7>, Selector<R8>, Selector<R9>, Selector<R10>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10) => T,
): OutputSelector<         T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10) => T>;
// prettier-ignore
export function createStatelessSelector<P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, T>(
  selectors: [ParametricSelector<P1, R1>, ParametricSelector<P2, R2>, ParametricSelector<P3, R3>, ParametricSelector<P4, R4>, ParametricSelector<P5, R5>, ParametricSelector<P6, R6>, ParametricSelector<P7, R7>, ParametricSelector<P8, R8>, ParametricSelector<P9, R9>, ParametricSelector<P10, R10>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10) => T,
): OutputParametricSelector<         P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10) => T>;

/* eleven selector */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, T>(
  selectors: [Selector<R1>, Selector<R2>, Selector<R3>, Selector<R4>, Selector<R5>, Selector<R6>, Selector<R7>, Selector<R8>, Selector<R9>, Selector<R10>, Selector<R11>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T,
): OutputSelector<          T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T>;
// prettier-ignore
export function createStatelessSelector<P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, T>(
  selectors: [ParametricSelector<P1, R1>, ParametricSelector<P2, R2>, ParametricSelector<P3, R3>, ParametricSelector<P4, R4>, ParametricSelector<P5, R5>, ParametricSelector<P6, R6>, ParametricSelector<P7, R7>, ParametricSelector<P8, R8>, ParametricSelector<P9, R9>, ParametricSelector<P10, R10>, ParametricSelector<P11, R11>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T,
): OutputParametricSelector<          P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T>;

/* twelve selector */
// prettier-ignore
export function createStatelessSelector<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, T>(
  selectors: [Selector<R1>, Selector<R2>, Selector<R3>, Selector<R4>, Selector<R5>, Selector<R6>, Selector<R7>, Selector<R8>, Selector<R9>, Selector<R10>, Selector<R11>, Selector<R12>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T,
): OutputSelector<           T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T>;
// prettier-ignore
export function createStatelessSelector<P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, T>(
  selectors: [ParametricSelector<P1, R1>, ParametricSelector<P2, R2>, ParametricSelector<P3, R3>, ParametricSelector<P4, R4>, ParametricSelector<P5, R5>, ParametricSelector<P6, R6>, ParametricSelector<P7, R7>, ParametricSelector<P8, R8>, ParametricSelector<P9, R9>, ParametricSelector<P10, R10>, ParametricSelector<P11, R11>, ParametricSelector<P12, R12>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T,
): OutputParametricSelector<           P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11 & P12, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T>;

/* any number of uniform selectors */
// prettier-ignore
export function createStatelessSelector<R, T>(
  selectors: Selector<R>[],
  combiner: (...res: R[]) => T,
): OutputSelector<T, (...res: R[]) => T>;
// prettier-ignore
export function createStatelessSelector<P, R, T>(
  selectors: ParametricSelector<P, R>[],
  combiner: (...res: R[]) => T,
): OutputParametricSelector<P, T, (...res: R[]) => T>;

export function createStatelessSelector() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line
  return createSelector.apply(null, arguments)
}
