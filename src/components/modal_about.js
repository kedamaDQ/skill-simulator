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
          <dt>2018-04-21 (v1.0.0)</dt>
          <dd><p>ローカルストレージを使用したセーブとロード機能を実装しました。</p></dd>
          <dd><p>小窓を開かないでスキルポイントを 1 ずつ加減する機能を実装しました。</p></dd>
          <dt>2018-04-08 (v0.13.0)</dt>
          <dd><p>職業フィルターを実装しました。</p></dd>
          <dt>2018-04-04 (v0.12.2)</dt>
          <dd><p>魔法使いにムチではなく弓スキルが割り当てられていたのを修正しました。</p></dd>
          <dt>2018-04-01 (v0.12.1)</dt>
          <dd><p>リリースノートの書き忘れを追記しました……</p></dd>
          <dt>2018-04-01 (v0.12.0)</dt>
          <dd><p>武器スキルフィルターを実装しました。(Special thanks to <a href='https://foresdon.jp/@Zyyu/99688158231004059' target='_blank' rel='noreferrer noopener'>@Zyyu@foresdon.jp</a> !!)</p></dd>
          <dd><p>スキルポイントの割り当てを行なう小窓の中で表示される割り当て済みポイントの内容を、より直感的でわかりやすくなる(と思われる)ように変更しました。</p></dd>
          <dd><p>なるべく軽快に動作する(するとは言っていない)ように、内部のデーター構造や計算処理を見直しました。</p></dd>
          <dd><p>表示言語に明確にジパング語(ja / ja_JP)に設定しました。ブラウザーや設定によってはスキルシミュレーター内で表示されるフォントが変わるかもしれません。</p></dd>
          <dt>2018-03-26 (v0.11.1)</dt>
          <dd><p>少なくとも、小窓がウィンドウの外にぶっ飛んでいくことがないようにしたつもりです。</p></dd>
          <dd><p>[まとめて設定] [セーブ] [使い方] あたりのボタンがスマホでもそれなりに整列するようにしました。</p></dd>
          <dd><p>実機を持っていない Apple デバイス(Safari)の挙動が掴めないため、日々怯えています……</p></dd>
          <dt>2018-03-22 (v0.11.0)</dt>
          <dd><p>スキルポイントの状態をブックマーク(お気に入り)に保存できるようになりました。</p></dd>
          <dd><p>行(職業)と列(武器)の並び順を公式にあわせました。</p></dd>
          <dt>2018-03-19 (v0.10.1)</dt>
          <dd><p>Internet Explorer 11 でも動くように改修しました。</p></dd>
          <dt>2018-03-18 (v0.10.0)</dt>
          <dd><p>マスタースキルの考え方がバグっていたので大幅に修正しました。</p></dd>
          <dt>2018-03-15 (v0.9.0)</dt>
          <dd><p>ベータ版公開</p></dd>
        </dl>
      </section>
    </div>
  );
}

export default ModalAbout;
