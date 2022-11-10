import { adtCaseFunction, adtConstructors, Fct } from './Fct'

test('Adt', () => {
  const adtSchema = Fct.object({ box: Fct.object({ value: Fct.number }), empty: Fct.object({}) })

  const ctors = adtConstructors(adtSchema)
  expect(ctors.empty({})).toStrictEqual({ type: 'empty' })
  expect(ctors.box({ value: 123 })).toStrictEqual({ type: 'box', value: 123 })

  const caseFunction = adtCaseFunction(adtSchema)
  expect(
    caseFunction(ctors.empty({}), {
      empty: () => 0,
      box: ({ value }) => value + 1,
    })
  ).toBe(0)
  expect(
    caseFunction(ctors.box({ value: 9 }), {
      empty: () => 0,
      box: ({ value }) => value + 1,
    })
  ).toBe(10)
})
