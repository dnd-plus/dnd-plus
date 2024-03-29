import { createSelectorCreator, defaultMemoize } from 'reselect'
import { useSelector } from 'react-redux'
import { AppState } from 'redux/configureStore'

type Selector<S, R> = (state: S) => R

type OutputSelector<S, R, C> = Selector<S, R> & {
  resultFunc: C
  recomputations: () => number
  resetRecomputations: () => number
  use: () => R
}

type ParametricSelector<S, P, R> = (state: S, props: P, ...args: any[]) => R

type OutputParametricSelector<S, P, R, C> = ParametricSelector<S, P, R> & {
  resultFunc: C
  recomputations: () => number
  resetRecomputations: () => number
  use: () => R
}

export type OutputAppSelector<R> = OutputSelector<AppState, R, any>

export type UseSelector = typeof createUseSelector

/* homogeneous selector parameter types */

/* one selector */
// prettier-ignore
export function createUseSelector<S, R1, T>(
  selector: Selector<S, R1>,
  combiner: (res: R1) => T,
): OutputSelector<S, T, (res: R1) => T>;
// prettier-ignore
export function createUseSelector<S, P, R1, T>(
  selector: ParametricSelector<S, P, R1>,
  combiner: (res: R1) => T,
): OutputParametricSelector<S, P, T, (res: R1) => T>;

/* two selectors */
// prettier-ignore
export function createUseSelector<S, R1, R2, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  combiner: (res1: R1, res2: R2) => T,
): OutputSelector<S, T, (res1: R1, res2: R2) => T>;
// prettier-ignore
export function createUseSelector<S, P, R1, R2, T>(
  selector1: ParametricSelector<S, P, R1>,
  selector2: ParametricSelector<S, P, R2>,
  combiner: (res1: R1, res2: R2) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2) => T>;

/* three selectors */
// prettier-ignore
export function createUseSelector<S, R1, R2, R3, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  selector3: Selector<S, R3>,
  combiner: (res1: R1, res2: R2, res3: R3) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3) => T>;
// prettier-ignore
export function createUseSelector<S, P, R1, R2, R3, T>(
  selector1: ParametricSelector<S, P, R1>,
  selector2: ParametricSelector<S, P, R2>,
  selector3: ParametricSelector<S, P, R3>,
  combiner: (res1: R1, res2: R2, res3: R3) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3) => T>;

/* four selectors */
// prettier-ignore
export function createUseSelector<S, R1, R2, R3, R4, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  selector3: Selector<S, R3>,
  selector4: Selector<S, R4>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4) => T>;
// prettier-ignore
export function createUseSelector<S, P, R1, R2, R3, R4, T>(
  selector1: ParametricSelector<S, P, R1>,
  selector2: ParametricSelector<S, P, R2>,
  selector3: ParametricSelector<S, P, R3>,
  selector4: ParametricSelector<S, P, R4>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4) => T>;

/* five selectors */
// prettier-ignore
export function createUseSelector<S, R1, R2, R3, R4, R5, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  selector3: Selector<S, R3>,
  selector4: Selector<S, R4>,
  selector5: Selector<S, R5>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T>;
// prettier-ignore
export function createUseSelector<S, P, R1, R2, R3, R4, R5, T>(
  selector1: ParametricSelector<S, P, R1>,
  selector2: ParametricSelector<S, P, R2>,
  selector3: ParametricSelector<S, P, R3>,
  selector4: ParametricSelector<S, P, R4>,
  selector5: ParametricSelector<S, P, R5>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T>;

/* six selectors */
// prettier-ignore
export function createUseSelector<S, R1, R2, R3, R4, R5, R6, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  selector3: Selector<S, R3>,
  selector4: Selector<S, R4>,
  selector5: Selector<S, R5>,
  selector6: Selector<S, R6>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T>;
// prettier-ignore
export function createUseSelector<S, P, R1, R2, R3, R4, R5, R6, T>(
  selector1: ParametricSelector<S, P, R1>,
  selector2: ParametricSelector<S, P, R2>,
  selector3: ParametricSelector<S, P, R3>,
  selector4: ParametricSelector<S, P, R4>,
  selector5: ParametricSelector<S, P, R5>,
  selector6: ParametricSelector<S, P, R6>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T>;

/* seven selectors */
// prettier-ignore
export function createUseSelector<S, R1, R2, R3, R4, R5, R6, R7, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  selector3: Selector<S, R3>,
  selector4: Selector<S, R4>,
  selector5: Selector<S, R5>,
  selector6: Selector<S, R6>,
  selector7: Selector<S, R7>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7) => T>;
// prettier-ignore
export function createUseSelector<S, P, R1, R2, R3, R4, R5, R6, R7, T>(
  selector1: ParametricSelector<S, P, R1>,
  selector2: ParametricSelector<S, P, R2>,
  selector3: ParametricSelector<S, P, R3>,
  selector4: ParametricSelector<S, P, R4>,
  selector5: ParametricSelector<S, P, R5>,
  selector6: ParametricSelector<S, P, R6>,
  selector7: ParametricSelector<S, P, R7>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7) => T>;

/* eight selectors */
// prettier-ignore
export function createUseSelector<S, R1, R2, R3, R4, R5, R6, R7, R8, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  selector3: Selector<S, R3>,
  selector4: Selector<S, R4>,
  selector5: Selector<S, R5>,
  selector6: Selector<S, R6>,
  selector7: Selector<S, R7>,
  selector8: Selector<S, R8>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8) => T>;
// prettier-ignore
export function createUseSelector<S, P, R1, R2, R3, R4, R5, R6, R7, R8, T>(
  selector1: ParametricSelector<S, P, R1>,
  selector2: ParametricSelector<S, P, R2>,
  selector3: ParametricSelector<S, P, R3>,
  selector4: ParametricSelector<S, P, R4>,
  selector5: ParametricSelector<S, P, R5>,
  selector6: ParametricSelector<S, P, R6>,
  selector7: ParametricSelector<S, P, R7>,
  selector8: ParametricSelector<S, P, R8>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8) => T>;

