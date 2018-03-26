import React from 'react';
import { versionString } from '../version';

const ModalAbout= (props) => {
  return (
    <div className='modal-about'>
      <section className='text-modal'>
        <h1>このサイトについて</h1>
        <p>
          この「 DQ10 スキルシミュレーター」は、ごくごく一般的なアストルティアに住む毛玉が趣味で作成・運用しています。
          このサイトを使用することで発生したいかなる損害についても、管理者はその責任を負うことはできません。悪しからずご了承ください。
        </p>
        <h2>デザイン・レイアウトについて</h2>
        <p>「 DQ10 スキルシミュレーター」のデザインおよび表レイアウトは、<a href='https://twitter.com/mikonoMai' rel='noreferrer noopener' target='_blank'>みこのんさん(twitter: @mikononMai)</a>によって<a href='https://twitter.com/mikonoMai/status/431740179997405184' rel='noreferrer noopener' target='_blank'>考案、作成、公開</a>されているものをベースとして使用させていただいております。使用を承諾いただきとてもとてもありがとうございます！</p>

        <h2>管理毛玉</h2>
        <p>このサイトはアストルティアの毛玉の よぅ が管理・運用しています。</p>
        <address>
          <dl>
            <dt>mastodon:</dt>
            <dd><a href='https://foresdon.jp/@kedama' rel='noreferrer noopener' target='_blank'>@kedama@foresdon.jp</a></dd>
            <dt>twitter:</dt>
            <dd><a href='https://twitter.com/YouPuku' rel='noreferrer noopener' target='_blank'>@YouPuku</a></dd>
          </dl>
        </address>
        <p>ご意見やご要望はお気軽にご連絡ください。(twitter だとちょっと反応遅いかもしれませんが……mastodon 楽しいですよ？ｗ)</p>

        <h2>ソースコード</h2>
        <dl>
          <dt>github</dt>
          <dd><a href='https://github.com/kedamaDQ/skill-simulator' rel='noreferrer noopener' target='_blank'>ソースコード (v{ versionString() })</a></dd>
        </dl>

        <h2>更新履歴</h2>
        <dl className='history'>
          <dt>2018-03-26 (v0.11.1)</dt>
          <dd>少なくとも、小窓がウィンドウの外にぶっ飛んでいくことがないようにしたつもりです。</dd>
          <dd>[まとめて設定] [セーブ] [使い方] あたりのボタンがスマホでもそれなりに整列するようにしました。</dd>
          <dd>実機を持っていない Apple デバイス(Safari)の挙動が掴めないため、日々怯えています……</dd>
          <dt>2018-03-22 (v0.11.0)</dt>
          <dd>スキルポイントの状態をブックマーク(お気に入り)に保存できるようになりました。</dd>
          <dd>行(職業)と列(武器)の並び順を公式にあわせました。</dd>
          <dt>2018-03-19 (v0.10.1)</dt>
          <dd>Internet Explorer 11 でも動くように改修しました。</dd>
          <dt>2018-03-18 (v0.10.0)</dt>
          <dd>マスタースキルの考え方がバグっていたので大幅に修正しました。</dd>
          <dt>2018-03-15 (v0.9.0)</dt>
          <dd>ベータ版公開</dd>
        </dl>
      </section>
    </div>
  );
}

export default ModalAbout;
