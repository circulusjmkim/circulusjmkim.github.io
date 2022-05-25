/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  DialogContent,
  TextField,
  Grid,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Input,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import moment from 'moment';
import { useCopyToClipboard } from 'react-use';

const categories = {
  '5c6a5f3151347c09af877b4b': '스포츠',
  '5c6a5f3151347c09af877b4a': '테크',
  '5c6a5f3151347c09af877b49': '경영',
  '5c6a5f3151347c09af877b48': '뉴스',
  '5c6a5f3151347c09af877b47': '여행',
  '5c6a5f3151347c09af877b45': '스타일',
  '5c6a5f3151347c09af877b43': '과학',
  '5c6a5f3151347c09af877b42': '연예',
  '5c6a5f3151347c09af877b40': '동물',
  '5c6a5f3151347c09af877b3f': '재테크',
  '5c6a5f3151347c09af877b3d': '경제',
  '5c6a5f3151347c09af877b3c': '취업',
  '5c6a5f3151347c09af877b3b': '금융',
  '5c6a5f3151347c09af877b3a': '마케팅',
  '5c6a5f3151347c09af877b38': '아웃도어',
  '5c6a5f3151347c09af877b33': '음식평론',
  '5c6a5f3151347c09af877b31': '음악',
  '5c6a5f3151347c09af877b30': '예술',
  '5c6a5f3151347c09af877b2f': '책',
  '5c6a5f3151347c09af877b2e': '드라마',
  '5c6a5f3151347c09af877b2d': '영화',
  '5c6a5f3151347c09af877b2c': '게임',
  '5c6a5f3151347c09af877b2b': '자동차',
  '5c6a5f3151347c09af877b22': '의학',
  '5c6a5f3151347c09af877b1c': '정치',
  '5c6a5f3151347c09af877b19': '오피니언',
  '5c6a5f3151347c09af877b16': '삶과 공간',
  '5c6a5f3151347c09af877b15': '스타트업',
  '5c6a5f3151347c09af877b14': '부동산',
  '5c6a5f3151347c09af877b11': '뷰티',
};

