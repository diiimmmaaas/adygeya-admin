import React, { FC, useEffect, useState } from 'react';
import { ContentState, convertFromHTML, convertToRaw, EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import styles from './MyEditor.module.css'

export type MyEditorPropsType = {
  value: string
  onEditorStateChange: (editHtml: string) => void
}

export const MyEditor: FC<MyEditorPropsType> = ({ value, onEditorStateChange }) => {
  const textToConvert = value
  const blocksFromHTML = convertFromHTML(textToConvert)

  const [editorStateValue, setEditorStateValue] = React.useState<EditorState>(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap),
    ),
  )
  const [editorPreview, setEditorPreview] = useState('')

  const onEditorStateChangeHandler = (editorState: EditorState) => {
    setEditorStateValue(editorState)
    onEditorStateChange(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    setEditorPreview(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }

  useEffect(() => {
    setEditorPreview(draftToHtml(convertToRaw(editorStateValue.getCurrentContent())))
  }, [])

  return (
    <>
      <h4 className={styles.dateText}>Описание</h4>
      <Editor
        editorState={editorStateValue}
        toolbarClassName='toolbarClassName'
        wrapperClassName='wrapperClassName'
        editorClassName={styles.editorStyles}
        onEditorStateChange={onEditorStateChangeHandler}
      />
      <h4 className={styles.dateText}>Предварительный просмотр HTML разметки</h4>
      <div className={styles.editorStyles}>
        {editorPreview}
      </div>
    </>
  )
}
