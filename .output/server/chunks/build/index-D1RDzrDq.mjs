import { _ as __nuxt_component_0 } from './nuxt-link-Dmol5ao0.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen grid place-items-center p-6" }, _attrs))}><div class="w-full max-w-xl text-center"><h1 class="text-4xl font-bold mb-4">Boggle</h1><p class="text-slate-300 mb-8">4\xD74 re\u0161etka sa slovima i odbrojavanjem (3 min). Poslednjih 20s \u2013 opasno upozorenje.</p><div class="bg-slate-800/70 rounded-xl p-6 border border-slate-700"><h2 class="text-xl font-semibold mb-2">Nova igra</h2><p class="text-slate-300 mb-6">Koristi slova: A B C \u010C \u0106 D \u0110 D\u017D E F G H I J K L LJ M N NJ O P R S \u0160 T U V Z \u017D</p><div class="flex flex-col sm:flex-row items-center justify-center gap-3">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "px-5 py-3 rounded-lg bg-brand hover:bg-brand-dark transition-colors font-semibold",
        to: "/game"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Single Player `);
          } else {
            return [
              createTextVNode(" Single Player ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-D1RDzrDq.mjs.map
