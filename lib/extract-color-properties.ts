import * as postcss from 'postcss'
import { colorProperties } from './color-properties'

interface Options {
  excludeProperties: string[]
}

export const plugin = postcss.plugin<Options>(
  'extract-color-properties',
  (options) => (root) => {
    function handleRoot(root: postcss.Root): postcss.Result {
      root.walkAtRules('media', handleAtRule)
      return root.toResult()
    }

    function handleAtRule(atRule: postcss.AtRule) {
      atRule.walkRules(handleRule)
    }

    function handleRule(rule: postcss.Rule) {
      rule.walkDecls(handleDecl)
      if (rule.nodes && rule.nodes.length > 0) return
      rule.remove()
    }

    function handleDecl(decl: postcss.Declaration) {
      if (
        colorProperties.includes(decl.prop) &&
        !options?.excludeProperties.includes(decl.prop)
      )
        return
      decl.remove()
    }
    return handleRoot(root)
  }
)

export function extractColorProperties(
  css: postcss.ParserInput | postcss.Result | postcss.LazyResult | postcss.Root,
  options?: postcss.ProcessOptions
) {
  return postcss([plugin()]).process(css, options)
}
