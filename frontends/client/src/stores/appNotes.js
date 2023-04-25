import { defineStore } from 'pinia';
import { Local } from '@/utils/storage';
import { generateUID, useDebounce } from '@/utils/tool';

const debounceNotesToLocal = useDebounce(data => {
  Local.set('notes', data);
}, 3000);

const debounceSetUpdateTime = useDebounce(
  note => {
    note.updateTime = Date.now();
  },
  1000,
  true
);

export const useAppNotesStore = defineStore('appNotes', {
  state: () => ({
    showNotes: false,
    enlarged: false,
    testNoteList: [
      {
        id: '1',
        createTime: 1681984433,
        updateTime: 1681984433,
        content:
          '你好呀！\n欢迎使用便签！\n目前还处于测试阶段，功能待完善。\n\nTips:\n1. 在搜索框内输入 "/notes + [空格] + [内容]" 快速创建新的便签\n2. 鼠标拖动便签顶部栏可以移动便签\n\n\n注意：储存的数据可能会因实施浏览器缓存清理而丢失，请妥善使用。'
      },
      {
        id: '2',
        createTime: 1681725233,
        updateTime: 1681725233,
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non a placeat architecto officiis aperiam quam dignissimos nemo dolorem minus. Molestiae, rem labore tenetur expedita modi est excepturi inventore beatae dolore!'
      },
      {
        id: '3',
        createTime: 1681725233,
        updateTime: 1681725233,
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non a placeat architecto officiis aperiam quam dignissimos nemo dolorem minus. Molestiae'
      },
      {
        id: '4',
        createTime: 1681552433,
        updateTime: 1681552433,
        content:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, sequi, quisquam provident consequuntur numquam eos quos facere natus quidem suscipit repudiandae earum aut illum! Accusamus illo accusantium architecto vero soluta!'
      },
      {
        id: '5',
        createTime: 1681552433,
        updateTime: 1681552433,
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat necessitatibus repellendus iusto cupiditate aliquam accusamus delectus molestiae fugiat perspiciatis in! Autem dolores corporis eius voluptatum temporibus vero quos! Dignissimos, dolorem?'
      }
    ],
    noteList: [],
    editorContent: '',
    selectedNoteID: '',
    selectedNoteIndex: null,
    noteCardColorPreset: ['#ffffb7', '#fff8a5', '#fff599', '#fff6cc']
  }),
  actions: {
    toggleNotes() {
      this.showNotes = !this.showNotes;
      this.enlarged = false;
    },
    toggleEnlarge() {
      this.enlarged = !this.enlarged;
    },
    initNotes() {
      this.noteList = Local.get('notes') || this.testNoteList;
      if (!Local.get('notes')) {
        Local.set('notes', this.noteList);
      }
    },
    setNoteEditorContent(id) {
      let selected = this.noteList.find(item => item.id === id);
      if (selected) {
        this.editorContent = selected.content;
        this.selectedNoteID = selected.id;
        this.selectedNoteIndex = this.noteList.indexOf(selected);
      }
    },
    updateNoteContent(id, newContent) {
      let selected = this.noteList.find(item => item.id === id);
      if (selected) {
        selected.content = newContent;
        debounceSetUpdateTime(selected);
        debounceNotesToLocal(this.noteList);
      }
    },
    addNewNote(input) {
      let newNote = {
        id: 'note-' + generateUID(5),
        createTime: Date.now(),
        updateTime: Date.now(),
        content: input || ''
      };
      this.noteList.unshift(newNote);
      this.setNoteEditorContent(newNote.id);
      Local.set('notes', this.noteList);
    },
    deleteNote(id) {
      let selected = this.noteList.find(item => item.id === id);
      if (selected) {
        this.noteList = this.noteList.filter(item => item.id !== id);
        Local.set('notes', this.noteList);
        this.editorContent = '';
        this.selectedNoteID = '';
        this.selectedNoteIndex = null;
      }
    }
  }
});
