import React, { FC } from 'react'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import styles from './MyEditor.module.css'

export type MyEditorPropsType = {
  onEditorStateChange: (editHtml: string) => void
}

export const MyEditor: FC<MyEditorPropsType> = ({ onEditorStateChange }) => {
  const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty())

  const onEditorStateChangeHandler = (editorState: EditorState) => {
    setEditorState(editorState)
    onEditorStateChange(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }

  return (
    <>
      <h4 className={styles.dateText}>Описание</h4>
      <Editor
        editorState={editorState}
        toolbarClassName='toolbarClassName'
        wrapperClassName='wrapperClassName'
        editorClassName={styles.editorStyles}
        onEditorStateChange={onEditorStateChangeHandler}
      />
    </>
  )
}
