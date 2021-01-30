const wrap = document.getElementById('wrap');
const start = document.getElementById('start');

//複数のテキストを格納する配列
const textLists = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
    
    ];

//ランダム名テキストを画面に表示する
let checkTexts =[];
const createText = () => {
    const p = document.getElementById('text');
    
    //配列インデックス数からランダムに数値を生成する
    const rnd = Math.floor(Math.random() * textLists.length);
    // p要素の中身を空っぽにする
    p.textContent = '';
    //テキストを一文字ずつ分割してp要素に挿入
    checkTexts = textLists[rnd].split('').map(value => {
        const span = document.createElement('span');
        //span要素に配列の一文字ずつを当てはめる
        //valueは配列の一文字を表している
        span.textContent = value;
        p.appendChild(span);
        //一文字ずつcheckTextsに格納していく
        return span;
    })
    // ランダムなテキストをp要素に挿入
    // p.textContent = textLists[rnd];
    // //配列の０番目を表示
    // p.textContent = textLists[0];
};


//キーイベント＆入力判定処理
let score = 0;
const keyDown = e => {
   if(e.key === checkTexts[0].textContent) {
   checkTexts[0].className = 'add-color';
   checkTexts.shift();
   score++;
   if(!checkTexts.length) createText();
   }else if(e.key === 'shift'){
       wrap.style.backgroundColor ='#666';
   }else{
       wrap.style.backgroundColor = 'red';
   }
   
};

//ランク判定とメッセージ生成処理
const rankCheck = score => {
    //テキストを格納する変数
    let text ="";
    
    //スコアに応じてメッセージを変数textに格納する
  if(score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if(score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
  } else if(score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
  } else if(score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます！`;    
  }
    return `${score}文字打てました！\n${text}\n『OK』リトライ/『キャンセル』終了`;
};



//ゲーム終了処理
const gameOver = id => {
    clearInterval(id);
    const result = confirm(rankCheck(score));
    //OKボタンを押したらリロードする
    if(result) window.location.reload();
};


//タイマー処理
const timer = () => {
    let time =60;
    const count = document.getElementById('count');
    const id = setInterval(() => {
        //タイマーが０になったら停止する
        if(time <= 0) gameOver(id);
        //タイマーを１ずつ減らしていく
        count.textContent = time--;
    },1000);
};



//ゲームスタート時の処理
start.addEventListener('click', () => {
    createText();
    document.addEventListener('keydown',keyDown);
    timer();
    start.style.display='none';
});


