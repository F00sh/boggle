import { _ as __nuxt_component_0 } from "./nuxt-link-Dmol5ao0.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import "C:/Users/Vili/Desktop/boggle/node_modules/ufo/dist/index.mjs";
import "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "C:/Users/Vili/Desktop/boggle/node_modules/hookable/dist/index.mjs";
import "C:/Users/Vili/Desktop/boggle/node_modules/unctx/dist/index.mjs";
import "C:/Users/Vili/Desktop/boggle/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/Users/Vili/Desktop/boggle/node_modules/radix3/dist/index.mjs";
import "C:/Users/Vili/Desktop/boggle/node_modules/defu/dist/defu.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen grid place-items-center p-6" }, _attrs))}><div class="w-full max-w-xl text-center"><h1 class="text-4xl font-bold mb-4">Boggle</h1><p class="text-slate-300 mb-8">4×4 rešetka sa slovima i odbrojavanjem (3 min). Poslednjih 20s – opasno upozorenje.</p><div class="bg-slate-800/70 rounded-xl p-6 border border-slate-700"><h2 class="text-xl font-semibold mb-2">Nova igra</h2><p class="text-slate-300 mb-6">Koristi slova: A B C Č Ć D Đ DŽ E F G H I J K L LJ M N NJ O P R S Š T U V Z Ž</p><div class="flex flex-col sm:flex-row items-center justify-center gap-3">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "px-5 py-3 rounded-lg bg-brand hover:bg-brand-dark transition-colors font-semibold",
        to: "/game"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Započni `);
          } else {
            return [
              createTextVNode(" Započni ")
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
export {
  _sfc_main as default
};
//# sourceMappingURL=index-C9D7o7cV.js.map
