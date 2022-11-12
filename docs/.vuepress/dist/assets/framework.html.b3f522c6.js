import{_ as e,o as i,c as n,e as s}from"./app.9cd16e62.js";const d={},l=s(`<h1 id="\u524D\u7AEF\u9879\u76EE\u7ED3\u6784" tabindex="-1"><a class="header-anchor" href="#\u524D\u7AEF\u9879\u76EE\u7ED3\u6784" aria-hidden="true">#</a> \u524D\u7AEF\u9879\u76EE\u7ED3\u6784</h1><h2 id="vue" tabindex="-1"><a class="header-anchor" href="#vue" aria-hidden="true">#</a> vue</h2><div class="language-txt ext-txt line-numbers-mode"><pre class="language-txt"><code>
.src
\u251C\u2500\u2500 service                         # \u540E\u7AEF\u63A5\u53E3\u7BA1\u7406
\u2502   \u251C\u2500\u2500 index.js                    # \u63A5\u53E3\u7BA1\u7406\u51FA\u5165\u53E3
\u2502   \u2514\u2500\u2500 ...                         # \u5177\u4F53\u7684\u4E0D\u540C\u4E1A\u52A1/\u670D\u52A1\u63A5\u53E3\u6587\u4EF6 \uFF08\u63A5\u53E3\u7BA1\u7406\u3001\u6570\u636E\u57CB\u70B9\uFF09
\u251C\u2500\u2500 assets                          # \u9879\u76EE\u4F9D\u8D56\u8D44\u6E90\u7BA1\u7406
\u2502   \u2514\u2500\u2500 imgs                        # \u56FE\u7247\u8D44\u6E90
\u2502   \u251C\u2500\u2500 style                       # \u6837\u5F0F\u8D44\u6E90
\u2502   \u2514\u2500\u2500 js                          # \u4F9D\u8D56\u7684\u7B2C\u4E09\u65B9sdk\u4E4B\u7C7B\u7684js\u8D44\u6E90
\u251C\u2500\u2500 components                      # \u9879\u76EE\u7EC4\u4EF6\u76EE\u5F55
\u2502   \u251C\u2500\u2500 public                      # \u516C\u5171\u7EC4\u4EF6/\u57FA\u7840\u7EC4\u4EF6\uFF08\u6BD4\u5982\u57FA\u7840\u7684\u6309\u94AE/\u8F93\u5165\u6846\u7B49\uFF09
\u2502   \u2502   \u251C\u2500\u2500 index.js                # \u57FA\u7840\u7EC4\u4EF6\u7684\u6CE8\u518C\u6587\u4EF6\u3010\u53EF\u9009\u3011
\u2502   \u2502   \u251C\u2500\u2500 README.md               # \u7EC4\u4EF6\u4F7F\u7528\u8BF4\u660E\u6587\u6863\u3010\u53EF\u9009\u3011
\u2502   \u2502   \u2514\u2500\u2500 ...                     # \u7EC4\u4EF6
\u2502   \u2514\u2500\u2500 ....                        # \u57FA\u7840\u6027\u7684\u4E1A\u52A1\u7EC4\u4EF6
\u251C\u2500\u2500 pages                           
\u2502   \u251C\u2500\u2500 modules                     # \u5177\u4F53\u4E1A\u52A1\u6240\u5F52\u5C5E\u7684\u6587\u4EF6\u5939\uFF08\u53EF\u4EE5\u7528\u4E1A\u52A1\u540D\u79F0\u4F5C\u4E3A\u6587\u4EF6\u5939\u540D\u5B57\uFF0C\u5982\u679C\u4E00\u4E2A\u4E1A\u52A1\uFF0C\u5C31\u4E0D\u9700\u8981modules\u4E86\uFF09
\u2502   \u2502   \u251C\u2500\u2500 components              # \u4E1A\u52A1\u6240\u7528\u5230\u7684\u7EC4\u4EF6
\u2502   \u2502   \u251C\u2500\u2500 views                   # \u4E1A\u52A1\u7684\u6240\u6709\u9875\u9762
\u2502   \u2502   \u251C\u2500\u2500 utils                   # \u4E1A\u52A1\u7684\u5DE5\u5177\u96C6
\u2502   \u2502   \u251C\u2500\u2500	static                  # \u4E1A\u52A1\u6240\u7528\u5230\u7684\u9759\u6001\u8D44\u6E90 \u4E5F\u53EF\u4EE5\u8003\u8651\u653E\u5916\u9762public\u91CC
\u2502   \u2502   \u251C\u2500\u2500 service                 # \u4E1A\u52A1\u7684\u540E\u7AEF\u63A5\u53E3\u7BA1\u7406
\u2502   \u2502   \u251C\u2500\u2500 hooks                   # hooks vue3\u7684\u8BDD\u53EF\u4EE5\u52A0hooks, \u4E0A\u95E8\u7684components\u540C\u7406
\u2502   \u2502   \u251C\u2500\u2500 store                   # \u4E1A\u52A1\u6240\u7528\u5230\u7684\u72B6\u6001\u5E93\uFF08\u672C\u7ED3\u6784\u57FA\u4E8EVue\uFF0C\u8FD9\u91CC\u662F\u4E1A\u52A1\u7684Vuex\uFF09
\u2502   \u2502   \u2514\u2500\u2500 index.js                # \u4E1A\u52A1\u7684\u552F\u4E00\u51FA\u53E3\uFF08\u5305\u542B\u8DEF\u7531\u4E0E\u72B6\u6001\u5E93\uFF09
\u2502   \u2514\u2500\u2500 ....                        # \u5176\u4ED6\u4E1A\u52A1
\u251C\u2500\u2500 config                          # \u9879\u76EE\u7684\u57FA\u7840\u914D\u7F6E
\u2502   \u251C\u2500\u2500 index.js                    # \u914D\u7F6E\u6587\u4EF6\u7684\u51FA\u5165\u53E3
\u2502   \u2514\u2500\u2500 ...                         # \u5177\u4F53\u7684\u914D\u7F6E\u6587\u4EF6\u3010C-2\u3011
\u251C\u2500\u2500 router                          # \u9879\u76EE\u7684\u8DEF\u7531\u7BA1\u7406
\u2502   \u251C\u2500\u2500 index.js                    # \u8DEF\u7531\u51FA\u53E3
\u2502   \u2514\u2500\u2500 ...                         # \u4E0E\u8DEF\u7531\u6709\u5173\u7684\u5176\u4ED6\u6587\u4EF6\u3010R-1\u3011
\u251C\u2500\u2500 store                           # \u9879\u76EE\u72B6\u6001\u5E93\u7684\u7BA1\u7406
\u2502   \u251C\u2500\u2500 index.js                    # \u9879\u76EE\u72B6\u6001\u5E93\u7684\u51FA\u5165\u53E3
\u2502   \u2514\u2500\u2500 ...                         # \u5177\u4F53\u7684\u57FA\u7840\u6A21\u5757\u3010S-2\u3011
\u251C\u2500\u2500 utils                           # \u9879\u76EE\u6240\u7528\u7684\u5DE5\u5177\u96C6\uFF08\u5C01\u88C5\u7684\u8BF7\u6C42\uFF0C\u8868\u5355\u7684\u9A8C\u8BC1\u51FD\u6570\uFF0C\u65F6\u95F4\u683C\u5F0F\u5316.....\u7684\u5DE5\u5177\uFF09
\u2502   \u251C\u2500\u2500 index.js                    # \u5DE5\u5177\u7684\u5165\u53E3
\u2502   \u2514\u2500\u2500 ...                         # \u5177\u4F53\u7684\u5404\u4E2A\u5DE5\u5177\uFF08\u8BF7\u6C42\u5C01\u88C5\u3001\u6B63\u5219\u3001\u9A8C\u8BC1......\uFF09\u3010U-1\u3011
\u251C\u2500\u2500 main.js                          
\u251C\u2500\u2500 App.vue
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="react" tabindex="-1"><a class="header-anchor" href="#react" aria-hidden="true">#</a> react</h2>`,4),v=[l];function a(r,c){return i(),n("div",null,v)}const m=e(d,[["render",a],["__file","framework.html.vue"]]);export{m as default};
