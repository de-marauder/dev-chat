import React, { useEffect, useRef, useState } from "react";

import classes from '../../../../styles/Community/MakePost.module.scss'

type Params = {
  onChange: Function;
  sendPost: Function;
  value: string;
  name: string;
  isNew: Boolean;
};

// !* Adding a button to toggle the editor fixed the disappearing after page load issue.
function MakePost({ isNew, onChange, name, value, sendPost }: Params) {
  const editorRef = useRef<any>();
  const { CKEditor, ClassicEditor }: any = editorRef.current || {};

  const [editor, toggleEditor] = useState(false);

  const [title, setTitle] = useState('')
  const titleInput = (
    <div className={classes.titleInput}>
      <label>Post title</label>
      <input className={classes.input} required value={title} onChange={(e)=>setTitle(e.target.value)} />
    </div>
  )

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor as any, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic") as any,
    };

  }, []);

  return (<>
  {isNew ? titleInput : null}
    <div className={classes.makePost}>
      <p className={`${classes.btn} ${classes.pri_btn}`}
        onClick={()=>{toggleEditor(!editor)}}
      >
        {isNew ? 'create new post' : 'comment on post'}
      </p>
      {editor ? (
        <div className={`editor_wrapper ${classes.editor_wrapper}`}>
        <CKEditor
          type=""
          name={name}
          editor={ClassicEditor}
          data={value}
          onChange={(event: Event, editor: any) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
        <button className={`${classes.sendPost} ${classes.btn} ${classes.pri_btn}`} onClick={()=>sendPost()}>Send Post</button>
        </div>
      ) : null}
    </div>
    </>
  );
}

export default MakePost;
