<template><div><h1 id="隐式转换-和" tabindex="-1"><a class="header-anchor" href="#隐式转换-和" aria-hidden="true">#</a> 隐式转换 == 和 ===</h1>
<h2 id="对比" tabindex="-1"><a class="header-anchor" href="#对比" aria-hidden="true">#</a> 对比</h2>
<h3 id="对比组件" tabindex="-1"><a class="header-anchor" href="#对比组件" aria-hidden="true">#</a> 对比组件</h3>
<Equal/><h3 id="vue组件的代码" tabindex="-1"><a class="header-anchor" href="#vue组件的代码" aria-hidden="true">#</a> vue组件的代码</h3>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>equal<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>row<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>row-label-2<span class="token punctuation">"</span></span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(item, index) in keyStr<span class="token punctuation">"</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>index<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
          {{ item }}
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>row<span class="token punctuation">"</span></span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(item, index) in data<span class="token punctuation">"</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>index<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>row-label-1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{ keyStr[index] }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span>
          <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>club<span class="token punctuation">"</span></span>
          <span class="token attr-name">@mouseenter</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>mouseEvent(child)<span class="token punctuation">"</span></span>
          <span class="token attr-name">@mouselevel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>mouseEvent<span class="token punctuation">"</span></span>
          <span class="token attr-name">@click.stop</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handler(child.key)<span class="token punctuation">"</span></span>
          <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>`${child.style} ${current.key === child.key ? 'on' : ''}`<span class="token punctuation">"</span></span>
          <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(child, childKey) in item<span class="token punctuation">"</span></span>
          <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>childKey<span class="token punctuation">"</span></span>
        <span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>legend<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span>
        <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>legend-item<span class="token punctuation">"</span></span>
        <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(item, index) in ['===', '==', '>= &amp;&amp; &lt;=', '>=', '&lt;=', 'else']<span class="token punctuation">"</span></span>
      <span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>legend-club<span class="token punctuation">"</span></span> <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>`legend-club-${index + 1}`<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>{{ item }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>equal-condition<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>current.show<span class="token punctuation">"</span></span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(item, index) in current.show<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>if<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>if (<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>{{ item.template
          }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>if<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>)<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>res<span class="token punctuation">"</span></span><span class="token punctuation">></span></span> // {{ item.res }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span>
          <span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span> <span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref<span class="token punctuation">,</span> onUnmounted <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"vue"</span><span class="token punctuation">;</span>

<span class="token comment">// 要比较的值</span>
<span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token keyword">null</span><span class="token punctuation">,</span>
  <span class="token keyword">undefined</span><span class="token punctuation">,</span>
  <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token string">"false"</span><span class="token punctuation">,</span>
  <span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string">""</span><span class="token punctuation">,</span>
  <span class="token function">String</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token function">Number</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token string">"0"</span><span class="token punctuation">,</span>
  <span class="token function">String</span><span class="token punctuation">(</span><span class="token string">"0"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token string">"true"</span><span class="token punctuation">,</span>
  <span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token function">Number</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token string">"1"</span><span class="token punctuation">,</span>
  <span class="token function">String</span><span class="token punctuation">(</span><span class="token string">"1"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token function">Number</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token string">"-1"</span><span class="token punctuation">,</span>
  <span class="token function">String</span><span class="token punctuation">(</span><span class="token string">"-1"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token number">Infinity</span><span class="token punctuation">,</span>
  <span class="token operator">-</span><span class="token number">Infinity</span><span class="token punctuation">,</span>
  <span class="token function">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token number">NaN</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">// 比较的值对应的字符串，显示用</span>
<span class="token keyword">const</span> keyStr <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">null</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">undefined</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">false</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">"false"</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Boolean(false)</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">[]</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">[[]]</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">""</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">String("")</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">0</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Number(0)</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token string">"0"</span><span class="token punctuation">,</span>
  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">String("0")</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">[0]</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">true</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">"true"</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Boolean(true)</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">1</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Number(1)</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">"1"</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">String("1")</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">[1]</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">-1</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Number(-1)</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">"-1"</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">String("-1")</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">[-1]</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Infinity</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">-Infinity</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Object()</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">NaN</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">// 根据传入的值，按===、==、>= &amp;&amp; &lt;= 、 >=、&lt;=的优先级比较，得到样式名</span>
<span class="token keyword">const</span> <span class="token function-variable function">getStyle</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">value1<span class="token punctuation">,</span> value2</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>value1 <span class="token operator">===</span> value2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">"club-1"</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>value1 <span class="token operator">==</span> value2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">"club-2"</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>value1 <span class="token operator">>=</span> value2 <span class="token operator">&amp;&amp;</span> value1 <span class="token operator">&lt;=</span> value2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">"club-3"</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>value1 <span class="token operator">>=</span> value2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">"club-4"</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>value1 <span class="token operator">&lt;=</span> value2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">"club-5"</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">""</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 初始化每个方块的数据</span>
<span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span>
  value<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">v1<span class="token punctuation">,</span> k1</span><span class="token punctuation">)</span> <span class="token operator">=></span>
    value<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">v2<span class="token punctuation">,</span> k2</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> temp <span class="token operator">=</span> <span class="token function">structuredClone</span><span class="token punctuation">(</span>v2<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">let</span> leftStr <span class="token operator">=</span> keyStr<span class="token punctuation">[</span>k1<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token keyword">let</span> rightStr <span class="token operator">=</span> keyStr<span class="token punctuation">[</span>k2<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>k1<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>k2<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">style</span><span class="token operator">:</span> <span class="token function">getStyle</span><span class="token punctuation">(</span>v1<span class="token punctuation">,</span> temp<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>leftStr<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> === </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>rightStr<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
            <span class="token literal-property property">res</span><span class="token operator">:</span> v1 <span class="token operator">===</span> temp<span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>leftStr<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> == </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>rightStr<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
            <span class="token literal-property property">res</span><span class="token operator">:</span> v1 <span class="token operator">==</span> temp<span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>leftStr<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> >= </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>rightStr<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> &amp;&amp; </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>leftStr<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> &lt;= </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>rightStr<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
            <span class="token literal-property property">res</span><span class="token operator">:</span> v1 <span class="token operator">>=</span> temp <span class="token operator">&amp;&amp;</span> v1 <span class="token operator">&lt;=</span> temp<span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>leftStr<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> >= </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>rightStr<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
            <span class="token literal-property property">res</span><span class="token operator">:</span> v1 <span class="token operator">>=</span> temp<span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>leftStr<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> &lt;= </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>rightStr<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
            <span class="token literal-property property">res</span><span class="token operator">:</span> v1 <span class="token operator">&lt;=</span> temp<span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> ctrl <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 控制点击后，移动鼠标不改变current选中的值。默认移动可改current</span>
<span class="token keyword">const</span> current <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>value<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 默认选中</span>

<span class="token keyword">const</span> <span class="token function-variable function">mouseEvent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// 鼠标移入/移出事件，有值为移入</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>ctrl<span class="token punctuation">.</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    current<span class="token punctuation">.</span>value <span class="token operator">=</span> item <span class="token operator">||</span> data<span class="token punctuation">.</span>value<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">handler</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// 方块点击事件</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>current<span class="token punctuation">.</span>value<span class="token punctuation">.</span>key <span class="token operator">===</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ctrl<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token operator">!</span>ctrl<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">bodyListenerHandler</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  ctrl<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"click"</span><span class="token punctuation">,</span> bodyListenerHandler<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">onUnmounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">"click"</span><span class="token punctuation">,</span> bodyListenerHandler<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>less<span class="token punctuation">"</span></span> <span class="token attr-name">scoped</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
<span class="token atrule"><span class="token rule">@clubWdith</span><span class="token punctuation">:</span> 18px<span class="token punctuation">;</span></span>
<span class="token atrule"><span class="token rule">@clubOpacity</span><span class="token punctuation">:</span> 0.7<span class="token punctuation">;</span></span>

<span class="token selector">li,
ul</span> <span class="token punctuation">{</span>
  <span class="token property">list-style</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.theme()</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span>185<span class="token punctuation">,</span> 193<span class="token punctuation">,</span> 194<span class="token punctuation">,</span> <span class="token atrule"><span class="token rule">@clubOpacity</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
  <span class="token selector">&amp;-1</span> <span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span>150<span class="token punctuation">,</span> 41<span class="token punctuation">,</span> 32<span class="token punctuation">,</span> <span class="token atrule"><span class="token rule">@clubOpacity</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
  <span class="token punctuation">}</span>
  <span class="token selector">&amp;-2</span> <span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span>228<span class="token punctuation">,</span> 112<span class="token punctuation">,</span> 98<span class="token punctuation">,</span> <span class="token atrule"><span class="token rule">@clubOpacity</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
  <span class="token punctuation">}</span>
  <span class="token selector">&amp;-3</span> <span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span>244<span class="token punctuation">,</span> 199<span class="token punctuation">,</span> 23<span class="token punctuation">,</span> <span class="token atrule"><span class="token rule">@clubOpacity</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
  <span class="token punctuation">}</span>
  <span class="token selector">&amp;-4</span> <span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span>49<span class="token punctuation">,</span> 202<span class="token punctuation">,</span> 113<span class="token punctuation">,</span> <span class="token atrule"><span class="token rule">@clubOpacity</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
  <span class="token punctuation">}</span>
  <span class="token selector">&amp;-5</span> <span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span>52<span class="token punctuation">,</span> 153<span class="token punctuation">,</span> 219<span class="token punctuation">,</span> <span class="token atrule"><span class="token rule">@clubOpacity</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">.equal</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
  <span class="token selector">.container</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> grid<span class="token punctuation">;</span>
    <span class="token property">grid-row-gap</span><span class="token punctuation">:</span> 1px<span class="token punctuation">;</span>

    <span class="token selector">.row</span> <span class="token punctuation">{</span>
      <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
      <span class="token selector">.row-label-1</span> <span class="token punctuation">{</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
        <span class="token property">padding-right</span><span class="token punctuation">:</span> 5px<span class="token punctuation">;</span>
        <span class="token property">text-align</span><span class="token punctuation">:</span> right<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token selector">.row-label-2</span> <span class="token punctuation">{</span>
        <span class="token property">width</span><span class="token punctuation">:</span> <span class="token atrule"><span class="token rule">@clubWdith</span><span class="token punctuation">;</span></span>
        <span class="token property">text-align</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
        <span class="token property">writing-mode</span><span class="token punctuation">:</span> vertical-lr<span class="token punctuation">;</span>
        <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">rotate3d</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 1<span class="token punctuation">,</span> 180deg<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token property">padding</span><span class="token punctuation">:</span> 5px 0 2px 1px<span class="token punctuation">;</span>
        <span class="token selector">&amp;:first-child</span> <span class="token punctuation">{</span>
          <span class="token property">margin-left</span><span class="token punctuation">:</span> 104px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token selector">.club</span> <span class="token punctuation">{</span>
        <span class="token property">width</span><span class="token punctuation">:</span> <span class="token atrule"><span class="token rule">@clubWdith</span><span class="token punctuation">;</span></span>
        <span class="token property">height</span><span class="token punctuation">:</span> <span class="token atrule"><span class="token rule">@clubWdith</span><span class="token punctuation">;</span></span>
        <span class="token property">margin-right</span><span class="token punctuation">:</span> 1px<span class="token punctuation">;</span>
        .<span class="token function">theme</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token atrule"><span class="token rule">@keyframes</span> animation1</span> <span class="token punctuation">{</span>
          <span class="token selector">from</span> <span class="token punctuation">{</span>
          <span class="token punctuation">}</span>
          <span class="token selector">to</span> <span class="token punctuation">{</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> white<span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token atrule"><span class="token rule">@keyframes</span> animation2</span> <span class="token punctuation">{</span>
          <span class="token selector">from</span> <span class="token punctuation">{</span>
          <span class="token punctuation">}</span>
          <span class="token selector">to</span> <span class="token punctuation">{</span>
            <span class="token property">outline-color</span><span class="token punctuation">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span>200<span class="token punctuation">,</span> 200<span class="token punctuation">,</span> 200<span class="token punctuation">,</span> 1<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token selector">&amp;.on</span> <span class="token punctuation">{</span>
          <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
          <span class="token property">animation</span><span class="token punctuation">:</span> animation1 1s infinite alternate<span class="token punctuation">;</span>
          <span class="token property">cursor</span><span class="token punctuation">:</span> pointer<span class="token punctuation">;</span>

          <span class="token selector">&amp;::before,
          &amp;::after</span> <span class="token punctuation">{</span>
            <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
            <span class="token property">outline</span><span class="token punctuation">:</span> 1px solid <span class="token function">rgb</span><span class="token punctuation">(</span>30<span class="token punctuation">,</span> 30<span class="token punctuation">,</span> 30<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">" "</span><span class="token punctuation">;</span>
            <span class="token property">pointer-events</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
            <span class="token property">animation</span><span class="token punctuation">:</span> animation2 1s infinite alternate<span class="token punctuation">;</span>
          <span class="token punctuation">}</span>

          <span class="token selector">&amp;::before</span> <span class="token punctuation">{</span>
            <span class="token property">left</span><span class="token punctuation">:</span> -800px + <span class="token atrule"><span class="token rule">@clubWdith</span><span class="token punctuation">;</span></span>
            <span class="token property">width</span><span class="token punctuation">:</span> 800px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> <span class="token atrule"><span class="token rule">@clubWdith</span><span class="token punctuation">;</span></span>
          <span class="token punctuation">}</span>
          <span class="token selector">&amp;::after</span> <span class="token punctuation">{</span>
            <span class="token property">top</span><span class="token punctuation">:</span> -800px + <span class="token atrule"><span class="token rule">@clubWdith</span><span class="token punctuation">;</span></span>
            <span class="token property">width</span><span class="token punctuation">:</span> <span class="token atrule"><span class="token rule">@clubWdith</span><span class="token punctuation">;</span></span>
            <span class="token property">height</span><span class="token punctuation">:</span> 800px<span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token selector">.legend</span> <span class="token punctuation">{</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 20px 0 0 104px<span class="token punctuation">;</span>
    <span class="token selector">.legend-item</span> <span class="token punctuation">{</span>
      <span class="token property">display</span><span class="token punctuation">:</span> inline-flex<span class="token punctuation">;</span>
      <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
      <span class="token property">margin-right</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
      <span class="token selector">.legend-club</span> <span class="token punctuation">{</span>
        <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
        <span class="token property">height</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
        <span class="token property">margin-right</span><span class="token punctuation">:</span> 5px<span class="token punctuation">;</span>
        .<span class="token function">theme</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token selector">.equal-condition</span> <span class="token punctuation">{</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 20px 0 0 100px<span class="token punctuation">;</span>
    <span class="token selector">.if</span> <span class="token punctuation">{</span>
      <span class="token property">padding</span><span class="token punctuation">:</span> 0 5px<span class="token punctuation">;</span>
      <span class="token property">color</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>182<span class="token punctuation">,</span> 59<span class="token punctuation">,</span> 177<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.res</span> <span class="token punctuation">{</span>
      <span class="token property">padding-left</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
      <span class="token property">color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="es6规范" tabindex="-1"><a class="header-anchor" href="#es6规范" aria-hidden="true">#</a> ES6规范</h2>
<h3 id="比较" tabindex="-1"><a class="header-anchor" href="#比较" aria-hidden="true">#</a> ==比较</h3>
<p><a href="https://262.ecma-international.org/6.0/#sec-abstract-equality-comparison" target="_blank" rel="noopener noreferrer">7.2.12 Abstract Equality Comparison<ExternalLinkIcon/></a></p>
<p>The comparison x == y, where x and y are values, produces true or false. Such a comparison is performed as follows:</p>
<blockquote>
<p>比较x == y，返回true或false，比较分别如下所示：</p>
</blockquote>
<ol>
<li><code v-pre>ReturnIfAbrupt(x)</code>.</li>
<li><code v-pre>ReturnIfAbrupt(y)</code>.</li>
</ol>
<blockquote>
<p>执行ReturnIfAbrupt(x/y)。这是一个判断值是否正常的函数，x或y的值非法的话就抛出异常。</p>
</blockquote>
<ol start="3">
<li>If <code v-pre>Type(x)</code> is the same as <code v-pre>Type(y)</code>, then Return the result of performing Strict Equality Comparison x === y.</li>
</ol>
<blockquote>
<p>如果<code v-pre>Type(x)</code>和<code v-pre>Type(y)</code>相同，执行严格相等运算x === y。</p>
</blockquote>
<ol start="4">
<li>If x is <code v-pre>null</code> and y is <code v-pre>undefined</code>, return <code v-pre>true</code>.</li>
</ol>
<blockquote>
<p>如果x是<code v-pre>null</code>, y是 <code v-pre>undefined</code>，返回 <code v-pre>true</code></p>
</blockquote>
<ol start="5">
<li>If x is <code v-pre>undefined</code> and y is <code v-pre>null</code>, return <code v-pre>true</code>.</li>
</ol>
<blockquote>
<p>如果x是<code v-pre>undefined</code>, y是 <code v-pre>null</code>，返回 <code v-pre>true</code></p>
</blockquote>
<ol start="6">
<li>If <code v-pre>Type(x)</code> is <code v-pre>Number</code> and <code v-pre>Type(y)</code> is <code v-pre>String</code>, return the result of the comparison x == ToNumber(y).</li>
</ol>
<blockquote>
<p>如果<code v-pre>Type(x)</code> 是 <code v-pre>Number</code>, <code v-pre>Type(y)</code>是 <code v-pre>String</code>, 返回 x == <code v-pre>ToNumber(y)</code>的结果。</p>
</blockquote>
<ol start="7">
<li>If <code v-pre>Type(x)</code> is <code v-pre>String</code> and <code v-pre>Type(y)</code> is <code v-pre>Number</code>,return the result of the comparison <code v-pre>ToNumber(x)</code> == y.</li>
</ol>
<blockquote>
<p>如果<code v-pre>Type(x)</code> 是 <code v-pre>String</code>, <code v-pre>Type(y)</code>是 <code v-pre>Number</code>, 返回 <code v-pre>ToNumber(x)</code> == y的结果。</p>
</blockquote>
<ol start="8">
<li>If <code v-pre>Type(x)</code> is <code v-pre>Boolean</code>, return the result of the comparison <code v-pre>ToNumber(x)</code> == y.</li>
</ol>
<blockquote>
<p>如果<code v-pre>Type(x)</code> 是<code v-pre>Boolean</code>, 返回 <code v-pre>ToNumber(x)</code> == y的结果。</p>
</blockquote>
<ol start="9">
<li>If <code v-pre>Type(y)</code> is <code v-pre>Boolean</code>, return the result of the comparison x == <code v-pre>ToNumber(y)</code>.</li>
</ol>
<blockquote>
<p>如果<code v-pre>Type(y)</code> 是<code v-pre>Boolean</code>, 返回 x == <code v-pre>ToNumber(y)</code>的结果。</p>
</blockquote>
<ol start="10">
<li>If <code v-pre>Type(x)</code> is either <code v-pre>String</code>, <code v-pre>Number</code>, or <code v-pre>Symbol</code> and <code v-pre>Type(y)</code> is <code v-pre>Object</code>, then return the result of the comparison x == <code v-pre>ToPrimitive(y)</code>.</li>
</ol>
<blockquote>
<p>如果<code v-pre>Type(x)</code> 是 <code v-pre>String</code>、<code v-pre>Number</code>、<code v-pre>Symbol</code>，<code v-pre>Type(y)</code>是<code v-pre>Object</code>，返回 x == <code v-pre>ToPrimitive(y)</code>的结果。(<code v-pre>ToPrimitive</code>是<code v-pre>Object</code>转化为引擎内部原始值的方法)</p>
</blockquote>
<ol start="11">
<li>If <code v-pre>Type(x)</code> is <code v-pre>Object</code> and <code v-pre>Type(y)</code> is either <code v-pre>String</code>, <code v-pre>Number</code>, or <code v-pre>Symbol</code>, then return the result of the comparison <code v-pre>ToPrimitive(x)</code> == y.</li>
</ol>
<blockquote>
<p>如果<code v-pre>Type(x)</code> 是 <code v-pre>Object</code>, <code v-pre>Type(y)</code>是 <code v-pre>String</code>、<code v-pre>Number</code>、<code v-pre>Symbol</code>，返回<code v-pre>ToPrimitive(x)</code> == y的结果。</p>
</blockquote>
<ol start="12">
<li>Return <code v-pre>false</code>.</li>
</ol>
<blockquote>
<p>0 == null 就由这返回false，因为null的类型是<code v-pre>Null</code>，0的类型是<code v-pre>Number</code></p>
</blockquote>
<h3 id="比较-1" tabindex="-1"><a class="header-anchor" href="#比较-1" aria-hidden="true">#</a> ===比较</h3>
<p><a href="https://262.ecma-international.org/6.0/#sec-strict-equality-comparison" target="_blank" rel="noopener noreferrer">7.2.13 Strict Equality Comparison<ExternalLinkIcon/></a></p>
<p>The comparison x === y, where x and y are values, produces true or false. Such a comparison is performed as follows:</p>
<blockquote>
<p>比较x === y，返回true或false，比较分别如下所示：</p>
</blockquote>
<ul>
<li>If <code v-pre>Type(x)</code> is different from <code v-pre>Type(y)</code>, return <code v-pre>false</code>.</li>
<li>If <code v-pre>Type(x)</code> is <code v-pre>Undefined</code>, return <code v-pre>true</code>.</li>
<li>If <code v-pre>Type(x)</code> is <code v-pre>Null</code>, return <code v-pre>true</code>.</li>
<li>If <code v-pre>Type(x)</code> is <code v-pre>Number</code>, then
<ul>
<li>If x is <code v-pre>NaN</code>, return <code v-pre>false</code>.</li>
<li>If y is <code v-pre>NaN</code>, return <code v-pre>false</code>.</li>
<li>If x is the same <code v-pre>Number</code> value as y, return <code v-pre>true</code>.</li>
<li>If x is <code v-pre>+0</code> and y is <code v-pre>−0</code>, return <code v-pre>true</code>.</li>
<li>If x is <code v-pre>−0</code> and y is <code v-pre>+0</code>, return <code v-pre>true</code>.</li>
<li>Return <code v-pre>false</code>.</li>
</ul>
</li>
<li>If <code v-pre>Type(x)</code> is <code v-pre>String</code>, then
<ul>
<li>If x and y are exactly the same sequence of code units (same length and same code units at corresponding indices), return <code v-pre>true</code>.(如果x和y是完全相同的代码单元，（一样的长度和一样的代码单元，索引是相对应的))</li>
<li>Else, return <code v-pre>false</code>.</li>
</ul>
</li>
<li>If <code v-pre>Type(x)</code> is <code v-pre>Boolean</code>, then
<ul>
<li>If x and y are both <code v-pre>true</code> or both <code v-pre>false</code>, return <code v-pre>true</code>.</li>
<li>Else, return <code v-pre>false</code>.</li>
</ul>
</li>
<li>If x and y are the same <code v-pre>Symbol</code> value, return <code v-pre>true</code>.</li>
<li>If x and y are the same <code v-pre>Object</code> value, return <code v-pre>true</code>.</li>
<li>Return <code v-pre>false</code>.</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">注：</p>
<p>This algorithm differs from the SameValue Algorithm (7.2.9) in its treatment of signed zeroes and <code v-pre>NaNs</code>.</p>
<blockquote>
<p>该算法与<a href="https://262.ecma-international.org/6.0/#sec-samevalue" target="_blank" rel="noopener noreferrer">SameValue算法（7.2.9）<ExternalLinkIcon/></a>在处理有符号零和<code v-pre>NaNs</code>方面有所不同。</p>
</blockquote>
</div>
</div></template>