/* nine selectors */
// prettier-ignore
export function createUseSelector<S, R1, R2, R3, R4, R5, R6, R7, R8, R9, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  selector3: Selector<S, R3>,
  selector4: Selector<S, R4>,
  selector5: Selector<S, R5>,
  selector6: Selector<S, R6>,
  selector7: Selector<S, R7>,
  selector8: Selector<S, R8>,
  selector9: Selector<S, R9>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9) => T>;
// prettier-ignore
export function createUseSelector<S, P, R1, R2, R3, R4, R5, R6, R7, R8, R9, T>(
  selector1: ParametricSelector<S, P, R1>,
  selector2: ParametricSelector<S, P, R2>,
  selector3: ParametricSelector<S, P, R3>,
  selector4: ParametricSelector<S, P, R4>,
  selector5: ParametricSelector<S, P, R5>,
  selector6: ParametricSelector<S, P, R6>,
  selector7: ParametricSelector<S, P, R7>,
  selector8: ParametricSelector<S, P, R8>,
  selector9: ParametricSelector<S, P, R9>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9) => T>;

/* ten selectors */
// prettier-ignore
export function createUseSelector<S, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  selector3: Selector<S, R3>,
  selector4: Selector<S, R4>,
  selector5: Selector<S, R5>,
  selector6: Selector<S, R6>,
  selector7: Selector<S, R7>,
  selector8: Selector<S, R8>,
  selector9: Selector<S, R9>,
  selector10: Selector<S, R10>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9, res10: R10) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9, res10: R10) => T>;
// prettier-ignore
export function createUseSelector<S, P, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, T>(
  selector1: ParametricSelector<S, P, R1>,
  selector2: ParametricSelector<S, P, R2>,
  selector3: ParametricSelector<S, P, R3>,
  selector4: ParametricSelector<S, P, R4>,
  selector5: ParametricSelector<S, P, R5>,
  selector6: ParametricSelector<S, P, R6>,
  selector7: ParametricSelector<S, P, R7>,
  selector8: ParametricSelector<S, P, R8>,
  selector9: ParametricSelector<S, P, R9>,
  selector10: ParametricSelector<S, P, R10>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9, res10: R10) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9, res10: R10) => T>;

/* eleven selectors */
// prettier-ignore
export function createUseSelector<S, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  selector3: Selector<S, R3>,
  selector4: Selector<S, R4>,
  selector5: Selector<S, R5>,
  selector6: Selector<S, R6>,
  selector7: Selector<S, R7>,
  selector8: Selector<S, R8>,
  selector9: Selector<S, R9>,
  selector10: Selector<S, R10>,
  selector11: Selector<S, R11>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T>;
