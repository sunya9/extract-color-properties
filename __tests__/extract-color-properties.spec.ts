import * as fs from 'fs'
import * as postcss from 'postcss'
import {
  plugin,
  extractColorProperties,
  Options,
} from '../lib/extract-color-properties'
import * as path from 'path'

const inputCSSPath = path.resolve(__dirname, './fixtures/input.css')
const outputCSSPath = path.resolve(__dirname, './fixtures/output.css')

const inputCSS = fs.readFileSync(inputCSSPath, { encoding: 'utf-8' })
const outputCSS = fs.readFileSync(outputCSSPath, { encoding: 'utf-8' })

describe('extract-color-properties', () => {
  const options: Options = { excludeProperties: ['height'] }
  test('as plugin', () => {
    const { css } = postcss([plugin(options)]).process(inputCSS, {
      from: undefined,
    })
    expect(css).toEqual(outputCSS)
  })
  test('as method', () => {
    const { css } = extractColorProperties(inputCSS, options)
    expect(css).toEqual(outputCSS)
  })
})