const UserDialogContent = ({ data }) => {
  // eslint-disable-next-line no-unused-vars
  const [state, copyToClipboard] = useCopyToClipboard();

  const getValue = (prop) => {
    let value = data;
    prop.split('.').forEach((k) => {
      value = value && [k] in value ? value[k] : null;
    });
    return value;
  };

  return (
    <DialogContent dividers>
      {data && (
        <Grid container xs={12} columnSpacing={1} rowSpacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              variant="standard"
              sx={{ '& label': { color: 'secondary.main' } }}
            >
              <InputLabel htmlFor="user_object_id">회원 ObjectId</InputLabel>
              <Input
                {...{
                  id: 'user_object_id',
                  name: '_id',
                  type: 'text',
                  defaultValue: getValue('_id'),
                  size: 'small',
                  fullWidth: true,
                }}
                readOnly
                endAdornment={
                  <InputAdornment
                    position="end"
                    sx={{ height: '100%', alignSelf: 'end' }}
                  >
                    <IconButton
                      aria-label="content copy"
                      size="small"
                      onClick={() => copyToClipboard(data._id)}
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              variant="standard"
              sx={{ '& label': { color: 'secondary.main' } }}
            >
              <InputLabel htmlFor="userId">회원 아이디</InputLabel>
              <Input
                {...{
                  id: 'userId',
                  name: 'userId',
                  type: 'text',
                  defaultValue: getValue('userId'),
                  size: 'small',
                  fullWidth: true,
                }}
                readOnly
                endAdornment={
                  <InputAdornment
                    position="end"
                    sx={{ height: '100%', alignSelf: 'end' }}
                  >
                    <IconButton
                      aria-label="content copy"
                      size="small"
                      onClick={() => copyToClipboard(data.userId)}
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              variant="standard"
              sx={{ '& label': { color: 'secondary.main' } }}
            >
              <InputLabel htmlFor="piboId">로봇 ObjectId</InputLabel>
              <Input
                {...{
                  id: 'piboId',
                  name: 'piboId',
                  type: 'text',
                  defaultValue: getValue('pibo').reduce(
                    (a, c) => (a ? `${a}\n${c._id}` : c._id),
                    '',
                  ),
                  size: 'small',
                  fullWidth: true,
                  multiline: true,
                }}
                readOnly
                endAdornment={
                  <InputAdornment
                    position="end"
                    sx={{ height: '100%', alignSelf: 'end' }}
                  >
                    <IconButton
                      aria-label="content copy"
                      size="small"
                      onClick={() =>
                        copyToClipboard(
                          getValue('pibo').reduce(
                            (a, c) => (a ? `${a}\n${c._id}` : c._id),
                            '',
                          ),
                        )
                      }
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              variant="standard"
              sx={{ '& label': { color: 'secondary.main' } }}
            >
              <InputLabel htmlFor="piboSerial">로봇 시리얼</InputLabel>
              <Input
                {...{
                  id: 'piboSerial',
                  name: 'piboSerial',
                  type: 'text',
                  defaultValue: getValue('pibo').reduce(
                    (a, c) => (a ? `${a}\n${c.robotId}` : c.robotId),
                    '',
                  ),
                  size: 'small',
                  fullWidth: true,
                  multiline: true,
                }}
                readOnly
                endAdornment={
                  <InputAdornment
                    position="end"
                    sx={{ height: '100%', alignSelf: 'end' }}
                  >
                    <IconButton
                      aria-label="content copy"
                      size="small"
                      onClick={() =>
                        copyToClipboard(
                          getValue('pibo').reduce(
                            (a, c) => (a ? `${a}\n${c.robotId}` : c.robotId),
                            '',
                          ),
                        )
                      }
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              {...{
                name: 'lastName',
                type: 'text',
                label: '성',
                defaultValue: getValue('lastName'),
                variant: 'standard',
                size: 'small',
                fullWidth: true,
                InputProps: { readOnly: true },
              }}
              sx={{ '& label': { color: 'secondary.main' } }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              {...{
                name: 'firstName',
                type: 'text',
                label: '이름',
                defaultValue: getValue('firstName'),
                variant: 'standard',
                size: 'small',
                fullWidth: true,
                InputProps: { readOnly: true },
              }}
              sx={{ '& label': { color: 'secondary.main' } }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              {...{
                name: 'nickName',
                type: 'text',
                label: '닉네임',
                defaultValue: getValue('nickName'),
                variant: 'standard',
                size: 'small',
                fullWidth: true,
                InputProps: { readOnly: true },
              }}
              sx={{ '& label': { color: 'secondary.main' } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...{
                name: 'gender',
                type: 'text',
                label: '성별',
                defaultValue: getValue('gender'),
                variant: 'standard',
                size: 'small',
                fullWidth: true,
                InputProps: { readOnly: true },
              }}
              sx={{ '& label': { color: 'secondary.main' } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...{
                name: 'birthDate',
                type: 'date',
                label: '생년월일',
                defaultValue: moment(new Date(getValue('birthDate'))).format(
                  'YYYY-MM-DD',
                ),
                variant: 'standard',
                size: 'small',
                fullWidth: true,
                InputProps: { readOnly: true },
              }}
              sx={{ '& label': { color: 'secondary.main' } }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...{
                name: 'interest',
                type: 'text',
                label: '관심사',
                defaultValue: getValue('interest')
                  ? getValue('interest')
                      .map((i) => categories[i])
                      .join(', ')
                  : '',
                variant: 'standard',
                size: 'small',
                fullWidth: true,
                InputProps: { readOnly: true },
              }}
              sx={{ '& label': { color: 'secondary.main' } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...{
                name: 'email',
                type: 'text',
                label: '이메일',
                defaultValue: getValue('email'),
                variant: 'standard',
                size: 'small',
                fullWidth: true,
                InputProps: { readOnly: true },
              }}
              sx={{ '& label': { color: 'secondary.main' } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...{
                name: 'tel',
                type: 'text',
                label: '전화번호',
                defaultValue: getValue('tel'),
                variant: 'standard',
                size: 'small',
                fullWidth: true,
                InputProps: { readOnly: true },
              }}
              sx={{ '& label': { color: 'secondary.main' } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...{
                name: 'role',
                type: 'text',
                label: '권한',
                defaultValue: getValue('role'),
                variant: 'standard',
                size: 'small',
                fullWidth: true,
                InputProps: { readOnly: true },
              }}
              sx={{ '& label': { color: 'secondary.main' } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...{
                name: 'use',
                type: 'text',
                label: '가입여부',
                defaultValue: getValue('use'),
                variant: 'standard',
                size: 'small',
                fullWidth: true,
                InputProps: { readOnly: true },
              }}
              sx={{ '& label': { color: 'secondary.main' } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...{
                name: 'firstTime',
                type: 'datetime',
                label: '가입일',
                defaultValue: moment(new Date(getValue('firstTime'))).format(
                  'YYYY-MM-DD HH:mm',
                ),
                variant: 'standard',
                size: 'small',
                fullWidth: true,
                InputProps: { readOnly: true },
              }}
              sx={{ '& label': { color: 'secondary.main' } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...{
                name: 'lastTime',
                type: 'datetime',
                label: '수정일',
                defaultValue: moment(new Date(getValue('lastTime'))).format(
                  'YYYY-MM-DD HH:mm',
                ),
                variant: 'standard',
                size: 'small',
                fullWidth: true,
                InputProps: { readOnly: true },
              }}
              sx={{ '& label': { color: 'secondary.main' } }}
            />
          </Grid>
        </Grid>
      )}
    </DialogContent>
  );
};
export default UserDialogContent;