// prettier-ignore
export function createUseSelector<S, P, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, T>(
  selector1: ParametricSelector<S, P, R1>,
  selector2: ParametricSelector<S, P, R2>,
  selector3: ParametricSelector<S, P, R3>,
  selector4: ParametricSelector<S, P, R4>,
  selector5: ParametricSelector<S, P, R5>,
  selector6: ParametricSelector<S, P, R6>,
  selector7: ParametricSelector<S, P, R7>,
  selector8: ParametricSelector<S, P, R8>,
  selector9: ParametricSelector<S, P, R9>,
  selector10: ParametricSelector<S, P, R10>,
  selector11: ParametricSelector<S, P, R11>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T>;

/* twelve selectors */
// prettier-ignore
export function createUseSelector<S, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  selector3: Selector<S, R3>,
  selector4: Selector<S, R4>,
  selector5: Selector<S, R5>,
  selector6: Selector<S, R6>,
  selector7: Selector<S, R7>,
  selector8: Selector<S, R8>,
  selector9: Selector<S, R9>,
  selector10: Selector<S, R10>,
  selector11: Selector<S, R11>,
  selector12: Selector<S, R12>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T>;
// prettier-ignore
export function createUseSelector<S, P, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, T>(
  selector1: ParametricSelector<S, P, R1>,
  selector2: ParametricSelector<S, P, R2>,
  selector3: ParametricSelector<S, P, R3>,
  selector4: ParametricSelector<S, P, R4>,
  selector5: ParametricSelector<S, P, R5>,
  selector6: ParametricSelector<S, P, R6>,
  selector7: ParametricSelector<S, P, R7>,
  selector8: ParametricSelector<S, P, R8>,
  selector9: ParametricSelector<S, P, R9>,
  selector10: ParametricSelector<S, P, R10>,
  selector11: ParametricSelector<S, P, R11>,
  selector12: ParametricSelector<S, P, R12>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T>;

/* array argument */

/* one selector */
// prettier-ignore
export function createUseSelector<S, R1, T>(
  selectors: [Selector<S, R1>],
  combiner: (res: R1) => T,
): OutputSelector<S, T, (res: R1) => T>;
// prettier-ignore
export function createUseSelector<S, P, R1, T>(
  selectors: [ParametricSelector<S, P, R1>],
  combiner: (res: R1) => T,
): OutputParametricSelector<S, P, T, (res: R1) => T>;

/* two selectors */
// prettier-ignore
export function createUseSelector<S, R1, R2, T>(
  selectors: [Selector<S, R1>,
    Selector<S, R2>],
  combiner: (res1: R1, res2: R2) => T,
): OutputSelector<S, T, (res1: R1, res2: R2) => T>;
// prettier-ignore
export function createUseSelector<S, P, R1, R2, T>(
  selectors: [ParametricSelector<S, P, R1>,
    ParametricSelector<S, P, R2>],
  combiner: (res1: R1, res2: R2) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2) => T>;

/* three selectors */
// prettier-ignore
export function createUseSelector<S, R1, R2, R3, T>(
  selectors: [Selector<S, R1>,
    Selector<S, R2>,
    Selector<S, R3>],
  combiner: (res1: R1, res2: R2, res3: R3) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3) => T>;
// prettier-ignore
export function createUseSelector<S, P, R1, R2, R3, T>(
  selectors: [ParametricSelector<S, P, R1>,
    ParametricSelector<S, P, R2>,
    ParametricSelector<S, P, R3>],
  combiner: (res1: R1, res2: R2, res3: R3) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3) => T>;

/* four selectors */
// prettier-ignore
export function createUseSelector<S, R1, R2, R3, R4, T>(
  selectors: [Selector<S, R1>,
    Selector<S, R2>,
    Selector<S, R3>,
    Selector<S, R4>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4) => T>;
// prettier-ignore
export function createUseSelector<S, P, R1, R2, R3, R4, T>(
  selectors: [ParametricSelector<S, P, R1>,
    ParametricSelector<S, P, R2>,
    ParametricSelector<S, P, R3>,
    ParametricSelector<S, P, R4>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4) => T>;

/* five selectors */
// prettier-ignore
export function createUseSelector<S, R1, R2, R3, R4, R5, T>(
  selectors: [Selector<S, R1>,
    Selector<S, R2>,
    Selector<S, R3>,
    Selector<S, R4>,
    Selector<S, R5>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T>;
// prettier-ignore
export function createUseSelector<S, P, R1, R2, R3, R4, R5, T>(
  selectors: [ParametricSelector<S, P, R1>,
    ParametricSelector<S, P, R2>,
    ParametricSelector<S, P, R3>,
    ParametricSelector<S, P, R4>,
    ParametricSelector<S, P, R5>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T>;

/* six selectors */
// prettier-ignore
export function createUseSelector<S, R1, R2, R3, R4, R5, R6, T>(
  selectors: [Selector<S, R1>,
    Selector<S, R2>,
    Selector<S, R3>,
    Selector<S, R4>,
    Selector<S, R5>,
    Selector<S, R6>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T>;
// prettier-ignore
export function createUseSelector<S, P, R1, R2, R3, R4, R5, R6, T>(
  selectors: [ParametricSelector<S, P, R1>,
    ParametricSelector<S, P, R2>,
    ParametricSelector<S, P, R3>,
    ParametricSelector<S, P, R4>,
    ParametricSelector<S, P, R5>,
    ParametricSelector<S, P, R6>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T>;

/* seven selectors */
// prettier-ignore
export function createUseSelector<S, R1, R2, R3, R4, R5, R6, R7, T>(
  selectors: [Selector<S, R1>,
    Selector<S, R2>,
    Selector<S, R3>,
    Selector<S, R4>,
    Selector<S, R5>,
    Selector<S, R6>,
    Selector<S, R7>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7) => T>;
// prettier-ignore
export function createUseSelector<S, P, R1, R2, R3, R4, R5, R6, R7, T>(
  selectors: [ParametricSelector<S, P, R1>,
    ParametricSelector<S, P, R2>,
    ParametricSelector<S, P, R3>,
    ParametricSelector<S, P, R4>,
    ParametricSelector<S, P, R5>,
    ParametricSelector<S, P, R6>,
    ParametricSelector<S, P, R7>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7) => T>;

/* eight selectors */
// prettier-ignore
export function createUseSelector<S, R1, R2, R3, R4, R5, R6, R7, R8, T>(
  selectors: [Selector<S, R1>,
    Selector<S, R2>,
    Selector<S, R3>,
    Selector<S, R4>,
    Selector<S, R5>,
    Selector<S, R6>,
    Selector<S, R7>,
    Selector<S, R8>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8) => T>;
// prettier-ignore
export function createUseSelector<S, P, R1, R2, R3, R4, R5, R6, R7, R8, T>(
  selectors: [ParametricSelector<S, P, R1>,
    ParametricSelector<S, P, R2>,
    ParametricSelector<S, P, R3>,
    ParametricSelector<S, P, R4>,
    ParametricSelector<S, P, R5>,
    ParametricSelector<S, P, R6>,
    ParametricSelector<S, P, R7>,
    ParametricSelector<S, P, R8>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8) => T>;

/* nine selectors */
// prettier-ignore
export function createUseSelector<S, R1, R2, R3, R4, R5, R6, R7, R8, R9, T>(
  selectors: [Selector<S, R1>,
    Selector<S, R2>,
    Selector<S, R3>,
    Selector<S, R4>,
    Selector<S, R5>,
    Selector<S, R6>,
    Selector<S, R7>,
    Selector<S, R8>,
    Selector<S, R9>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9) => T>;
// prettier-ignore
export function createUseSelector<S, P, R1, R2, R3, R4, R5, R6, R7, R8, R9, T>(
  selectors: [ParametricSelector<S, P, R1>,
    ParametricSelector<S, P, R2>,
    ParametricSelector<S, P, R3>,
    ParametricSelector<S, P, R4>,
    ParametricSelector<S, P, R5>,
    ParametricSelector<S, P, R6>,
    ParametricSelector<S, P, R7>,
    ParametricSelector<S, P, R8>,
    ParametricSelector<S, P, R9>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9) => T>;

/* ten selectors */
// prettier-ignore
export function createUseSelector<S, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, T>(
  selectors: [Selector<S, R1>,
    Selector<S, R2>,
    Selector<S, R3>,
    Selector<S, R4>,
    Selector<S, R5>,
    Selector<S, R6>,
    Selector<S, R7>,
    Selector<S, R8>,
    Selector<S, R9>,
    Selector<S, R10>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9, res10: R10) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9, res10: R10) => T>;
// prettier-ignore
export function createUseSelector<S, P, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, T>(
  selectors: [ParametricSelector<S, P, R1>,
    ParametricSelector<S, P, R2>,
    ParametricSelector<S, P, R3>,
    ParametricSelector<S, P, R4>,
    ParametricSelector<S, P, R5>,
    ParametricSelector<S, P, R6>,
    ParametricSelector<S, P, R7>,
    ParametricSelector<S, P, R8>,
    ParametricSelector<S, P, R9>,
    ParametricSelector<S, P, R10>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9, res10: R10) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9, res10: R10) => T>;

/* eleven selectors */
// prettier-ignore
export function createUseSelector<S, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, T>(
  selectors: [Selector<S, R1>,
    Selector<S, R2>,
    Selector<S, R3>,
    Selector<S, R4>,
    Selector<S, R5>,
    Selector<S, R6>,
    Selector<S, R7>,
    Selector<S, R8>,
    Selector<S, R9>,
    Selector<S, R10>,
    Selector<S, R11>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T>;
// prettier-ignore
export function createUseSelector<S, P, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, T>(
  selectors: [ParametricSelector<S, P, R1>,
    ParametricSelector<S, P, R2>,
    ParametricSelector<S, P, R3>,
    ParametricSelector<S, P, R4>,
    ParametricSelector<S, P, R5>,
    ParametricSelector<S, P, R6>,
    ParametricSelector<S, P, R7>,
    ParametricSelector<S, P, R8>,
    ParametricSelector<S, P, R9>,
    ParametricSelector<S, P, R10>,
    ParametricSelector<S, P, R11>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T>;

/* twelve selectors */
// prettier-ignore
export function createUseSelector<S, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, T>(
  selectors: [Selector<S, R1>,
    Selector<S, R2>,
    Selector<S, R3>,
    Selector<S, R4>,
    Selector<S, R5>,
    Selector<S, R6>,
    Selector<S, R7>,
    Selector<S, R8>,
    Selector<S, R9>,
    Selector<S, R10>,
    Selector<S, R11>,
    Selector<S, R12>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T>;
// prettier-ignore
export function createUseSelector<S, P, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, T>(
  selectors: [ParametricSelector<S, P, R1>,
    ParametricSelector<S, P, R2>,
    ParametricSelector<S, P, R3>,
    ParametricSelector<S, P, R4>,
    ParametricSelector<S, P, R5>,
    ParametricSelector<S, P, R6>,
    ParametricSelector<S, P, R7>,
    ParametricSelector<S, P, R8>,
    ParametricSelector<S, P, R9>,
    ParametricSelector<S, P, R10>,
    ParametricSelector<S, P, R11>,
    ParametricSelector<S, P, R12>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
    res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
  res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T>;

/* heterogeneous selector parameter types */

/* one selector */
// prettier-ignore
export function createUseSelector<S1, R1, T>(
  selector1: Selector<S1, R1>,
  combiner: (res1: R1) => T,
): OutputSelector<S1, T, (res1: R1) => T>;
// prettier-ignore
export function createUseSelector<S1, P1, R1, T>(
  selector1: ParametricSelector<S1, P1, R1>,
  combiner: (res1: R1) => T,
): OutputParametricSelector<S1, P1, T, (res1: R1) => T>;

/* two selector */
// prettier-ignore
export function createUseSelector<S1, S2, R1, R2, T>(
  selector1: Selector<S1, R1>,
  selector2: Selector<S2, R2>,
  combiner: (res1: R1, res2: R2) => T,
): OutputSelector<S1 & S2, T, (res1: R1, res2: R2) => T>;
// prettier-ignore
export function createUseSelector<S1, S2, P1, P2, R1, R2, T>(
  selector1: ParametricSelector<S1, P1, R1>,
  selector2: ParametricSelector<S2, P2, R2>,
  combiner: (res1: R1, res2: R2) => T,
): OutputParametricSelector<S1 & S2, P1 & P2, T, (res1: R1, res2: R2) => T>;

/* three selector */
// prettier-ignore
export function createUseSelector<S1, S2, S3, R1, R2, R3, T>(
  selector1: Selector<S1, R1>,
  selector2: Selector<S2, R2>,
  selector3: Selector<S3, R3>,
  combiner: (res1: R1, res2: R2, res3: R3) => T,
): OutputSelector<S1 & S2 & S3, T, (res1: R1, res2: R2, res3: R3) => T>;
// prettier-ignore
export function createUseSelector<S1, S2, S3, P1, P2, P3, R1, R2, R3, T>(
  selector1: ParametricSelector<S1, P1, R1>,
  selector2: ParametricSelector<S2, P2, R2>,
  selector3: ParametricSelector<S3, P3, R3>,
  combiner: (res1: R1, res2: R2, res3: R3) => T,
): OutputParametricSelector<S1 & S2 & S3, P1 & P2 & P3, T, (res1: R1, res2: R2, res3: R3) => T>;

/* four selector */
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, R1, R2, R3, R4, T>(
  selector1: Selector<S1, R1>,
  selector2: Selector<S2, R2>,
  selector3: Selector<S3, R3>,
  selector4: Selector<S4, R4>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4) => T,
): OutputSelector<S1 & S2 & S3 & S4, T, (res1: R1, res2: R2, res3: R3, res4: R4) => T>;
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, P1, P2, P3, P4, R1, R2, R3, R4, T>(
  selector1: ParametricSelector<S1, P1, R1>,
  selector2: ParametricSelector<S2, P2, R2>,
  selector3: ParametricSelector<S3, P3, R3>,
  selector4: ParametricSelector<S4, P4, R4>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4) => T,
): OutputParametricSelector<S1 & S2 & S3 & S4, P1 & P2 & P3 & P4, T, (res1: R1, res2: R2, res3: R3, res4: R4) => T>;

/* five selector */
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, R1, R2, R3, R4, R5, T>(
  selector1: Selector<S1, R1>,
  selector2: Selector<S2, R2>,
  selector3: Selector<S3, R3>,
  selector4: Selector<S4, R4>,
  selector5: Selector<S5, R5>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T,
): OutputSelector<S1 & S2 & S3 & S4 & S5, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T>;
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, P1, P2, P3, P4, P5, R1, R2, R3, R4, R5, T>(
  selector1: ParametricSelector<S1, P1, R1>,
  selector2: ParametricSelector<S2, P2, R2>,
  selector3: ParametricSelector<S3, P3, R3>,
  selector4: ParametricSelector<S4, P4, R4>,
  selector5: ParametricSelector<S5, P5, R5>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T,
): OutputParametricSelector<S1 & S2 & S3 & S4 & S5, P1 & P2 & P3 & P4 & P5, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T>;

/* six selector */
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, S6, R1, R2, R3, R4, R5, R6, T>(
  selector1: Selector<S1, R1>,
  selector2: Selector<S2, R2>,
  selector3: Selector<S3, R3>,
  selector4: Selector<S4, R4>,
  selector5: Selector<S5, R5>,
  selector6: Selector<S6, R6>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T,
): OutputSelector<S1 & S2 & S3 & S4 & S5 & S6, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T>;
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, S6, P1, P2, P3, P4, P5, P6, R1, R2, R3, R4, R5, R6, T>(
  selector1: ParametricSelector<S1, P1, R1>,
  selector2: ParametricSelector<S2, P2, R2>,
  selector3: ParametricSelector<S3, P3, R3>,
  selector4: ParametricSelector<S4, P4, R4>,
  selector5: ParametricSelector<S5, P5, R5>,
  selector6: ParametricSelector<S6, P6, R6>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T,
): OutputParametricSelector<S1 & S2 & S3 & S4 & S5 & S6, P1 & P2 & P3 & P4 & P5 & P6, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T>;

/* seven selector */
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, S6, S7, R1, R2, R3, R4, R5, R6, R7, T>(
  selector1: Selector<S1, R1>,
  selector2: Selector<S2, R2>,
  selector3: Selector<S3, R3>,
  selector4: Selector<S4, R4>,
  selector5: Selector<S5, R5>,
  selector6: Selector<S6, R6>,
  selector7: Selector<S7, R7>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7) => T,
): OutputSelector<S1 & S2 & S3 & S4 & S5 & S6 & S7, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7) => T>;
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, S6, S7, P1, P2, P3, P4, P5, P6, P7, R1, R2, R3, R4, R5, R6, R7, T>(
  selector1: ParametricSelector<S1, P1, R1>,
  selector2: ParametricSelector<S2, P2, R2>,
  selector3: ParametricSelector<S3, P3, R3>,
  selector4: ParametricSelector<S4, P4, R4>,
  selector5: ParametricSelector<S5, P5, R5>,
  selector6: ParametricSelector<S6, P6, R6>,
  selector7: ParametricSelector<S7, P7, R7>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7) => T,
): OutputParametricSelector<S1 & S2 & S3 & S4 & S5 & S6 & S7, P1 & P2 & P3 & P4 & P5 & P6 & P7, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7) => T>;

/* eight selector */
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, S6, S7, S8, R1, R2, R3, R4, R5, R6, R7, R8, T>(
  selector1: Selector<S1, R1>,
  selector2: Selector<S2, R2>,
  selector3: Selector<S3, R3>,
  selector4: Selector<S4, R4>,
  selector5: Selector<S5, R5>,
  selector6: Selector<S6, R6>,
  selector7: Selector<S7, R7>,
  selector8: Selector<S8, R8>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8) => T,
): OutputSelector<S1 & S2 & S3 & S4 & S5 & S6 & S7 & S8, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8) => T>;
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, S6, S7, S8, P1, P2, P3, P4, P5, P6, P7, P8, R1, R2, R3, R4, R5, R6, R7, R8, T>(
  selector1: ParametricSelector<S1, P1, R1>,
  selector2: ParametricSelector<S2, P2, R2>,
  selector3: ParametricSelector<S3, P3, R3>,
  selector4: ParametricSelector<S4, P4, R4>,
  selector5: ParametricSelector<S5, P5, R5>,
  selector6: ParametricSelector<S6, P6, R6>,
  selector7: ParametricSelector<S7, P7, R7>,
  selector8: ParametricSelector<S8, P8, R8>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8) => T,
): OutputParametricSelector<S1 & S2 & S3 & S4 & S5 & S6 & S7 & S8, P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8) => T>;

/* nine selector */
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, S6, S7, S8, S9, R1, R2, R3, R4, R5, R6, R7, R8, R9, T>(
  selector1: Selector<S1, R1>,
  selector2: Selector<S2, R2>,
  selector3: Selector<S3, R3>,
  selector4: Selector<S4, R4>,
  selector5: Selector<S5, R5>,
  selector6: Selector<S6, R6>,
  selector7: Selector<S7, R7>,
  selector8: Selector<S8, R8>,
  selector9: Selector<S9, R9>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9) => T,
): OutputSelector<S1 & S2 & S3 & S4 & S5 & S6 & S7 & S8 & S9, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9) => T>;
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, S6, S7, S8, S9, P1, P2, P3, P4, P5, P6, P7, P8, P9, R1, R2, R3, R4, R5, R6, R7, R8, R9, T>(
  selector1: ParametricSelector<S1, P1, R1>,
  selector2: ParametricSelector<S2, P2, R2>,
  selector3: ParametricSelector<S3, P3, R3>,
  selector4: ParametricSelector<S4, P4, R4>,
  selector5: ParametricSelector<S5, P5, R5>,
  selector6: ParametricSelector<S6, P6, R6>,
  selector7: ParametricSelector<S7, P7, R7>,
  selector8: ParametricSelector<S8, P8, R8>,
  selector9: ParametricSelector<S9, P9, R9>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9) => T,
): OutputParametricSelector<S1 & S2 & S3 & S4 & S5 & S6 & S7 & S8 & S9, P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9) => T>;

/* ten selector */
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, T>(
  selector1: Selector<S1, R1>,
  selector2: Selector<S2, R2>,
  selector3: Selector<S3, R3>,
  selector4: Selector<S4, R4>,
  selector5: Selector<S5, R5>,
  selector6: Selector<S6, R6>,
  selector7: Selector<S7, R7>,
  selector8: Selector<S8, R8>,
  selector9: Selector<S9, R9>,
  selector10: Selector<S10, R10>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10) => T,
): OutputSelector<S1 & S2 & S3 & S4 & S5 & S6 & S7 & S8 & S9 & S10, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10) => T>;
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, T>(
  selector1: ParametricSelector<S1, P1, R1>,
  selector2: ParametricSelector<S2, P2, R2>,
  selector3: ParametricSelector<S3, P3, R3>,
  selector4: ParametricSelector<S4, P4, R4>,
  selector5: ParametricSelector<S5, P5, R5>,
  selector6: ParametricSelector<S6, P6, R6>,
  selector7: ParametricSelector<S7, P7, R7>,
  selector8: ParametricSelector<S8, P8, R8>,
  selector9: ParametricSelector<S9, P9, R9>,
  selector10: ParametricSelector<S10, P10, R10>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10) => T,
): OutputParametricSelector<S1 & S2 & S3 & S4 & S5 & S6 & S7 & S8 & S9 & S10, P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10) => T>;

/* eleven selector */
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, T>(
  selector1: Selector<S1, R1>,
  selector2: Selector<S2, R2>,
  selector3: Selector<S3, R3>,
  selector4: Selector<S4, R4>,
  selector5: Selector<S5, R5>,
  selector6: Selector<S6, R6>,
  selector7: Selector<S7, R7>,
  selector8: Selector<S8, R8>,
  selector9: Selector<S9, R9>,
  selector10: Selector<S10, R10>,
  selector11: Selector<S11, R11>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T,
): OutputSelector<S1 & S2 & S3 & S4 & S5 & S6 & S7 & S8 & S9 & S10 & S11, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T>;
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, T>(
  selector1: ParametricSelector<S1, P1, R1>,
  selector2: ParametricSelector<S2, P2, R2>,
  selector3: ParametricSelector<S3, P3, R3>,
  selector4: ParametricSelector<S4, P4, R4>,
  selector5: ParametricSelector<S5, P5, R5>,
  selector6: ParametricSelector<S6, P6, R6>,
  selector7: ParametricSelector<S7, P7, R7>,
  selector8: ParametricSelector<S8, P8, R8>,
  selector9: ParametricSelector<S9, P9, R9>,
  selector10: ParametricSelector<S10, P10, R10>,
  selector11: ParametricSelector<S11, P11, R11>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T,
): OutputParametricSelector<S1 & S2 & S3 & S4 & S5 & S6 & S7 & S8 & S9 & S10 & S11, P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T>;

/* twelve selector */
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, T>(
  selector1: Selector<S1, R1>,
  selector2: Selector<S2, R2>,
  selector3: Selector<S3, R3>,
  selector4: Selector<S4, R4>,
  selector5: Selector<S5, R5>,
  selector6: Selector<S6, R6>,
  selector7: Selector<S7, R7>,
  selector8: Selector<S8, R8>,
  selector9: Selector<S9, R9>,
  selector10: Selector<S10, R10>,
  selector11: Selector<S11, R11>,
  selector12: Selector<S12, R12>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T,
): OutputSelector<S1 & S2 & S3 & S4 & S5 & S6 & S7 & S8 & S9 & S10 & S11 & S12, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T>;
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, T>(
  selector1: ParametricSelector<S1, P1, R1>,
  selector2: ParametricSelector<S2, P2, R2>,
  selector3: ParametricSelector<S3, P3, R3>,
  selector4: ParametricSelector<S4, P4, R4>,
  selector5: ParametricSelector<S5, P5, R5>,
  selector6: ParametricSelector<S6, P6, R6>,
  selector7: ParametricSelector<S7, P7, R7>,
  selector8: ParametricSelector<S8, P8, R8>,
  selector9: ParametricSelector<S9, P9, R9>,
  selector10: ParametricSelector<S10, P10, R10>,
  selector11: ParametricSelector<S11, P11, R11>,
  selector12: ParametricSelector<S12, P12, R12>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T,
): OutputParametricSelector<S1 & S2 & S3 & S4 & S5 & S6 & S7 & S8 & S9 & S10 & S11 & S12, P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11 & P12, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T>;

/* array argument */

/* one selector */
// prettier-ignore
export function createUseSelector<S1, R1, T>(
  selectors: [Selector<S1, R1>],
  combiner: (res1: R1) => T,
): OutputSelector<S1, T, (res1: R1) => T>;
// prettier-ignore
export function createUseSelector<S1, P1, R1, T>(
  selectors: [ParametricSelector<S1, P1, R1>],
  combiner: (res1: R1) => T,
): OutputParametricSelector<S1, P1, T, (res1: R1) => T>;

/* two selector */
// prettier-ignore
export function createUseSelector<S1, S2, R1, R2, T>(
  selectors: [Selector<S1, R1>, Selector<S2, R2>],
  combiner: (res1: R1, res2: R2) => T,
): OutputSelector<S1 & S2, T, (res1: R1, res2: R2) => T>;
// prettier-ignore
export function createUseSelector<S1, S2, P1, P2, R1, R2, T>(
  selectors: [ParametricSelector<S1, P1, R1>, ParametricSelector<S2, P2, R2>],
  combiner: (res1: R1, res2: R2) => T,
): OutputParametricSelector<S1 & S2, P1 & P2, T, (res1: R1, res2: R2) => T>;

/* three selector */
// prettier-ignore
export function createUseSelector<S1, S2, S3, R1, R2, R3, T>(
  selectors: [Selector<S1, R1>, Selector<S2, R2>, Selector<S3, R3>],
  combiner: (res1: R1, res2: R2, res3: R3) => T,
): OutputSelector<S1 & S2 & S3, T, (res1: R1, res2: R2, res3: R3) => T>;
// prettier-ignore
export function createUseSelector<S1, S2, S3, P1, P2, P3, R1, R2, R3, T>(
  selectors: [ParametricSelector<S1, P1, R1>, ParametricSelector<S2, P2, R2>, ParametricSelector<S3, P3, R3>],
  combiner: (res1: R1, res2: R2, res3: R3) => T,
): OutputParametricSelector<S1 & S2 & S3, P1 & P2 & P3, T, (res1: R1, res2: R2, res3: R3) => T>;

/* four selector */
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, R1, R2, R3, R4, T>(
  selectors: [Selector<S1, R1>, Selector<S2, R2>, Selector<S3, R3>, Selector<S4, R4>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4) => T,
): OutputSelector<S1 & S2 & S3 & S4, T, (res1: R1, res2: R2, res3: R3, res4: R4) => T>;
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, P1, P2, P3, P4, R1, R2, R3, R4, T>(
  selectors: [ParametricSelector<S1, P1, R1>, ParametricSelector<S2, P2, R2>, ParametricSelector<S3, P3, R3>, ParametricSelector<S4, P4, R4>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4) => T,
): OutputParametricSelector<S1 & S2 & S3 & S4, P1 & P2 & P3 & P4, T, (res1: R1, res2: R2, res3: R3, res4: R4) => T>;

/* five selector */
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, R1, R2, R3, R4, R5, T>(
  selectors: [Selector<S1, R1>, Selector<S2, R2>, Selector<S3, R3>, Selector<S4, R4>, Selector<S5, R5>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T,
): OutputSelector<S1 & S2 & S3 & S4 & S5, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T>;
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, P1, P2, P3, P4, P5, R1, R2, R3, R4, R5, T>(
  selectors: [ParametricSelector<S1, P1, R1>, ParametricSelector<S2, P2, R2>, ParametricSelector<S3, P3, R3>, ParametricSelector<S4, P4, R4>, ParametricSelector<S5, P5, R5>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T,
): OutputParametricSelector<S1 & S2 & S3 & S4 & S5, P1 & P2 & P3 & P4 & P5, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T>;

/* six selector */
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, S6, R1, R2, R3, R4, R5, R6, T>(
  selectors: [Selector<S1, R1>, Selector<S2, R2>, Selector<S3, R3>, Selector<S4, R4>, Selector<S5, R5>, Selector<S6, R6>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T,
): OutputSelector<S1 & S2 & S3 & S4 & S5 & S6, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T>;
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, S6, P1, P2, P3, P4, P5, P6, R1, R2, R3, R4, R5, R6, T>(
  selectors: [ParametricSelector<S1, P1, R1>, ParametricSelector<S2, P2, R2>, ParametricSelector<S3, P3, R3>, ParametricSelector<S4, P4, R4>, ParametricSelector<S5, P5, R5>, ParametricSelector<S6, P6, R6>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T,
): OutputParametricSelector<S1 & S2 & S3 & S4 & S5 & S6, P1 & P2 & P3 & P4 & P5 & P6, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T>;

/* seven selector */
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, S6, S7, R1, R2, R3, R4, R5, R6, R7, T>(
  selectors: [Selector<S1, R1>, Selector<S2, R2>, Selector<S3, R3>, Selector<S4, R4>, Selector<S5, R5>, Selector<S6, R6>, Selector<S7, R7>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7) => T,
): OutputSelector<S1 & S2 & S3 & S4 & S5 & S6 & S7, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7) => T>;
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, S6, S7, P1, P2, P3, P4, P5, P6, P7, R1, R2, R3, R4, R5, R6, R7, T>(
  selectors: [ParametricSelector<S1, P1, R1>, ParametricSelector<S2, P2, R2>, ParametricSelector<S3, P3, R3>, ParametricSelector<S4, P4, R4>, ParametricSelector<S5, P5, R5>, ParametricSelector<S6, P6, R6>, ParametricSelector<S7, P7, R7>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7) => T,
): OutputParametricSelector<S1 & S2 & S3 & S4 & S5 & S6 & S7, P1 & P2 & P3 & P4 & P5 & P6 & P7, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7) => T>;

/* eight selector */
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, S6, S7, S8, R1, R2, R3, R4, R5, R6, R7, R8, T>(
  selectors: [Selector<S1, R1>, Selector<S2, R2>, Selector<S3, R3>, Selector<S4, R4>, Selector<S5, R5>, Selector<S6, R6>, Selector<S7, R7>, Selector<S8, R8>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8) => T,
): OutputSelector<S1 & S2 & S3 & S4 & S5 & S6 & S7 & S8, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8) => T>;
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, S6, S7, S8, P1, P2, P3, P4, P5, P6, P7, P8, R1, R2, R3, R4, R5, R6, R7, R8, T>(
  selectors: [ParametricSelector<S1, P1, R1>, ParametricSelector<S2, P2, R2>, ParametricSelector<S3, P3, R3>, ParametricSelector<S4, P4, R4>, ParametricSelector<S5, P5, R5>, ParametricSelector<S6, P6, R6>, ParametricSelector<S7, P7, R7>, ParametricSelector<S8, P8, R8>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8) => T,
): OutputParametricSelector<S1 & S2 & S3 & S4 & S5 & S6 & S7 & S8, P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8) => T>;

/* nine selector */
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, S6, S7, S8, S9, R1, R2, R3, R4, R5, R6, R7, R8, R9, T>(
  selectors: [Selector<S1, R1>, Selector<S2, R2>, Selector<S3, R3>, Selector<S4, R4>, Selector<S5, R5>, Selector<S6, R6>, Selector<S7, R7>, Selector<S8, R8>, Selector<S9, R9>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9) => T,
): OutputSelector<S1 & S2 & S3 & S4 & S5 & S6 & S7 & S8 & S9, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9) => T>;
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, S6, S7, S8, S9, P1, P2, P3, P4, P5, P6, P7, P8, P9, R1, R2, R3, R4, R5, R6, R7, R8, R9, T>(
  selectors: [ParametricSelector<S1, P1, R1>, ParametricSelector<S2, P2, R2>, ParametricSelector<S3, P3, R3>, ParametricSelector<S4, P4, R4>, ParametricSelector<S5, P5, R5>, ParametricSelector<S6, P6, R6>, ParametricSelector<S7, P7, R7>, ParametricSelector<S8, P8, R8>, ParametricSelector<S9, P9, R9>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9) => T,
): OutputParametricSelector<S1 & S2 & S3 & S4 & S5 & S6 & S7 & S8 & S9, P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9) => T>;

/* ten selector */
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, T>(
  selectors: [Selector<S1, R1>, Selector<S2, R2>, Selector<S3, R3>, Selector<S4, R4>, Selector<S5, R5>, Selector<S6, R6>, Selector<S7, R7>, Selector<S8, R8>, Selector<S9, R9>, Selector<S10, R10>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10) => T,
): OutputSelector<S1 & S2 & S3 & S4 & S5 & S6 & S7 & S8 & S9 & S10, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10) => T>;
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, T>(
  selectors: [ParametricSelector<S1, P1, R1>, ParametricSelector<S2, P2, R2>, ParametricSelector<S3, P3, R3>, ParametricSelector<S4, P4, R4>, ParametricSelector<S5, P5, R5>, ParametricSelector<S6, P6, R6>, ParametricSelector<S7, P7, R7>, ParametricSelector<S8, P8, R8>, ParametricSelector<S9, P9, R9>, ParametricSelector<S10, P10, R10>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10) => T,
): OutputParametricSelector<S1 & S2 & S3 & S4 & S5 & S6 & S7 & S8 & S9 & S10, P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10) => T>;

/* eleven selector */
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, T>(
  selectors: [Selector<S1, R1>, Selector<S2, R2>, Selector<S3, R3>, Selector<S4, R4>, Selector<S5, R5>, Selector<S6, R6>, Selector<S7, R7>, Selector<S8, R8>, Selector<S9, R9>, Selector<S10, R10>, Selector<S11, R11>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T,
): OutputSelector<S1 & S2 & S3 & S4 & S5 & S6 & S7 & S8 & S9 & S10 & S11, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T>;
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, T>(
  selectors: [ParametricSelector<S1, P1, R1>, ParametricSelector<S2, P2, R2>, ParametricSelector<S3, P3, R3>, ParametricSelector<S4, P4, R4>, ParametricSelector<S5, P5, R5>, ParametricSelector<S6, P6, R6>, ParametricSelector<S7, P7, R7>, ParametricSelector<S8, P8, R8>, ParametricSelector<S9, P9, R9>, ParametricSelector<S10, P10, R10>, ParametricSelector<S11, P11, R11>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T,
): OutputParametricSelector<S1 & S2 & S3 & S4 & S5 & S6 & S7 & S8 & S9 & S10 & S11, P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T>;

/* twelve selector */
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, T>(
  selectors: [Selector<S1, R1>, Selector<S2, R2>, Selector<S3, R3>, Selector<S4, R4>, Selector<S5, R5>, Selector<S6, R6>, Selector<S7, R7>, Selector<S8, R8>, Selector<S9, R9>, Selector<S10, R10>, Selector<S11, R11>, Selector<S12, R12>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T,
): OutputSelector<S1 & S2 & S3 & S4 & S5 & S6 & S7 & S8 & S9 & S10 & S11 & S12, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T>;
// prettier-ignore
export function createUseSelector<S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, T>(
  selectors: [ParametricSelector<S1, P1, R1>, ParametricSelector<S2, P2, R2>, ParametricSelector<S3, P3, R3>, ParametricSelector<S4, P4, R4>, ParametricSelector<S5, P5, R5>, ParametricSelector<S6, P6, R6>, ParametricSelector<S7, P7, R7>, ParametricSelector<S8, P8, R8>, ParametricSelector<S9, P9, R9>, ParametricSelector<S10, P10, R10>, ParametricSelector<S11, P11, R11>, ParametricSelector<S12, P12, R12>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T,
): OutputParametricSelector<S1 & S2 & S3 & S4 & S5 & S6 & S7 & S8 & S9 & S10 & S11 & S12, P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11 & P12, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6, res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T>;

/* any number of uniform selectors */
// prettier-ignore
export function createUseSelector<S, R, T>(
  selectors: Selector<S, R>[],
  combiner: (...res: R[]) => T,
): OutputSelector<S, T, (...res: R[]) => T>;
// prettier-ignore
export function createUseSelector<S, P, R, T>(
  selectors: ParametricSelector<S, P, R>[],
  combiner: (...res: R[]) => T,
): OutputParametricSelector<S, P, T, (...res: R[]) => T>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export function createUseSelector(...args) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const selector = createArraySelector(...args)
  const selectorUse = selector as typeof selector & {
    use: () => ReturnType<typeof selector>
  }
  selectorUse.use = function useData() {
    return useSelector(selector)
  }
  return selectorUse
}

export function compareArrays(a: unknown, b: unknown) {
  if (Object.is(a, b)) return true

  if (Array.isArray(a) && Array.isArray(b)) {
    return (
      a.length === b.length &&
      a.every((value, index) => Object.is(value, b[index]))
    )
  }

  return false
}

const createArraySelector = createSelectorCreator(defaultMemoize, compareArrays)
