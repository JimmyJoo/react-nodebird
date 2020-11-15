import React, { useCallback, useRef, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addPost, uploadImages, removeImage } from '../reducers/post';
import useInput from '../hooks/useInput';

const PostForm = () => {
  const dispatch = useDispatch();
  const imageInput = useRef();
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const [text, setText, onChangeText] = useInput('');

  const onSubmit = useCallback(() => {
    dispatch(addPost(text));
  }, [text]);

  const onClickUploadImage = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    const imageFormData = new FormData();
    [...e.target.files].forEach((file) => {
      imageFormData.append('image', file);
    });
    dispatch(uploadImages(imageFormData));
  }, []);

  const onRemoveImage = useCallback(
    (index) => () => {
      dispatch(removeImage(index));
    },
    []
  );

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  return (
    <Form
      style={{ margin: '10px 0 20px' }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />

      <div>
        <input
          type="file"
          name="image"
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImages}
        />
        <Button onClick={onClickUploadImage}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map((imageSrc, i) => (
          <div key={imageSrc} style={{ display: 'inline-block' }}>
            <img
              src={`http://localhost:3065/${imageSrc}`}
              style={{ width: '200px' }}
              alt={imageSrc}
            />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
