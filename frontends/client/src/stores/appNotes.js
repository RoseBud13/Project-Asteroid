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

const debounceStickiesToLocal = useDebounce(data => {
  Local.set('stickies', data);
}, 500);

export const useAppNotesStore = defineStore('appNotes', {
  state: () => ({
    showNotes: false,
    enlarged: false,
    testNoteList: [
      {
        id: '1',
        createTime: 1681984433,
        updateTime: 1681984433,
        pinned: false,
        content:
          '你好呀！\n欢迎使用便签！\n目前还处于测试阶段，功能待完善。\n\nTips:\n1. 在搜索框内输入 "/notes + [空格] + [内容]" 快速创建新的便签\n2. 鼠标拖动便签顶部栏可以移动便签\n\n\n注意：储存的数据可能会因实施浏览器缓存清理而丢失，请妥善使用。'
      },
      {
        id: '2',
        createTime: 1681725233,
        updateTime: 1681725233,
        pinned: false,
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non a placeat architecto officiis aperiam quam dignissimos nemo dolorem minus. Molestiae, rem labore tenetur expedita modi est excepturi inventore beatae dolore!'
      },
      {
        id: '3',
        createTime: 1681725233,
        updateTime: 1681725233,
        pinned: false,
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non a placeat architecto officiis aperiam quam dignissimos nemo dolorem minus. Molestiae'
      },
      {
        id: '4',
        createTime: 1681552433,
        updateTime: 1681552433,
        pinned: false,
        content:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, sequi, quisquam provident consequuntur numquam eos quos facere natus quidem suscipit repudiandae earum aut illum! Accusamus illo accusantium architecto vero soluta!'
      },
      {
        id: '5',
        createTime: 1681552433,
        updateTime: 1681552433,
        pinned: false,
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat necessitatibus repellendus iusto cupiditate aliquam accusamus delectus molestiae fugiat perspiciatis in! Autem dolores corporis eius voluptatum temporibus vero quos! Dignissimos, dolorem?'
      }
    ],
    noteList: [],
    stickyList: [],
    editorContent: '',
    selectedNoteID: '',
    selectedNoteIndex: null,
    noteCardColorPreset: ['#ffffb7', '#fff8a5', '#fff599', '#fff6cc']
  }),
  actions: {
    toggleNotes(value) {
      if (value) {
        this.showNotes = value;
      } else {
        this.showNotes = !this.showNotes;
      }
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
      let sticky = this.stickyList.find(item => item.stickyID === id);
      if (sticky) {
        sticky.content = newContent;
        debounceStickiesToLocal(this.stickyList);
      }
    },
    addNewNote(input) {
      let newNote = {
        id: 'note-' + generateUID(5),
        createTime: Date.now(),
        updateTime: Date.now(),
        pinned: false,
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
        const sticky = this.stickyList.find(item => item.stickyID === id);
        if (sticky) {
          sticky.unpin();
          this.unpinNote(id);
        }
      }
    },
    initStickies() {
      this.stickyList = Local.get('stickies') || [];
      if (!Local.get('stickies')) {
        Local.set('stickies', this.stickyList);
      }
    },
    pinNote(id) {
      let selected = this.noteList.find(item => item.id === id);
      if (selected) {
        if (!selected.pinned) {
          selected.pinned = true;
          Local.set('notes', this.noteList);
          let contentValue = selected.content || ' ';
          return contentValue;
        } else {
          return false;
        }
      }
    },
    updateStickyList(id, content, unmount, position, moved = false) {
      const data = {
        stickyID: id,
        content: content,
        unpin: unmount,
        position,
        moved: moved
      };
      this.stickyList.push(data);
      Local.set('stickies', this.stickyList);
    },
    moveSticky(id, position) {
      let selected = this.stickyList.find(item => item.stickyID === id);
      if (selected) {
        selected.position = position;
        selected.moved = true;
        debounceStickiesToLocal(this.stickyList);
      }
    },
    unpinNote(id) {
      let selected = this.stickyList.find(item => item.stickyID === id);
      if (selected) {
        this.stickyList = this.stickyList.filter(item => item.stickyID !== id);
        Local.set('stickies', this.stickyList);

        let note = this.noteList.find(item => item.id === id);
        if (note) {
          if (note.pinned) {
            note.pinned = false;
            Local.set('notes', this.noteList);
          }
        }
      }
    }
  }
});
