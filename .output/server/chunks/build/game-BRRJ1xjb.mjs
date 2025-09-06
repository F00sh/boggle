import { _ as __nuxt_component_0 } from './nuxt-link-Dmol5ao0.mjs';
import { defineComponent, useSSRContext, mergeProps, ref, computed, withCtx, createTextVNode, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "BoggleBoard",
  __ssrInlineRender: true,
  props: {
    board: {},
    disabled: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-4 gap-2 select-none" }, _attrs))}><!--[-->`);
      ssrRenderList(_ctx.board, (cell, idx) => {
        _push(`<div class="${ssrRenderClass([{
          "opacity-50": _ctx.disabled
        }, "aspect-square rounded-xl bg-slate-800 border border-slate-700 grid place-items-center text-2xl sm:text-3xl font-extrabold tracking-wide"])}">${ssrInterpolate(cell)}</div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BoggleBoard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "game",
  __ssrInlineRender: true,
  setup(__props) {
    const board = ref([]);
    const totalSeconds = ref(180);
    const remaining = ref(totalSeconds.value);
    const paused = ref(false);
    const finished = ref(false);
    const danger = computed(() => remaining.value <= 20 && !finished.value);
    const mm = computed(() => String(Math.floor(remaining.value / 60)).padStart(2, "0"));
    const ss = computed(() => String(remaining.value % 60).padStart(2, "0"));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen p-4 sm:p-6" }, _attrs))} data-v-85686f25><div class="max-w-3xl mx-auto" data-v-85686f25><div class="flex items-center justify-between mb-4" data-v-85686f25>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-slate-300 hover:text-white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u2190 Nova igra`);
          } else {
            return [
              createTextVNode("\u2190 Nova igra")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="text-2xl font-bold" data-v-85686f25>Boggle</h1><div class="w-24" data-v-85686f25></div></div><div class="bg-slate-800/70 rounded-xl p-4 sm:p-6 border border-slate-700" data-v-85686f25><div class="flex items-center justify-between gap-2 mb-4" data-v-85686f25><div class="flex items-center gap-3" data-v-85686f25><span class="text-slate-300" data-v-85686f25>Preostalo vreme:</span><span class="${ssrRenderClass(["text-2xl font-extrabold tabular-nums", unref(danger) ? "text-red-400" : "text-white"])}" data-v-85686f25>${ssrInterpolate(unref(mm))}:${ssrInterpolate(unref(ss))}</span></div><div class="flex items-center gap-2" data-v-85686f25><button class="px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600" data-v-85686f25>${ssrInterpolate(unref(paused) ? "Nastavi" : "Pauziraj")}</button><button class="px-3 py-2 rounded-lg bg-brand hover:bg-brand-dark" data-v-85686f25>Nova tabla</button></div></div><div class="grid place-items-center py-2" data-v-85686f25>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        board: unref(board),
        disabled: unref(paused) || unref(finished)
      }, null, _parent));
      _push(`</div>`);
      if (unref(finished)) {
        _push(`<div class="mt-4 text-center" data-v-85686f25><p class="text-xl font-semibold mb-3" data-v-85686f25>Vreme je isteklo!</p><button class="px-4 py-2 rounded-lg bg-brand hover:bg-brand-dark" data-v-85686f25>Igraj ponovo</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/game.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const game = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-85686f25"]]);

export { game as default };
//# sourceMappingURL=game-BRRJ1xjb.mjs.map
