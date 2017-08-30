import { incBeta } from 'mathfn'

/*

   This might be confusing: in negative binomial distribution,
   the "success" in our case means not getting the result we want.
   and "failure" means getting the intended result (wanted ship).

   - attemptCount: number of attempts in total,
     which means all "success" attempts and the last "failed" attempt

 */
const computeCDF = (dropRate, attemptCount) => {
  // probability of "success"
  const p = 1 - dropRate
  // just need one "failure"
  const r = 1
  return 1 - incBeta(p,attemptCount,r)
}

export { computeCDF }
