import { isFunction } from '../../util/underscore'
import { Liquid } from '../../liquid'
import { TemplateImpl } from '../../template/template-impl'
import { Emitter, Hash, Context, TagImplOptions, TagToken, Template, Token } from '../../types'
import { TagImpl } from './tag-impl'

export class Tag extends TemplateImpl<TagToken> implements Template {
  public name: string
  private impl: TagImpl
  private static impls: { [key: string]: TagImplOptions } = {}

  public constructor (token: TagToken, tokens: Token[], liquid: Liquid) {
    super(token)
    this.name = token.name

    const impl = liquid.tags.get(token.name)

    this.impl = Object.create(impl)
    this.impl.liquid = liquid
    if (this.impl.parse) {
      this.impl.parse(token, tokens)
    }
  }
  public * render (ctx: Context, emitter: Emitter) {
    const hash = yield Hash.create(this.token.args, ctx)
    const impl = this.impl
    if (isFunction(impl.render)) return yield impl.render(ctx, hash, emitter)
  }
}
