(function() {
  'use strict';

  // two way data binding (to UI) 双方向データバインディング
  // データを更新すればUIが更新され UIが更新すればデータが更新される

  let vm = new Vue({
    el: '#app',
    data: {
      newItem: '',
      todos: []
    },
    watch: { //指定したデータの監視(todosの監視)
      todos: { //deep watcher
        handler: function() {
          localStorage.setItem('todos', JSON.stringify(this.todos)); //localStorageにデータ保存
        },
        deep: true
      }
    }, //アプリがページにマウントされるタイミングでデータを読み込む
    mounted: function() {
      this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    },
    methods: { //methodsキーでaddItemのメソッドを書いていく
      addItem: function() {
        let item = {
          title: this.newItem,
          isDone: false
        };
        this.todos.push(item); //pushでitemに追加された内容がtodosの末尾に追加
        this.newItem = ''; //書き込んだらテキストフォームを空にする
      },
      deleteItem: function(index) {
        if (confirm('are you sure?')) { //確認文
          this.todos.splice(index, 1); //index番目から１個削除
        }
      },
      purge: function() {
        if (!confirm('delete finished?')) { //確認文
          return; //キャンセルだったら処理を止める
        } //OKが押されたら終わってたタスクを削除
        // this.todos = this.todos.filter(function(todo) { //終わってないものをtodosに入れる
        //   return !todo.isDone; //todoがfalse(終わってないタスク)をreturnする
        // });
        this.todos = this.remaining;
      }
    },
    computed: { //データから動的にプロパティを計算してくれる算出プロパティ
      remaining: function() {
        //フィルターしてitemにまだ終わってないタスクを入れる
        // let item = this.todos.filter(function(todo) {
        //   return !todo.isDone; //todoがfalse(まだ残っているタスク)をreturnする
        // });
        // return items.length; //終わってないタスクの件数
        return this.todos.filter(function(todo) {
          return !todo.isDone; //todoがfalse(まだ残っているタスク)をreturnする
        });
      }
    }
  });
})();