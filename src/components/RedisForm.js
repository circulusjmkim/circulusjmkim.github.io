import React from 'react';
import {
  Box,
  Button,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import AntSwitch from './AntSwitch';
import EnvSelect from './EnvSelect';

const RedisForm = ({
  remove,
  classes,
  enabled,
  bUser,
  params,
  error,
  handleButtonClick,
  handleChange,
  handleTextChange,
  handleClickClear,
}) => (
  <Grid
    container
    item
    direction="row"
    justifyContent="flex-start"
    alignItems="stretch"
    className={classes.formRoot}
    spacing={2}
  >
    <Grid item xs={6}>
      <EnvSelect />
    </Grid>
    <Grid item xs={6} />
    <Grid item xs={12} className={classes.toggleWrap}>
      <FormGroup>
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>로봇</Grid>
            <Grid item>
              <AntSwitch checked={bUser} onChange={handleChange} />
            </Grid>
            <Grid item>사용자</Grid>
          </Grid>
        </Typography>
      </FormGroup>
    </Grid>
    <Grid item xs={12} style={{ display: 'inline-flex' }}>
      <Box display="flex" flexDirection="column">
        <TextField
          id="logical"
          name="logical"
          className={classes.textField}
          label={
            bUser
              ? '사용자의 아이디를 입력하세요.'
              : '로봇의 Serial No.를 입력하세요.'
          }
          onChange={handleTextChange}
          value={bUser ? params.userId : params.robotId || ''}
          error={error}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="input value clear"
                  onClick={handleClickClear}
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {/* <TextField
            id="physical"
            name="physical"
            className={classes.textField} 
            label={bUser?'사용자의 ObjectId를 입력하세요.':'로봇의 ObjectId를 입력하세요.'}
            onChange={handleTextChange} 
            value={bUser?params.userPId:params.robotPId || ''}
            error={error}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (<InputAdornment position="end">
              <IconButton
                aria-label="input value clear"
                onClick={handleClickClear}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>)
            }}
          /> */}
      </Box>
    </Grid>
    <Grid item xs={12} className={classes.marginVertical}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleButtonClick}
        disabled={!enabled}
      >
        {remove ? '삭제' : '추가'}
      </Button>
    </Grid>
  </Grid>
);

export default RedisForm;
