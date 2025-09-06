import { _ as __nuxt_component_0 } from './nuxt-link-Dmol5ao0.mjs';
import { defineComponent, useSSRContext, ref, computed, watch, mergeProps, unref, withCtx, createTextVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrRenderStyle, ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
    disabled: { type: Boolean },
    blurred: { type: Boolean },
    selected: {}
  },
  emits: ["cell-click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const rotations = ref([]);
    const selectedSet = computed(() => {
      var _a;
      return new Set((_a = props.selected) != null ? _a : []);
    });
    function regenRotations() {
      const choices = [0, 90, 180, 270];
      rotations.value = props.board.map(() => choices[Math.floor(Math.random() * choices.length)]);
    }
    watch(
      () => props.board,
      () => regenRotations(),
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto" }, _attrs))}><div class="p-3 border-[12px] border-orange-500 rounded-2xl bg-transparent"><div class="${ssrRenderClass([{ "blur-md": _ctx.blurred }, "grid grid-cols-4 gap-2 select-none transition filter"])}"><!--[-->`);
      ssrRenderList(_ctx.board, (cell, idx) => {
        var _a;
        _push(`<button type="button" class="${ssrRenderClass([[
          _ctx.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:shadow",
          unref(selectedSet).has(idx) ? "ring-4 ring-emerald-500 bg-emerald-100" : ""
        ], "aspect-square rounded-lg bg-white border border-slate-300 grid place-items-center text-2xl sm:text-3xl font-extrabold tracking-wide text-black focus:outline-none"])}" style="${ssrRenderStyle({ transform: `rotate(${(_a = unref(rotations)[idx]) != null ? _a : 0}deg)` })}">${ssrInterpolate(cell)}</button>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BoggleBoard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const LETTER_WEIGHTS = {
  A: 9,
  B: 2,
  C: 3,
  \u010C: 1,
  \u0106: 1,
  D: 4,
  D\u017D: 1,
  \u0110: 1,
  E: 9,
  F: 1,
  G: 2,
  H: 2,
  I: 8,
  J: 4,
  K: 4,
  L: 4,
  LJ: 1,
  M: 3,
  N: 5,
  NJ: 1,
  O: 8,
  P: 3,
  R: 5,
  S: 5,
  \u0160: 1,
  T: 5,
  U: 4,
  V: 3,
  Z: 2,
  \u017D: 1
};
const TOTAL_WEIGHT = Object.values(LETTER_WEIGHTS).reduce((a, b) => a + b, 0);
Object.fromEntries(
  Object.entries(LETTER_WEIGHTS).map(([letter, freq]) => [letter, freq / TOTAL_WEIGHT])
);
const WORDS = [
  "DOM",
  "KUCA",
  "KU\u0106A",
  "KUC\u0301A",
  "RIBA",
  "MORE",
  "PLAN",
  "STAN",
  "GRAD",
  "VODA",
  "ZORA",
  "ZUB",
  "ZBUN",
  "TRAVA",
  "STOL",
  "STOLAC",
  "KRUG",
  "SUNCE",
  "MJESEC",
  "ZVIJEZDA",
  "ZVEZDA",
  "LJUBAV",
  "NJIVA",
  "D\u017DEM",
  "D\u017DEPNI",
  "D\u017DEP",
  "NJEGOV",
  "LJETO",
  "LJESTVE",
  "LJILJAN",
  "JABUKA",
  "KRUH",
  "KRU\u0160KA",
  "KRUZ\u030CNO",
  "\u0160UMA",
  "\u0160UPA",
  "\u0160E\u0106ER",
  "SECER",
  "\u017DIRAFA",
  "\u017DELJA",
  "Z\u030CELJA",
  "\u010COVJEK",
  "COVJEK",
  "\u0106UP",
  "DJETE",
  "DIJETE",
  "IGRA",
  "IGRATI",
  "PISMO",
  "PISATI",
  "KNJIGA",
  "KNJIGE",
  "BRDO",
  "POLJE",
  "PUT",
  "PUTOVANJE",
  "RJEKA",
  "RIJEKA",
  "PTICA",
  "PTICE",
  "HLJEB",
  "ZUBAR",
  "DAN",
  "DANI",
  "NO\u0106",
  "NOC",
  "SNIJEG",
  "SNEG",
  "LED",
  "HLADNO",
  "TOPLO",
  "VATRA",
  "DIM",
  "TLO",
  "ZEMLJA",
  "NEBO"
];
function norm(word) {
  return (word || "").trim().toUpperCase();
}
new Set(WORDS.map(norm));
const size = 4;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "game",
  __ssrInlineRender: true,
  setup(__props) {
    const board = ref([]);
    const totalSeconds = ref(180);
    const remaining = ref(totalSeconds.value);
    const paused = ref(false);
    const finished = ref(false);
    const preparing = ref(false);
    const waiting = ref(true);
    const countdown = ref(3);
    const showRules = ref(false);
    const showWords = ref(false);
    const showScore = ref(false);
    const words = ref([]);
    const wordsSet = ref(/* @__PURE__ */ new Set());
    const selectedPath = ref([]);
    const errorMsg = ref("");
    const danger = computed(() => remaining.value <= 20 && !finished.value);
    const validating = ref(false);
    const hasSelection = computed(() => selectedPath.value.length > 0);
    const mm = computed(() => String(Math.floor(remaining.value / 60)).padStart(2, "0"));
    const ss = computed(() => String(remaining.value % 60).padStart(2, "0"));
    function rcFromIndex(i) {
      return { r: Math.floor(i / size), c: i % size };
    }
    function isAdjacent(a, b) {
      const A = rcFromIndex(a), B = rcFromIndex(b);
      const dr = Math.abs(A.r - B.r), dc = Math.abs(A.c - B.c);
      return (dr !== 0 || dc !== 0) && dr <= 1 && dc <= 1;
    }
    function onCellClick(idx) {
      errorMsg.value = "";
      if (waiting.value || preparing.value || paused.value || finished.value) return;
      const path = selectedPath.value;
      const last = path[path.length - 1];
      const already = path.indexOf(idx);
      if (already !== -1) {
        if (already === path.length - 1) {
          path.pop();
        }
        return;
      }
      if (path.length === 0 || isAdjacent(last, idx)) {
        path.push(idx);
      }
    }
    const currentWord = computed(() => selectedPath.value.map((i) => board.value[i]).join(""));
    const canAddWord = computed(() => currentWord.value.length >= 3 && !wordsSet.value.has(currentWord.value));
    function scoreForLength(len) {
      if (len >= 8) return 11;
      if (len === 7) return 5;
      if (len === 6) return 4;
      if (len === 5) return 3;
      if (len === 4) return 2;
      if (len === 3) return 1;
      return 0;
    }
    const totalScore = computed(() => words.value.reduce((sum, w) => sum + scoreForLength(w.length), 0));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<!--[--><div class="min-h-screen p-4 sm:p-6" data-v-272caa2b><div class="max-w-3xl mx-auto" data-v-272caa2b><div class="flex items-center justify-between mb-4" data-v-272caa2b>`);
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
      _push(`<h1 class="text-2xl font-bold" data-v-272caa2b>Boggle</h1><div class="w-24" data-v-272caa2b></div></div><div class="bg-slate-800/70 rounded-xl p-4 sm:p-6 border border-slate-700" data-v-272caa2b><div class="hidden sm:flex items-center justify-between gap-2 mb-4" data-v-272caa2b><div class="flex items-center gap-3" data-v-272caa2b><span class="text-slate-300" data-v-272caa2b>Preostalo vreme:</span><span class="${ssrRenderClass(["text-2xl font-extrabold tabular-nums", unref(danger) ? "text-red-400" : "text-white"])}" data-v-272caa2b>${ssrInterpolate(unref(mm))}:${ssrInterpolate(unref(ss))}</span></div><div class="flex items-center gap-2" data-v-272caa2b><button class="px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50"${ssrIncludeBooleanAttr(unref(preparing) || unref(waiting) || unref(finished)) ? " disabled" : ""} data-v-272caa2b>${ssrInterpolate(unref(paused) ? "Nastavi" : "Pauziraj")}</button><button class="px-3 py-2 rounded-lg bg-brand hover:bg-brand-dark" data-v-272caa2b>Nova tabla</button><button class="px-3 py-2 rounded-lg bg-orange-600 hover:bg-orange-500" data-v-272caa2b>Pravila</button></div></div><div class="sm:hidden flex items-center justify-center gap-3 mb-3" data-v-272caa2b><span class="text-slate-300" data-v-272caa2b>Preostalo vreme:</span><span class="${ssrRenderClass(["text-2xl font-extrabold tabular-nums", unref(danger) ? "text-red-400" : "text-white"])}" data-v-272caa2b>${ssrInterpolate(unref(mm))}:${ssrInterpolate(unref(ss))}</span></div><div class="grid place-items-center py-2 relative" data-v-272caa2b>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        board: unref(board),
        disabled: unref(paused) || unref(finished) || unref(preparing) || unref(waiting),
        blurred: unref(paused) || unref(preparing) || unref(waiting),
        selected: unref(selectedPath),
        onCellClick
      }, null, _parent));
      if (unref(preparing)) {
        _push(`<div class="absolute inset-0 grid place-items-center" data-v-272caa2b><div class="text-6xl sm:text-7xl font-black text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]" data-v-272caa2b>${ssrInterpolate(unref(countdown))}</div></div>`);
      } else if (unref(waiting)) {
        _push(`<div class="absolute inset-0 grid place-items-center" data-v-272caa2b><button class="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xl shadow-lg" data-v-272caa2b> Kreni </button></div>`);
      } else if (unref(paused) && !unref(finished)) {
        _push(`<div class="absolute inset-0 grid place-items-center" data-v-272caa2b><div class="px-4 py-2 rounded-xl bg-slate-900/70 border border-slate-700 text-white font-semibold" data-v-272caa2b> Pauzirano </div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mt-4 flex items-center justify-center gap-2" data-v-272caa2b><button class="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50"${ssrIncludeBooleanAttr(!unref(canAddWord) || unref(validating)) ? " disabled" : ""} data-v-272caa2b>${ssrInterpolate(unref(validating) ? "Provjera\u2026" : "Dodaj")}</button><button class="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-50"${ssrIncludeBooleanAttr(!unref(hasSelection)) ? " disabled" : ""} data-v-272caa2b>Poni\u0161ti</button><button class="px-4 py-2 rounded-lg bg-slate-600 hover:bg-slate-500" data-v-272caa2b>Rije\u010Di</button></div><div class="sm:hidden mt-6 flex items-center justify-center gap-2" data-v-272caa2b><button class="px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50"${ssrIncludeBooleanAttr(unref(preparing) || unref(waiting) || unref(finished)) ? " disabled" : ""} data-v-272caa2b>${ssrInterpolate(unref(paused) ? "Nastavi" : "Pauziraj")}</button><button class="px-3 py-2 rounded-lg bg-brand hover:bg-brand-dark" data-v-272caa2b>Nova tabla</button><button class="px-3 py-2 rounded-lg bg-orange-600 hover:bg-orange-500" data-v-272caa2b>Pravila</button></div><div class="mt-4 text-center text-lg text-slate-200" data-v-272caa2b><span class="opacity-75" data-v-272caa2b>Rije\u010D:</span><span class="ml-2 font-bold" data-v-272caa2b>${ssrInterpolate(unref(currentWord) || "\u2014")}</span>`);
      if (unref(errorMsg)) {
        _push(`<span class="block mt-1 text-sm text-red-400" data-v-272caa2b>${ssrInterpolate(unref(errorMsg))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div>`);
      if (unref(showRules)) {
        _push(`<div class="fixed inset-0 z-50" data-v-272caa2b><div class="absolute inset-0 bg-black/60" data-v-272caa2b></div><div class="absolute inset-0 grid place-items-center p-4" data-v-272caa2b><div class="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-xl overflow-hidden" data-v-272caa2b><div class="flex items-center justify-between px-5 py-4 border-b border-slate-700" data-v-272caa2b><h2 class="text-xl font-bold" data-v-272caa2b>Pravila</h2><button class="px-3 py-1 rounded-md bg-slate-700 hover:bg-slate-600" data-v-272caa2b>Zatvori</button></div><div class="p-5 space-y-4 max-h-[70vh] overflow-auto text-slate-200" data-v-272caa2b><div data-v-272caa2b><h3 class="font-semibold mb-2" data-v-272caa2b>Pravilnik za bodovanje rije\u010Di u hrvatskom Boggleu</h3><h4 class="font-semibold" data-v-272caa2b>1. Osnovna pravila</h4><ul class="list-disc pl-6 space-y-1" data-v-272caa2b><li data-v-272caa2b>Rije\u010D mora biti sastavljena od najmanje 3 slova.</li><li data-v-272caa2b>Rije\u010Di se tvore povezivanjem susjednih slova na plo\u010Di (okomito, vodoravno, dijagonalno).</li><li data-v-272caa2b>Svako polje mo\u017Ee se koristiti samo jednom u istoj rije\u010Di.</li><li data-v-272caa2b>Dopu\u0161tena su i dvoslovna slova (LJ, NJ, D\u017D) \u2013 ra\u010Dunaju se kao jedno slovo/polje.</li><li data-v-272caa2b>Imena, kratice i strane rije\u010Di se ne priznaju, osim ako su uvr\u0161tene u standardne hrvatske rje\u010Dnike.</li></ul></div><div data-v-272caa2b><h4 class="font-semibold" data-v-272caa2b>2. Bodovanje prema duljini rije\u010Di</h4><ul class="list-disc pl-6 space-y-1" data-v-272caa2b><li data-v-272caa2b>3 slova \u2013 1 bod</li><li data-v-272caa2b>4 slova \u2013 2 boda</li><li data-v-272caa2b>5 slova \u2013 3 boda</li><li data-v-272caa2b>6 slova \u2013 4 boda</li><li data-v-272caa2b>7 slova \u2013 5 bodova</li><li data-v-272caa2b>8+ slova \u2013 11 bodova</li></ul></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showWords)) {
        _push(`<div class="fixed inset-0 z-50" data-v-272caa2b><div class="absolute inset-0 bg-black/50" data-v-272caa2b></div><div class="absolute inset-0 grid place-items-center p-4" data-v-272caa2b><div class="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-xl overflow-hidden" data-v-272caa2b><div class="flex items-center justify-between px-5 py-4 border-b border-slate-700" data-v-272caa2b><h2 class="text-xl font-bold" data-v-272caa2b>Rije\u010Di (${ssrInterpolate(unref(words).length)})</h2><button class="px-3 py-1 rounded-md bg-slate-700 hover:bg-slate-600" data-v-272caa2b>Zatvori</button></div><div class="p-5 max-h-[70vh] overflow-auto" data-v-272caa2b>`);
        if (!unref(words).length) {
          _push(`<div class="text-slate-300" data-v-272caa2b>Nema dodanih rije\u010Di.</div>`);
        } else {
          _push(`<ul class="space-y-2" data-v-272caa2b><!--[-->`);
          ssrRenderList(unref(words), (w, i) => {
            _push(`<li class="flex items-center justify-between bg-slate-800/60 rounded-lg px-3 py-2" data-v-272caa2b><span class="font-semibold" data-v-272caa2b>${ssrInterpolate(w)}</span><span class="text-slate-300" data-v-272caa2b>${ssrInterpolate(scoreForLength(w.length))} bod(ova)</span></li>`);
          });
          _push(`<!--]--></ul>`);
        }
        _push(`</div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showScore)) {
        _push(`<div class="fixed inset-0 z-50" data-v-272caa2b><div class="absolute inset-0 bg-black/60" data-v-272caa2b></div><div class="absolute inset-0 grid place-items-center p-4" data-v-272caa2b><div class="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-xl overflow-hidden" data-v-272caa2b><div class="px-5 py-4 border-b border-slate-700" data-v-272caa2b><h2 class="text-xl font-bold" data-v-272caa2b>Vrijeme je isteklo!</h2></div><div class="p-5 space-y-4 max-h-[70vh] overflow-auto" data-v-272caa2b><div class="flex items-center justify-between" data-v-272caa2b><span class="text-lg" data-v-272caa2b>Ukupan broj rije\u010Di:</span><span class="text-xl font-bold" data-v-272caa2b>${ssrInterpolate(unref(words).length)}</span></div><div class="flex items-center justify-between" data-v-272caa2b><span class="text-lg" data-v-272caa2b>Ukupni bodovi:</span><span class="text-xl font-bold text-emerald-400" data-v-272caa2b>${ssrInterpolate(unref(totalScore))}</span></div><div data-v-272caa2b><h3 class="font-semibold mb-2" data-v-272caa2b>Popis rije\u010Di</h3><ul class="space-y-1" data-v-272caa2b><!--[-->`);
        ssrRenderList(unref(words), (w, i) => {
          _push(`<li class="flex items-center justify-between bg-slate-800/60 rounded-lg px-3 py-2" data-v-272caa2b><span class="font-semibold" data-v-272caa2b>${ssrInterpolate(w)}</span><span class="text-slate-300" data-v-272caa2b>${ssrInterpolate(scoreForLength(w.length))} bod(ova)</span></li>`);
        });
        _push(`<!--]--></ul></div><div class="pt-2 text-center" data-v-272caa2b><button class="px-5 py-2 rounded-lg bg-brand hover:bg-brand-dark font-semibold" data-v-272caa2b>Nova igra</button></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/game.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const game = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-272caa2b"]]);

export { game as default };
//# sourceMappingURL=game-BlmYqiLk.mjs.map
