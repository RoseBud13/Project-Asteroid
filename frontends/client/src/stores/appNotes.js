import { defineStore } from 'pinia';
import { Local } from '@/utils/storage';

export const useAppNotesStore = defineStore('appNotes', {
  state: () => ({
    showNotes: false,
    enlarged: false,
    testNoteList: [
      {
        id: 1,
        time: '2023/4/15',
        content:
          '你好呀！\n这是测试，功能待完善。\nLorem ipsum dolor sit amet consectetur adipisicing elit. Placeat necessitatibus repellendus iusto cupiditate aliquam accusamus delectus molestiae fugiat perspiciatis in! Autem dolores corporis eius voluptatum temporibus vero quos! Dignissimos, dolorem?'
      },
      {
        id: 2,
        time: '2023/3/27',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non a placeat architecto officiis aperiam quam dignissimos nemo dolorem minus. Molestiae, rem labore tenetur expedita modi est excepturi inventore beatae dolore!'
      },
      {
        id: 3,
        time: '2023/3/24',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non a placeat architecto officiis aperiam quam dignissimos nemo dolorem minus. Molestiae'
      },
      {
        id: 4,
        time: '2023/3/20',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, sequi, quisquam provident consequuntur numquam eos quos facere natus quidem suscipit repudiandae earum aut illum! Accusamus illo accusantium architecto vero soluta!'
      },
      {
        id: 5,
        time: '2023/2/25',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat necessitatibus repellendus iusto cupiditate aliquam accusamus delectus molestiae fugiat perspiciatis in! Autem dolores corporis eius voluptatum temporibus vero quos! Dignissimos, dolorem?'
      },
      {
        id: 6,
        time: '2023/2/17',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non a placeat architecto officiis aperiam quam dignissimos nemo dolorem minus. Molestiae, rem labore tenetur expedita modi est excepturi inventore beatae dolore!'
      },
      {
        id: 7,
        time: '2023/1/24',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non a placeat architecto officiis aperiam quam dignissimos nemo dolorem minus. Molestiae'
      },
      {
        id: 8,
        time: '2023/1/20',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, sequi, quisquam provident consequuntur numquam eos quos facere natus quidem suscipit repudiandae earum aut illum! Accusamus illo accusantium architecto vero soluta!'
      }
    ],
    noteList: [],
    noteContent: '',
    selectedNoteId: ''
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
        this.noteContent = selected.content;
        this.selectedNoteId = selected.id;
      }
    },
    updateNoteContent(id, content) {
      let selected = this.noteList.find(item => item.id === id);
      if (selected) {
        selected.content = content;
        setTimeout(() => {
          Local.set('notes', this.noteList);
        }, 500);
      }
    }
  }
});
