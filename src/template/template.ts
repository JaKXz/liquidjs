import { Context } from '../context/context'
import { Token } from '../parser/token'
import { Emitter } from '../render/emitter'

export interface Template {
  token: Token;
  render(ctx: Context, emitter: Emitter): any;
}
