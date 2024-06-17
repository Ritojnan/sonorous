import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import { Bold, Italic, Strikethrough, Code, List, ListOrdered, Quote, Codepen, Minus, CornerLeftUp, CornerRightUp } from 'lucide-react'
import { Button } from './ui/button'

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <div className="control-group flex flex-wrap gap-2">
      <div className="Button-group flex flex-wrap gap-2">
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={`btn ${editor.isActive('bold') ? 'is-active' : ''}`}
        >
          <Bold className="w-4 h-4"/>
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={`btn ${editor.isActive('italic') ? 'is-active' : ''}`}
        >
          <Italic className="w-4 h-4"/>
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          className={`btn ${editor.isActive('strike') ? 'is-active' : ''}`}
        >
          <Strikethrough className="w-4 h-4"/>
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleCode()
              .run()
          }
          className={`btn ${editor.isActive('code') ? 'is-active' : ''}`}
        >
          <Code className="w-4 h-4"/>
        </Button>
        <Button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          Clear marks
        </Button>
        <Button onClick={() => editor.chain().focus().clearNodes().run()}>
          Clear nodes
        </Button>
        <Button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`btn ${editor.isActive('paragraph') ? 'is-active' : ''}`}
        >
          Paragraph
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`btn ${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}`}
        >
          H1
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`btn ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
        >
          H2
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`btn ${editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}`}
        >
          H3
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={`btn ${editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}`}
        >
          H4
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={`btn ${editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}`}
        >
          H5
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={`btn ${editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}`}
        >
          H6
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`btn ${editor.isActive('bulletList') ? 'is-active' : ''}`}
        >
          <List className="w-4 h-4"/>
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`btn ${editor.isActive('orderedList') ? 'is-active' : ''}`}
        >
          <ListOrdered className="w-4 h-4"/>
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`btn ${editor.isActive('codeBlock') ? 'is-active' : ''}`}
        >
          <Codepen className="w-4 h-4"/>
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`btn ${editor.isActive('blockquote') ? 'is-active' : ''}`}
        >
          <Quote className="w-4 h-4"/>
        </Button>
        <Button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus className="w-4 h-4"/>
        </Button>
        <Button onClick={() => editor.chain().focus().setHardBreak().run()}>
          Hard break
        </Button>
        <Button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
        >
          <CornerLeftUp className="w-4 h-4"/>
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
        >
          <CornerRightUp className="w-4 h-4"/>
        </Button>
        <Button
          onClick={() => editor.chain().focus().setColor('#958DF1').run()}
          className={`btn ${editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}`}
        >
          Purple
        </Button>
      </div>
    </div>
  )
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  // TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
]

const content = ``

const EditorComponent = () => {
  return (
    <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={content}></EditorProvider>
  );
};

export default EditorComponent;

