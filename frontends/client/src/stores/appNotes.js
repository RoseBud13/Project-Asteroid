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
        createTime: '2023/4/15',
        updateTime: '2023/4/15',
        content:
          '你好呀！\n这是测试，功能待完善。\nLorem ipsum dolor sit amet consectetur adipisicing elit. Placeat necessitatibus repellendus iusto cupiditate aliquam accusamus delectus molestiae fugiat perspiciatis in! Autem dolores corporis eius voluptatum temporibus vero quos! Dignissimos, dolorem?'
      },
      {
        id: '2',
        createTime: '2023/4/15',
        updateTime: '2023/4/15',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non a placeat architecto officiis aperiam quam dignissimos nemo dolorem minus. Molestiae, rem labore tenetur expedita modi est excepturi inventore beatae dolore!'
      },
      {
        id: '3',
        createTime: '2023/4/15',
        updateTime: '2023/4/15',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non a placeat architecto officiis aperiam quam dignissimos nemo dolorem minus. Molestiae'
      },
      {
        id: '4',
        createTime: '2023/4/15',
        updateTime: '2023/4/15',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, sequi, quisquam provident consequuntur numquam eos quos facere natus quidem suscipit repudiandae earum aut illum! Accusamus illo accusantium architecto vero soluta!'
      },
      {
        id: '5',
        createTime: '2023/4/15',
        updateTime: '2023/4/15',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat necessitatibus repellendus iusto cupiditate aliquam accusamus delectus molestiae fugiat perspiciatis in! Autem dolores corporis eius voluptatum temporibus vero quos! Dignissimos, dolorem?'
      },
      {
        id: '6',
        createTime: '2023/4/15',
        updateTime: '2023/4/15',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non a placeat architecto officiis aperiam quam dignissimos nemo dolorem minus. Molestiae, rem labore tenetur expedita modi est excepturi inventore beatae dolore!'
      },
      {
        id: '7',
        createTime: '2023/4/15',
        updateTime: '2023/4/15',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non a placeat architecto officiis aperiam quam dignissimos nemo dolorem minus. Molestiae'
      },
      {
        id: '8',
        createTime: '2023/4/15',
        updateTime: '2023/4/15',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, sequi, quisquam provident consequuntur numquam eos quos facere natus quidem suscipit repudiandae earum aut illum! Accusamus illo accusantium architecto vero soluta!'
      }
    ],
    noteList: [],
    editorContent: '',
    selectedNoteID: '',
    selectedNoteIndex: null
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
    addNewNote() {
      let newNote = {
        id: 'note-' + generateUID(5),
        createTime: Date.now(),
        updateTime: Date.now(),
        content: ''
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
      }
    }
  }
});
