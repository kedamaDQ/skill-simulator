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
          <dt>2019-01-03 (v1.1.7)</dt>
          <dd><p>小窓を開かないで直接スキルポイントを操作するボタン(マスの右側に出る三角形のボタン)を長押しすることで、連続的に加算/減算できるようになりました。(Special thanks to <a href="https://foresdon.jp/@Zyyu/101189126055340118" target='_blank' rel='noreferrer noopener'>@Zyyu@foresdon.jp</a> !!)(※ 恐らくこの機能はスマートフォンやタブレットでは有効になりません)</p></dd>
          <dd><p>現在のスキルポイントをローカルストレージに名前を付けて保存する際の挙動がバグっていたので修正しました。また「セーブとロード」の小窓について、他にもいくつかの挙動を調整しています。</p></dd>
          <dt>2018-12-05 (v1.1.6)</dt>
          <dd><p>Lv.108 に正式対応しました。(Special thanks to <a href="https://foresdon.jp/@cash_dolce/101187727768209661" target='_blank' rel='noreferrer noopener'>@cash_dolce@foresdon.jp</a> !!)</p></dd>
          <dt>2018-11-28 (v1.1.6rc1)</dt>
          <dd><p>Lv.108 に暫定対応しました。</p></dd>
          <dd><p>現状では Lv.106 〜 Lv.108 で +1, +1, +2 とスキルポイントが増えるようにしています。</p></dd>
          <dt>2018-11-09 (v1.1.5)</dt>
          <dd><p>リリース手順をミスったため、もう1つバージョンを上げました……</p></dd>
          <dt>2018-11-09 (v1.1.4)</dt>
          <dd><p>脆弱性(CVE-2018-16469)に対応しました。</p></dd>
          <dd><p>react-select モジュールを v2.x にアップデートしました。ドロップダウンリストの挙動が少し変わっているかもしれません。</p></dd>
          <dd><p>その他、依存ライブラリのアップデートを実施しました。</p></dd>
          <dt>2018-09-06 (v1.1.3)</dt>
          <dd><p>遊び人に正式対応しました。</p></dd>
          <dt>2018-09-01 (v1.1.3rc2)</dt>
          <dd><p>職業独自スキルポイントテーブルに対応しました。来る遊び人の準備対応です。</p></dd>
          <dd><p>遊び人の特訓スタンプを 0 で固定しました。その分不足してしまう 19 ポイントは、とりあえず遊び人 Lv.105 の取得ポイントに加算してあります。</p></dd>
          <dt>2018-08-26 (v1.1.3rc1)</dt>
          <dd><p>暫定的に遊び人を追加しました。現状ではレベル毎の獲得スキルポイントは他職と同じになっており、また特訓も有効になっています。</p>
          <p>「最終的には既存の職とほぼ同じスキルポイントを獲得できるようになる」とのことなので、ざっくり武器スキルの割り振りを考える場合にご利用ください。</p></dd>
          <dt>2018-05-31 (v1.1.2)</dt>
          <dd><p>Lv.105 に正式対応しました。(暫定対応時よりも 1pt 下振れしてしまいました……ごめんなさい。)</p></dd>
          <dt>2018-05-17 (v1.1.1)</dt>
          <dd><p>Lv.105 に暫定対応しました。</p></dd>
          <dd><p>現状では Lv.91 〜 Lv.95 の時と同じように Lv.101 〜 Lv.105 で +1, +1, +2, +2, +2 とスキルポイントが増えるようにしています。</p></dd>
          <dt>2018-04-30 (v1.1.0)</dt>
          <dd><p>マスタースキルポイントを職スキルに一括で全振するボタンを追加しました。</p></dd>
          <dd><p>Safari(iPhone)でのレイアウト崩れを修正しました(したつもり……)。</p></dd>
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
